# API Documentation

Complete API reference for RoboxGen endpoints.

## Overview

RoboxGen provides HTTP endpoints for game generation, file upload, and user management. All requests and responses use JSON format.

---

## Authentication

Some endpoints require Supabase authentication via JWT tokens stored in HTTP-only cookies. The `@supabase/auth-helpers-nextjs` package handles this automatically.

### User Authentication Flow

1. User signs up/in via `/pages/auth/login`
2. Supabase returns JWT token → stored in HTTP-only cookie
3. Subsequent requests automatically include this cookie
4. API validates token and identifies user

---

## Endpoints

### 1. Generate Game Script

Generate a Lua game script using Google Gemini AI.

```
POST /api/ai-generate
Content-Type: application/json
```

#### Request Body

```json
{
  "description": "A dungeon crawler RPG with combat and loot",
  "gameType": "adventure",
  "theme": "fantasy"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `description` | string | ✅ | Game idea description (10-500 chars) |
| `gameType` | string | ✅ | One of: `adventure`, `puzzle`, `racing`, `survival`, `shooter`, `tycoon` |
| `theme` | string | ✅ | One of: `fantasy`, `sci-fi`, `modern`, `medieval`, `cyberpunk`, `retro` |

#### Response (200 OK)

```json
{
  "game": {
    "id": "game_abc123def456",
    "gameName": "Dungeon Legends",
    "luaScript": "-- Complete Lua script for the game...",
    "description": "A dungeon crawler RPG with combat and loot"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique game identifier |
| `gameName` | string | AI-generated game name |
| `luaScript` | string | Complete Lua script code |
| `description` | string | User's game description |

#### Error Responses

**400 Bad Request** - Missing or invalid parameters
```json
{
  "error": "Invalid input",
  "details": "Description must be between 10 and 500 characters"
}
```

**500 Internal Server Error** - API key not configured
```json
{
  "error": "API configuration error",
  "details": "GEMINI_API_KEY is not set"
}
```

**429 Too Many Requests** - Rate limit exceeded
```json
{
  "error": "Rate limit exceeded",
  "details": "Too many requests. Please try again later."
}
```

#### Example Usage

```typescript
const response = await fetch('/api/ai-generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    description: 'A puzzle game with 50 levels',
    gameType: 'puzzle',
    theme: 'modern'
  })
});

const data = await response.json();
console.log(data.game.gameName); // "Logic Master Puzzles"
```

---

### 2. Upload Generated Game

Upload a generated game to Supabase Storage and save metadata to database.

```
POST /api/upload-game
Content-Type: application/json
Authentication: Required (Supabase JWT)
```

#### Request Body

```json
{
  "gameName": "Dungeon Legends",
  "description": "A dungeon crawler RPG with combat and loot",
  "gameType": "adventure",
  "theme": "fantasy",
  "luaScript": "-- Complete Lua script...",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `gameName` | string | ✅ | Name of the generated game |
| `description` | string | ✅ | Game description/prompt |
| `gameType` | string | ✅ | Game type category |
| `theme` | string | ✅ | Visual theme |
| `luaScript` | string | ✅ | Lua script code |
| `userId` | string | ✅ | User's Supabase ID |

#### Response (200 OK)

```json
{
  "success": true,
  "gameId": "abc123def456-7890",
  "downloadUrl": "https://xxxxx.supabase.co/storage/v1/object/public/generated-games/users/550e8400.../game_abc123def456.zip"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether upload succeeded |
| `gameId` | string | Database game record ID |
| `downloadUrl` | string | Public URL to download ZIP file |

#### Database Record Created

The endpoint creates a record in the `generated_games` table:

```
id: abc123def456-7890
user_id: 550e8400-e29b-41d4-a716-446655440000
game_name: "Dungeon Legends"
game_type: "adventure"
theme: "fantasy"
prompt: "A dungeon crawler RPG with combat and loot"
lua_script: "-- Complete Lua script..."
download_url: "https://xxxxx.supabase.co/storage/v1/object/..."
created_at: 2024-01-15T10:30:45.123Z
```

#### Error Responses

**401 Unauthorized** - Not authenticated
```json
{
  "error": "Unauthorized",
  "details": "User not authenticated"
}
```

**400 Bad Request** - Missing fields
```json
{
  "error": "Validation error",
  "details": "Missing required field: luaScript"
}
```

**500 Internal Server Error** - Upload or database error
```json
{
  "error": "Upload failed",
  "details": "Failed to upload file to storage"
}
```

#### Example Usage

```typescript
const { gameName, description, gameType, theme, luaScript } = gameData;

const response = await fetch('/api/upload-game', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    gameName,
    description,
    gameType,
    theme,
    luaScript,
    userId: user.id
  })
});

const data = await response.json();
if (data.success) {
  window.open(data.downloadUrl, '_blank'); // Download the ZIP
}
```

---

### 3. Get User Games

Fetch all games generated by the authenticated user.

```
GET /api/user/games
Authentication: Required (Supabase JWT)
```

#### Query Parameters

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `limit` | number | ✅ | Max games to return (default: 50) |
| `offset` | number | ✅ | Pagination offset (default: 0) |
| `sort` | string | ✅ | Sort order: `newest` (default) or `oldest` |

#### Response (200 OK)

```json
{
  "games": [
    {
      "id": "game_1",
      "game_name": "Dungeon Legends",
      "game_type": "adventure",
      "theme": "fantasy",
      "prompt": "A dungeon crawler RPG with combat and loot",
      "download_url": "https://xxxxx.supabase.co/storage/v1/object/...",
      "created_at": "2024-01-15T10:30:45.123Z"
    },
    {
      "id": "game_2",
      "game_name": "Logic Master",
      "game_type": "puzzle",
      "theme": "modern",
      "prompt": "A puzzle game with 50 levels",
      "download_url": "https://xxxxx.supabase.co/storage/v1/object/...",
      "created_at": "2024-01-14T09:20:15.456Z"
    }
  ]
}
```

#### Example Usage

```typescript
const response = await fetch('/api/user/games?limit=10&sort=newest');
const data = await response.json();
console.log(data.games); // Array of user's games
```

---

### 4. Delete Game

Delete a user's game from storage and database.

```
DELETE /api/games/:gameId
Authentication: Required (Supabase JWT)
```

#### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `gameId` | string | Game ID to delete |

#### Response (200 OK)

```json
{
  "success": true,
  "message": "Game deleted successfully"
}
```

#### Error Responses

**404 Not Found** - Game doesn't exist
```json
{
  "error": "Not found",
  "details": "Game with ID 'game_999' not found"
}
```

**403 Forbidden** - Game belongs to another user
```json
{
  "error": "Forbidden",
  "details": "You do not have permission to delete this game"
}
```

#### Example Usage

```typescript
const response = await fetch(`/api/games/${gameId}`, {
  method: 'DELETE'
});

const data = await response.json();
if (data.success) {
  console.log('Game deleted');
}
```

---

## Authentication

### Sign Up

Create a new user account.

```
POST /api/auth/sign-up
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Sign In

Log in with email and password.

```
POST /api/auth/sign-in
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Sign Out

Log out the current user.

```
POST /api/auth/sign-out
Authentication: Required (Supabase JWT)
```

Returns JWT token in HTTP-only cookie. Token is automatically included in subsequent requests.

---

## Rate Limiting

- **AI Generation**: 60 requests/minute per API key (Gemini free tier)
- **Uploads**: No limit (Supabase rate limiting applies)
- **List Games**: No limit

For higher limits, upgrade your Gemini API plan.

---

## Error Handling

All errors return appropriate HTTP status codes and JSON responses:

```json
{
  "error": "Error type",
  "details": "Detailed error message",
  "code": "ERROR_CODE"
}
```

#### Common Status Codes

| Status | Meaning |
|--------|---------|
| 200 | Success |
| 400 | Bad Request (invalid parameters) |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (no permission) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

---

## Examples

### Complete Game Generation & Upload Flow

```typescript
import axios from 'axios';

async function generateAndUploadGame() {
  try {
    // Step 1: Generate game with AI
    console.log('Generating game...');
    const genResponse = await axios.post('/api/ai-generate', {
      description: 'A puzzle game with 50 levels',
      gameType: 'puzzle',
      theme: 'modern'
    });
    
    const { game } = genResponse.data;
    console.log(`✅ Generated: ${game.gameName}`);

    // Step 2: Upload to Supabase
    console.log('Uploading...');
    const uploadResponse = await axios.post('/api/upload-game', {
      gameName: game.gameName,
      description: game.description,
      gameType: 'puzzle',
      theme: 'modern',
      luaScript: game.luaScript,
      userId: user.id
    });

    if (uploadResponse.data.success) {
      console.log('✅ Uploaded successfully!');
      // Download the ZIP
      window.open(uploadResponse.data.downloadUrl, '_blank');
    }
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.error);
  }
}
```

---

## SDK/Library Support

### TypeScript/JavaScript

All examples use the standard `fetch` API or `axios`. No special SDK required.

### Rate Limiting Best Practices

1. Cache generated games locally
2. Implement exponential backoff on failures
3. Show user-friendly error messages
4. Queue requests if approaching rate limit

---

## Changelog

### v1.0
- Initial API release
- AI game generation endpoint
- File upload and storage
- User game management

---

For more questions, see [GEMINI_SETUP.md](../GEMINI_SETUP.md) for setup instructions.

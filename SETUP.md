# RoboxGen Setup & Deployment Guide

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or higher
- npm or yarn package manager
- Git version control
- A code editor (VS Code recommended)
- A Supabase account
- (Optional) An OpenAI API key for real AI generation

## 🚀 Local Development Setup

### Step 1: Clone & Install

```bash
# Navigate to your projects directory
cd ~/Documents/GitHub

# Clone the repository
git clone https://github.com/yourusername/rogen.git
cd rogen

# Install dependencies
npm install
# or
yarn install
```

### Step 2: Configure Environment Variables

```bash
# Copy the example env file
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your credentials:

#### Supabase Setup (Required for Database)

1. Go to [app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Go to **Project Settings > API**
4. Copy and paste:
   - `NEXT_PUBLIC_SUPABASE_URL` from "Project URL"
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` from "anon key"
   - `SUPABASE_SERVICE_ROLE_KEY` from "service_role key"

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### OpenAI Setup (Optional, for Real AI Generation)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API keys**
4. Click **Create new secret key**
5. Copy the key and paste into `.env.local`:

```env
OPENAI_API_KEY=sk-...
```

### Step 3: Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🗄️ Supabase Database Setup

### Create Tables

1. Go to your Supabase project
2. Click **SQL Editor**
3. Run the following SQL to create necessary tables:

```sql
-- Create generated_games table
CREATE TABLE generated_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  game_type VARCHAR(50) NOT NULL,
  theme VARCHAR(50) NOT NULL,
  lua_script TEXT NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  shared BOOLEAN DEFAULT FALSE,
  download_url TEXT
);

-- Create profiles table (for user management)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT,
  tier VARCHAR(20) DEFAULT 'free', -- free, pro, studio
  generation_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE generated_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for row level security
CREATE POLICY "Users can view own games" ON generated_games
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create games" ON generated_games
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own games" ON generated_games
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
```

## 🏗️ Project Structure Overview

```
rogen/
├── pages/                      # Next.js pages and API routes
│   ├── api/
│   │   ├── ai-generate.ts     # AI game generation endpoint
│   │   ├── download.ts        # Download ZIP endpoint
│   │   └── health.ts          # Health check endpoint
│   ├── index.tsx              # Landing page (/)
│   ├── generate.tsx           # Game generation page (/generate)
│   ├── _app.tsx               # App wrapper
│   └── _document.tsx          # HTML document structure
│
├── components/                # React components
│   ├── Navbar.tsx             # Navigation bar
│   ├── Hero.tsx               # Hero section with CTA
│   ├── Form.tsx               # Game generation form
│   ├── GameCard.tsx           # Generated game display card
│   ├── Carousel.tsx           # Example games carousel
│   ├── PricingSection.tsx      # Pricing tiers
│   ├── LoadingState.tsx        # Loading skeleton screens
│   ├── ShareModal.tsx          # Social sharing modal
│   └── Footer.tsx             # Footer with links
│
├── lib/                       # Utility functions and state
│   ├── supabase.ts            # Supabase client setup
│   ├── utils.ts               # Helper utilities
│   └── store.ts               # Zustand state management
│
├── styles/                    # Global styles
│   └── globals.css            # TailwindCSS globals
│
├── public/                    # Static assets
│   └── (add logos, images here)
│
├── Configuration Files
│   ├── package.json           # Dependencies and scripts
│   ├── tsconfig.json          # TypeScript configuration
│   ├── next.config.js         # Next.js configuration
│   ├── tailwind.config.js      # TailwindCSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   └── .env.local.example     # Environment variables template
│
└── README.md                  # Project documentation
```

## 📦 Build & Production

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Make sure all these are set in your hosting environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` (if using real AI)
- `NEXT_PUBLIC_APP_URL` (your production domain)

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel

# Set production environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

### Option 2: Using GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **New Project**
4. Select your GitHub repository
5. Add environment variables in **Settings > Environment Variables**
6. Click **Deploy**

## 🚀 Deploy to Render

1. Go to [render.com](https://render.com)
2. Create a new account or log in
3. Click **New** > **Web Service**
4. Connect your GitHub repository
5. Configuration:
   - **Name**: roboxgen
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
6. Add environment variables
7. Click **Create Web Service**

## 🔧 Customization & Extensions

### Add Your Logo

1. Create a logo SVG or PNG
2. Place it in `/public/logo.png`
3. Update `components/Navbar.tsx`:
   ```tsx
   <Image src="/logo.png" alt="Logo" width={40} height={40} />
   ```

### Change Color Scheme

Edit `tailwind.config.js`:
```js
colors: {
  primary: '#your-color',    // Main brand color
  secondary: '#your-color',  // Accent color
  accent: '#your-color',     // Highlight color
}
```

### Add More Game Types

1. Edit `lib/utils.ts` - add to `getGameTypeEmoji()`
2. Edit `components/Form.tsx` - add to `gameTypes` array
3. Create new Lua templates if needed

### Integrate Real OpenAI

In `pages/api/ai-generate.ts`, uncomment and use the `generateWithOpenAI` function:

```ts
import OpenAI from 'openai';

// Call the function in the handler
const luaScript = await generateWithOpenAI(description, gameType, theme);
```

## 📊 Monitoring & Debugging

### Enable Debug Mode

Set in `.env.local`:
```env
DEBUG=*
```

### Check API Routes

```bash
# Check health
curl http://localhost:3000/api/health

# Test game generation
curl -X POST http://localhost:3000/api/ai-generate \
  -H "Content-Type: application/json" \
  -d '{
    "description": "A fun puzzle game",
    "gameType": "puzzle",
    "theme": "colorful"
  }'
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Error
- Verify credentials in `.env.local`
- Check that Supabase project is active
- Ensure network connection is stable
- Check Supabase status page

### TypeScript Errors
```bash
# Rebuild TypeScript
npx tsc --noEmit
```

## 📈 Performance Optimization

### Enable Image Optimization
Already configured in `next.config.js`

### Code Splitting
Next.js handles this automatically

### Database Optimization
- Add indexes on frequently queried columns
- Archive old generated games
- Implement caching strategies

## 🔐 Security Checklist

- [ ] Never commit `.env.local` to version control
- [ ] Use environment variables for all secrets
- [ ] Enable Row-Level Security (RLS) in Supabase
- [ ] Validate all user inputs on backend
- [ ] Use HTTPS in production
- [ ] Set up CORS properly
- [ ] Implement rate limiting
- [ ] Regular security audits

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
supabase db pull        # Pull database changes
supabase db push        # Push database changes

# Deployment
vercel deploy           # Deploy preview
vercel --prod          # Deploy to production
```

## 🤝 Contributing & Support

- Report bugs via GitHub Issues
- For questions, check existing documentation
- Join our Discord community for support
- Follow our contributing guidelines

## 🏁 You're Ready!

Your RoboxGen platform is now set up and ready to deploy. Start with local development, test thoroughly, then deploy to production.

Happy coding! 🎮✨

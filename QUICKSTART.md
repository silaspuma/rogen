# 🚀 RoboxGen - Quick Start Guide

## ⚡ 60-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.local.example .env.local

# 3. Edit .env.local with your keys
# Add your Supabase & OpenAI credentials

# 4. Start the dev server
npm run dev

# 5. Open browser
# → http://localhost:3000
```

## 📋 You'll Need

Before starting, gather these:

### Supabase (Free)
1. Sign up: [supabase.com](https://supabase.com)
2. Create a project
3. Copy from Settings > API:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### OpenAI (Optional)
1. Sign up: [openai.com](https://openai.com)
2. Create API key at platform.openai.com
3. Copy to `OPENAI_API_KEY` in `.env.local`

## 📁 What's Inside

```
✅ Landing page with hero section
✅ Game generation page with form
✅ Example carousel with 5 mock games
✅ Pricing section with 3 tiers
✅ AI integration ready (API endpoint)
✅ Download ZIP functionality
✅ Social sharing buttons
✅ Mobile-responsive design
✅ TailwindCSS styling
✅ TypeScript support
✅ Zustand state management
```

## 🎯 Pages

| URL | Purpose |
|-----|---------|
| `/` | Landing page - hero, examples, pricing |
| `/generate` | Game generation interface |
| `/api/ai-generate` | POST endpoint to create games |
| `/api/download` | Download ZIP files |
| `/api/health` | Health check endpoint |

## 🎨 Features

### Landing Page (`/`)
- ✨ Hero section with CTA
- 🎮 Feature cards
- 📊 Stats counter
- 🎠 Example game carousel
- 💰 Pricing section
- 📱 Mobile responsive

### Generate Page (`/generate`)
- 📝 Game description form
- 🎯 Game type selector (6 types)
- 🎨 Theme selector (6 themes)
- ⚡ AI generation
- ⬇️ Download ZIP
- 📋 Setup instructions
- 📱 Social sharing
- 📚 Previous games library

## 🛠️ Tech Stack

```
Frontend:
  - Next.js 14 (React 18)
  - TypeScript
  - TailwindCSS 3
  - Framer Motion (animations)
  - Zustand (state)
  - Lucide React (icons)

Backend:
  - Next.js API Routes
  - JSZip (file generation)

Database:
  - Supabase + PostgreSQL

AI:
  - OpenAI GPT API (optional)

Hosting:
  - Vercel (recommended)
  - Render (alternative)
```

## 📦 Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎮 Game Types Supported

1. **Adventure** 🗺️ - Exploration, quests, bosses
2. **Puzzle** 🧩 - Logic, patterns, challenges
3. **Racing** 🏎️ - Speed, competition, tracks
4. **Survival** 🏕️ - Resources, crafting, waves
5. **Shooter** 🎯 - Combat, targets, weapons
6. **Tycoon** 💰 - Business, management, empire

## 🎨 Themes Supported

1. **Fantasy** - Medieval, magic, dragons
2. **Sci-Fi** - Futuristic, tech, space
3. **Modern** - Contemporary, urban
4. **Medieval** - Castles, knights, historical
5. **Cyberpunk** - Neon, futuristic cities
6. **Retro** - Pixel art, 8-bit

## 📊 Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#8b5cf6` | Violet - Main brand |
| Secondary | `#ec4899` | Pink - Accents |
| Accent | `#06b6d4` | Cyan - Highlights |
| Dark | `#0f172a` | Dark slate - Background |
| Light | `#f8fafc` | Light slate - Text |

## 🔐 Environment Variables Template

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenAI (Optional, for real AI generation)
OPENAI_API_KEY=sk-...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Deploy in 5 Minutes

### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel
# Follow prompts, add env vars, done!
```

### Option 2: Render
1. Go to [render.com](https://render.com)
2. New Web Service
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

## 📈 What's Generated

When a user creates a game, you get:

```
game_123456789.zip
├── game_main.lua          # Ready-to-use Lua script
├── README.md              # Setup instructions
└── Package.txt            # Game metadata
```

The Lua file includes:
- ✅ Complete game framework
- ✅ Player management
- ✅ Game mechanics
- ✅ Comments explaining code
- ✅ Ready to customize

## 🎯 Next Steps

1. **Configure Environment**
   - Set up Supabase account
   - Get API credentials
   - Add to `.env.local`

2. **Test Locally**
   - Run `npm run dev`
   - Test form submission
   - Download a game ZIP

3. **Customize**
   - Add your logo/branding
   - Adjust colors in `tailwind.config.js`
   - Update text/copy

4. **Connect Backend**
   - Implement real OpenAI integration
   - Set up Supabase database tables
   - Add user authentication

5. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Set production environment vars

## 📚 Documentation Files

- `README.md` - Full project documentation
- `SETUP.md` - Detailed setup & deployment guide
- `FEATURES.md` - Features & user guide
- `QUICKSTART.md` - This file!

## 🐛 Common Issues

**"Module not found" error:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Supabase connection error:**
- Check credentials in `.env.local`
- Verify Supabase project is active
- Restart dev server

## 💬 Need Help?

- 📧 Email: support@roboxgen.com
- 🐦 Twitter: [@roboxgen](https://twitter.com/roboxgen)
- 💜 Discord: [Join community](https://discord.gg/roboxgen)
- 📖 Docs: [Full docs](https://docs.roboxgen.com)

## 🎉 You're All Set!

Your AI Roblox game generator is ready to go.

**Start creating:**
1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Click "Generate My Game"
4. Describe your game
5. Download and enjoy!

---

**Built with ❤️ for Roblox creators worldwide**

*Last updated: February 2025*

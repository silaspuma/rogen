# RoboxGen - AI Roblox Game Generator

![RoboxGen](https://img.shields.io/badge/next.js-14.0-black?style=flat-square) ![RoboxGen](https://img.shields.io/badge/tailwindcss-3.3-38B2AC?style=flat-square) ![RoboxGen](https://img.shields.io/badge/react-18.2-61DAFB?style=flat-square)

A modern, production-ready web platform that leverages AI to generate Roblox game files from natural language descriptions. Built with Next.js, TailwindCSS, and designed for viral growth on social platforms.

## ✨ Features

- 🎮 **AI-Powered Generation**: Describe your game idea, get instant Lua scripts
- ⚡ **Instant Downloads**: Get ready-to-use ZIP files with complete game code
- 🎨 **Customizable Themes**: 6+ visual themes to match your game aesthetic
- 📱 **Mobile-First Design**: Fully responsive, Gen-Z viral aesthetic
- 🔐 **User Accounts**: Track generated games, manage downloads
- 💰 **Flexible Pricing**: Free tier + premium unlimited access
- 🚀 **TikTok Ready**: Built-in share functionality for social virality
- 📊 **Analytics**: Track your game's performance and engagement

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: TailwindCSS 3 + custom animations
- **State Management**: Zustand
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + OAuth
- **AI Integration**: OpenAI GPT-4 (optional)
- **Hosting**: Vercel or Render
- **File Generation**: jszip + FileSaver

## 📋 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (for database)
- OpenAI API key (optional, for real AI generation)

### Installation

1. **Clone the repository**
   ```bash
   cd rogen
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # OpenAI (Optional)
   OPENAI_API_KEY=your_openai_api_key_here

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## 📁 Project Structure

```
rogen/
├── pages/
│   ├── api/
│   │   ├── ai-generate.ts      # Game generation endpoint
│   │   ├── download.ts         # ZIP file download
│   │   └── health.ts           # Health check
│   ├── index.tsx               # Landing page
│   ├── generate.tsx            # Game generation page
│   ├── _app.tsx                # App wrapper
│   └── _document.tsx           # Document structure
├── components/
│   ├── Navbar.tsx              # Navigation bar
│   ├── Hero.tsx                # Hero section
│   ├── Form.tsx                # Game generation form
│   ├── GameCard.tsx            # Game display card
│   ├── Carousel.tsx            # Example games carousel
│   ├── PricingSection.tsx       # Pricing plans
│   ├── LoadingState.tsx         # Loading skeletons
│   ├── ShareModal.tsx           # Social sharing modal
│   └── Footer.tsx              # Footer
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── utils.ts                # Utility functions
│   └── store.ts                # Zustand store
├── styles/
│   └── globals.css             # Global styles
├── public/                     # Static assets
├── tailwind.config.js          # TailwindCSS config
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
├── postcss.config.js           # PostCSS config
└── package.json
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Add environment variables in Project Settings
5. Deploy!

### Deploy to Render

1. Create a new Web Service on [render.com](https://render.com)
2. Connect your GitHub repository
3. Set environment variables
4. Deploy!

## 📖 API Documentation

### Generate Game
```bash
POST /api/ai-generate
Content-Type: application/json

{
  "description": "A dungeon crawler with monsters and loot",
  "gameType": "adventure",
  "theme": "fantasy"
}
```

Response:
```json
{
  "game": {
    "id": "game_123456789",
    "name": "Dungeon Crawler",
    "description": "A dungeon crawler with monsters and loot",
    "type": "adventure",
    "theme": "fantasy",
    "luaScript": "-- Lua code here",
    "downloadUrl": "/api/download/game_123456789"
  }
}
```

### Download Game ZIP
```bash
GET /api/download/game_123456789
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` theme colors:
```js
colors: {
  primary: '#8b5cf6',    // Violet
  secondary: '#ec4899',  // Pink
  accent: '#06b6d4',     // Cyan
}
```

### Game Types
Add/modify in `lib/utils.ts` and `components/Form.tsx`:
```ts
const gameTypes = [
  { value: 'adventure', label: '🗺️ Adventure' },
  // Add more types
];
```

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role |
| `OPENAI_API_KEY` | No | OpenAI API key for real AI generation |
| `NEXT_PUBLIC_APP_URL` | No | Application base URL |

## 🛡️ Security

- Environment variables are never exposed to the client (only `NEXT_PUBLIC_*`)
- API routes validate all inputs
- Consider implementing rate limiting for production
- Use Supabase Row-Level Security (RLS) for data protection

## 📈 Features to Add

- [ ] User authentication system
- [ ] Game library/dashboard
- [ ] Advanced analytics
- [ ] Multiplayer game templates
- [ ] Asset marketplace
- [ ] Community game showcase
- [ ] Email notifications
- [ ] API for third-party integrations

## 🐛 Troubleshooting

### Port already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not loading
- Ensure `.env.local` is in the root directory
- Restart the development server after changes
- Variables must start with `NEXT_PUBLIC_` to be exposed to the browser

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Roblox Lua Documentation](https://create.roblox.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

- 📧 Email: support@roboxgen.com
- 🐦 Twitter: [@roboxgen](https://twitter.com/roboxgen)
- 💜 Discord: [Join our community](https://discord.gg/roboxgen)

---

**Made with ❤️ for Roblox creators worldwide**

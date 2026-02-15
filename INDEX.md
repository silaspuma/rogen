# 📖 RoboxGen - File Index & Navigation

## 🎯 Quick Links to Documentation

| Document | Purpose | Read Time | For |
|----------|---------|-----------|-----|
| **[QUICKSTART.md](QUICKSTART.md)** | 60-second setup | 2 min | First-time users |
| **[README.md](README.md)** | Full documentation | 10 min | Everyone |
| **[SETUP.md](SETUP.md)** | Detailed setup guide | 15 min | Deployment/Config |
| **[FEATURES.md](FEATURES.md)** | Features & guide | 10 min | End users |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Complete overview | 20 min | Developers |

---

## 📁 File & Directory Guide

### 📋 Configuration Files (Root Level)

| File | Purpose | Edit? |
|------|---------|-------|
| `package.json` | Dependencies & scripts | Yes - add packages |
| `tsconfig.json` | TypeScript config | Rarely |
| `next.config.js` | Next.js settings | Rarely |
| `tailwind.config.js` | Colors & design system | **Often** - customize colors |
| `postcss.config.js` | PostCSS plugins | Rarely |
| `.env.local.example` | Env var template | Copy to `.env.local` |
| `.gitignore` | Git ignore patterns | Rarely |

### 📚 Documentation Files

| File | Content |
|------|---------|
| `README.md` | Main project docs, tech stack, deployment |
| `SETUP.md` | Step-by-step setup, database, troubleshooting |
| `QUICKSTART.md` | 60-second quick start guide |
| `FEATURES.md` | Feature list, user guide, tips |
| `PROJECT_SUMMARY.md` | Complete project overview & architecture |
| **This File** | File index & navigation |

### 🎨 Frontend - Pages (`/pages`)

| File | URL | Purpose | Key Components |
|------|-----|---------|-----------------|
| `index.tsx` | `/` | Landing page | Hero, Carousel, Pricing, CTA |
| `generate.tsx` | `/generate` | Game gen page | Form, Results, Instructions |
| `_app.tsx` | - | App wrapper | Navbar, Footer, Layout |
| `_document.tsx` | - | HTML document | Meta tags, favicon |

### 🎨 Frontend - Components (`/components`)

| File | Purpose | Props | Used In |
|------|---------|-------|---------|
| `Navbar.tsx` | Top navigation | None | All pages |
| `Hero.tsx` | Hero section | None | `/` |
| `Form.tsx` | Game gen form | `onSuccess?` | `/generate` |
| `GameCard.tsx` | Game display | `game: GeneratedGame` | `/generate` |
| `Carousel.tsx` | Example games | None | `/` |
| `PricingSection.tsx` | Pricing tiers | None | `/` |
| `LoadingState.tsx` | Loading skeletons | None | Form loading |
| `ShareModal.tsx` | Share dialog | `isOpen, gameName, onClose` | `/generate` |
| `Footer.tsx` | Footer | None | All pages |

### 🔧 Utilities & Logic (`/lib`)

| File | Exports | Purpose |
|------|---------|---------|
| `supabase.ts` | `createClient()` | Supabase client setup |
| `utils.ts` | Multiple functions | Game utilities, formatting |
| `store.ts` | `useGameStore` | Zustand state management |

**Key Functions in `utils.ts`:**
- `generateGameId()` - Create unique IDs
- `formatDate()` - Format timestamps
- `truncate()` - Truncate text
- `isValidEmail()` - Email validation
- `getGameTypeColor()` - Type to color mapping
- `getGameTypeEmoji()` - Type to emoji mapping
- `generateMockLuaScript()` - Generate Lua code
- `formatFileSize()` - Format bytes to KB/MB
- `copyToClipboard()` - Copy text utility

### 🎨 Styles (`/styles`)

| File | Contains |
|------|----------|
| `globals.css` | Global styles, custom classes, animations |

**Custom Tailwind Classes:**
- `.btn`, `.btn-primary`, `.btn-secondary` - Button variants
- `.input` - Input styling
- `.card` - Card styling
- `.gradient-text` - Gradient text effect
- `.animate-*` - Custom animations

### 📡 Backend - API Routes (`/pages/api`)

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `ai-generate.ts` | `/api/ai-generate` | POST | Generate game |
| `download.ts` | `/api/download/[id]` | GET | Download ZIP |
| `health.ts` | `/api/health` | GET | Health check |

**API Request Examples:**

```bash
# Generate a game
curl -X POST http://localhost:3000/api/ai-generate \
  -H "Content-Type: application/json" \
  -d '{
    "description": "A fun puzzle game",
    "gameType": "puzzle",
    "theme": "colorful"
  }'

# Download a game
curl http://localhost:3000/api/download/game_123456789

# Check health
curl http://localhost:3000/api/health
```

### 📦 Public Assets (`/public`)

| Item | Location | Usage |
|------|----------|-------|
| Logo | `/public/logo.png` | Navbar branding |
| Favicon | `/public/favicon.ico` | Browser tab |
| Images | `/public/images/` | Page graphics |

---

## 🎯 How to Customize

### Change Colors
**File:** `tailwind.config.js`
```js
colors: {
  primary: '#8b5cf6',      // Change to your color
  secondary: '#ec4899',    // Change to your color
  accent: '#06b6d4',       // Change to your color
}
```

### Change Copy/Text
**Find & Replace:**
- `RoboxGen` → Your name
- `Roblox game` → Your description
- All CTA text throughout components

### Add New Game Type
1. Edit `components/Form.tsx` - add to `gameTypes`
2. Edit `lib/utils.ts` - add emoji and color
3. Update game generation logic if needed

### Modify Pricing Tiers
**File:** `components/PricingSection.tsx`
- Change `pricingTiers` array
- Update features list
- Adjust pricing

### Change Animations
**File:** `tailwind.config.js` or `styles/globals.css`
- Modify animation timing
- Add new keyframes
- Adjust transition durations

---

## 🚀 Development Workflow

### 1. Make a Change
Pick a file from above and edit it

### 2. Test Locally
```bash
npm run dev
# Visit http://localhost:3000
```

### 3. Rebuild (if needed)
```bash
npm run build
```

### 4. Test in Production
```bash
npm run start
```

### 5. Deploy
```bash
git add .
git commit -m "Your changes"
git push
# Vercel automatically deploys
```

---

## 📊 File Statistics

| Type | Count | Size |
|------|-------|------|
| Pages | 2 | ~500 lines |
| Components | 9 | ~2,000 lines |
| API Routes | 3 | ~300 lines |
| Utilities | 3 | ~400 lines |
| Config Files | 7 | ~200 lines |
| Styles | 1 | ~300 lines |
| **Total** | **28** | **~3,700 lines** |

---

## 🔗 File Relationships

```
index.tsx (/)
  ├── uses Navbar
  ├── uses Hero
  ├── uses Carousel
  ├── uses PricingSection
  └── uses Footer

generate.tsx (/generate)
  ├── uses Navbar
  ├── uses Form
  │   └── calls ai-generate API
  ├── uses GameCard
  ├── uses ShareModal
  └── uses Footer

Form.tsx
  ├── imports useGameStore
  ├── imports utils
  └── calls /api/ai-generate

GameCard.tsx
  ├── imports JSZip & FileSaver
  ├── calls /api/download
  └── uses ShareModal

_app.tsx
  ├── wraps all pages
  ├── imports Navbar
  ├── imports Footer
  └── imports globals.css
```

---

## 🎓 Best Practices

### ✅ Do's
- ✅ Keep components focused and single-purpose
- ✅ Use TypeScript for type safety
- ✅ Test changes locally before deploying
- ✅ Add comments to complex logic
- ✅ Keep .env.local out of Git
- ✅ Use meaningful variable names

### ❌ Don'ts
- ❌ Edit node_modules directly
- ❌ Commit environment variables
- ❌ Mix multiple concerns in components
- ❌ Ignore TypeScript warnings
- ❌ Use hardcoded values without constants
- ❌ Skip testing before deployment

---

## 📞 Quick Reference

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for prod
npm run start    # Start prod server
npm run lint     # Check for errors
```

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase API key
- `OPENAI_API_KEY` - OpenAI API key

### Deployment
- **Vercel:** `vercel --prod`
- **Render:** Push to GitHub, auto-deploys
- **Local:** `npm run start`

---

## 🆘 When You Need Help

| Issue | File | Solution |
|-------|------|----------|
| Styling | `tailwind.config.js` | Colors & design |
| API errors | `/pages/api/*` | Endpoint logic |
| Form issues | `components/Form.tsx` | Validation & submission |
| Database | `lib/supabase.ts` | Connection settings |
| Type errors | `tsconfig.json` | TypeScript settings |
| Deployment | `SETUP.md` | Deployment guide |

---

## 📈 Next Steps

1. **Read:** [QUICKSTART.md](QUICKSTART.md)
2. **Setup:** Follow environment setup
3. **Test:** Run `npm run dev`
4. **Customize:** Edit files as needed
5. **Deploy:** Follow [SETUP.md](SETUP.md)
6. **Share:** Tell the Roblox community!

---

## 📚 External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Roblox Docs](https://create.roblox.com/docs)

---

**Need more help? Check the [README.md](README.md) or [SETUP.md](SETUP.md)**

---

*Generated: February 15, 2025*  
*RoboxGen - AI Roblox Game Generator*

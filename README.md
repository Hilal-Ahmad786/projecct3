# PakSoft - Modern Digital Solutions

Enterprise web development, AI solutions, e-commerce, automation and digital marketing services.

**Website:** https://paksoft.com.tr

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Database:** PostgreSQL with Prisma
- **Languages:** TypeScript
- **i18n:** Custom SSR implementation (5 languages)
- **Hosting:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── [locale]/       # Localized public pages
│   ├── admin/          # Admin dashboard (protected)
│   └── api/            # API routes
├── components/         # React components
├── hooks/              # Custom React hooks
├── lib/                # Utilities (auth, i18n, seo)
├── locales/            # Translation JSON files
└── data/               # Static data
```

## Supported Languages

| Code | Language | Direction |
|------|----------|-----------|
| en   | English  | LTR       |
| tr   | Turkish  | LTR       |
| de   | German   | LTR       |
| ur   | Urdu     | RTL       |
| ar   | Arabic   | RTL       |

## Key Features

### SEO
- Server-side rendered translations
- hreflang tags for all languages
- Canonical URLs
- Structured data (JSON-LD)
- Sitemap with all locales
- OpenGraph and Twitter cards

### Security
- Admin authentication with secure sessions
- Rate limiting
- Security headers
- robots.txt protection

### Services
- 20+ service pages with dedicated content
- AI 2026 services (Voice AI, AI Security, etc.)
- Case study pages
- Process and FAQ sections

## Documentation

- [SEO Implementation](./docs/SEO-IMPLEMENTATION.md)
- [Admin Authentication](./docs/ADMIN-AUTH.md)

## Environment Variables

Required environment variables:

```bash
# Database
DATABASE_URL="postgresql://..."

# Admin Authentication
ADMIN_USER="your_admin_username"
ADMIN_PASS="your_secure_password"

# Optional
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
RECAPTCHA_SECRET_KEY=""
NEXT_PUBLIC_GA_ID=""
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run ESLint
```

## License

Proprietary - All rights reserved.

# Black Comb

Pokazowa strona barbershop z Payload CMS 3 i Next.js 15.

## Stack

- Next.js 15 (App Router)
- Payload CMS 3
- PostgreSQL (Neon)
- TypeScript
- Tailwind CSS + shadcn/ui
- Deploy: Vercel

## Setup

```bash
pnpm install
cp .env.example .env
# uzupełnij DATABASE_URI i PAYLOAD_SECRET
pnpm dev
```

Admin panel: http://localhost:3000/admin
Frontend: http://localhost:3000
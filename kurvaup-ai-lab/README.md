# KurvaUp AI Lab v0.3

Vercel-ready Next.js MVP for KurvaUp AI Lab.

## Included
- Public landing page and product catalog
- Product detail pages
- Feedback and product-idea forms
- Supabase PostgreSQL persistence
- Server-side analytics event ingestion
- Supabase email/password admin login
- Admin allowlist using `ADMIN_EMAILS`
- 30-day analytics dashboard and Product Validation Score v1

## Required environment variables

```env
NEXT_PUBLIC_SITE_URL=https://ai.kurvaup.com
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxx
ADMIN_EMAILS=you@example.com
```

### Security
`SUPABASE_SECRET_KEY` is server-only. Put it in Vercel Environment Variables. Never commit it, expose it to browser code, or prefix it with `NEXT_PUBLIC_`.

## Supabase setup
1. Open Supabase SQL Editor.
2. Run `supabase/schema.sql`.
3. In Authentication, create the admin user that matches an email in `ADMIN_EMAILS`.

## Vercel
1. Push this folder to GitHub.
2. Import it in Vercel.
3. Framework Preset: **Next.js**.
4. Root Directory: `./`.
5. Add all environment variables above.
6. Deploy.
7. Test `/login` and `/admin/dashboard`.
8. Add `ai.kurvaup.com` under Vercel Project > Settings > Domains.

See `DEPLOY_VERCEL.md` for a step-by-step checklist.

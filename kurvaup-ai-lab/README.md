# KurvaUp AI Lab v0.2

Vercel-ready Next.js MVP for `ai.kurvaup.com` with Supabase analytics, feedback/idea collection, and protected admin dashboard.

## Included
- Public landing page and product catalog
- Product detail pages with `product_view` and `try_free_click` tracking
- Feedback and product-idea forms
- Supabase PostgreSQL schema
- Supabase email/password admin authentication
- Admin email allowlist
- `/admin/dashboard` with 30-day KPIs and Product Validation Score v1
- Vercel environment template

## 1. Install
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. Supabase
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Authentication, create the admin user(s) using email/password.
4. Copy Project URL, anon key, and service role key into `.env.local`.
5. Put authorized admin emails in `ADMIN_EMAILS`, comma-separated.

## 3. Environment variables
```env
NEXT_PUBLIC_SITE_URL=https://ai.kurvaup.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_EMAILS=eko@example.com,yanda@example.com
```
Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code or prefix it with `NEXT_PUBLIC_`.

## 4. Vercel deployment
1. Push this directory to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables under Project Settings > Environment Variables.
4. Deploy.
5. Add `ai.kurvaup.com` under Project Settings > Domains.
6. Configure the DNS record shown by Vercel in the KurvaUp DNS provider.

## 5. Admin
Open `/login`, sign in using a Supabase Auth user whose email is present in `ADMIN_EMAILS`, then visit `/admin/dashboard`.

## 6. Product URLs
Update `appUrl` for each product in `data/products.ts`. Until those URLs are changed from `#`, the Try Free button will not open a real application.

## Security notes
- Public forms and analytics write through server-side API routes using the service-role key.
- Supabase tables have RLS enabled with no public policies.
- `/admin` requires an authenticated user and optionally checks `ADMIN_EMAILS`.
- For higher traffic, add rate limiting / bot protection before public launch.

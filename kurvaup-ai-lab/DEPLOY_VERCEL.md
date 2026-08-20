# Deploy KurvaUp AI Lab ke Vercel

## 1. Supabase
1. Buat project Supabase.
2. Jalankan `supabase/schema.sql` melalui SQL Editor.
3. Buat user admin di Authentication.
4. Siapkan Project URL, Publishable key (`sb_publishable_...`) dan Secret key (`sb_secret_...`).

## 2. Environment Variables di Vercel
Tambahkan:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
SUPABASE_SECRET_KEY=sb_secret_xxxxx
ADMIN_EMAILS=you@example.com
NEXT_PUBLIC_SITE_URL=https://ai.kurvaup.com
```

`SUPABASE_SECRET_KEY` hanya boleh berada di server/Vercel Environment Variables. Jangan commit ke GitHub dan jangan diberi prefix `NEXT_PUBLIC_`.

Untuk deployment pertama sebelum custom domain aktif, `NEXT_PUBLIC_SITE_URL` boleh diisi URL `*.vercel.app`, kemudian diganti ke `https://ai.kurvaup.com` dan redeploy.

## 3. Vercel
- Framework Preset: **Next.js**
- Root Directory: `./`
- Build Command: default (`npm run build`)
- Output Directory: default
- Install Command: default

Klik **Deploy**.

## 4. Setelah Live
Tes:
- `/`
- `/products`
- `/feedback`
- `/submit-idea`
- `/login`
- `/admin/dashboard`

## 5. Domain
Di Vercel Project > Settings > Domains, tambahkan `ai.kurvaup.com` dan ikuti DNS record yang diberikan Vercel.

# Admin panel + database setup (Supabase)

Until you do this, the site keeps showing the built-in vehicle list. Once done, the site reads from the database and your dad can edit it at `/lt/admin`.

## 1. Use your existing project (no new project, no extra cost)
Open your current Supabase project. Everything below just adds a `vehicles` table and a `vehicle-images` bucket next to what's already there; it won't affect rumfunk.

**Before running the SQL:** open `supabase/schema.sql` and make sure the admin email (currently `vakarukemperiai@gmail.com`) matches the email you'll use to log in. Only that logged-in user can edit vehicles; everyone else (including other users in this shared project) can only read.

## 2. Create the tables
1. In the project: **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this folder, paste the whole thing, click **Run**. (Creates the `vehicles` table, security rules, and the `vehicle-images` storage bucket.)

## 3. Load the 23 existing vehicles
1. SQL Editor → New query.
2. Open `supabase/seed.sql`, paste, **Run**.

## 4. Get your keys
1. **Project Settings → API**.
2. Copy **Project URL** and the **anon public** key.
3. In this `website` folder, create a file named `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

(There's an `.env.local.example` you can copy.)

## 5. Create the admin login
1. **Authentication → Users → Add user → Create new user**.
2. Enter the **same admin email used in `schema.sql`** (default `vakarukemperiai@gmail.com`) and a password, tick **Auto confirm**. That email + password is the admin login.

## 6. Restart and log in
```
npm install
Remove-Item -Recurse -Force .next
npm run dev
```
Open **http://localhost:3000/lt/admin**, log in, and you can add / edit / delete campers and upload photos. Changes appear on the site within ~30 seconds.

## On Vercel (when you deploy)
Add the same two `NEXT_PUBLIC_...` variables in Vercel → Project → Settings → Environment Variables, then redeploy.

## Notes
- The site works fine before this is set up; it just uses the built-in list.
- Photos uploaded in the admin go to the `vehicle-images` bucket (public).
- The admin page is hidden from search engines.

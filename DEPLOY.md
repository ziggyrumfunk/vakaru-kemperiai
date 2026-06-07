# Deploy to Vercel

## Part 1 — Put the code on GitHub (using GitHub Desktop)

1. Open **GitHub Desktop** (the same app you used for rumfunk). If you don't have it: desktop.github.com → install → sign in.
2. **File → Add local repository**, choose the folder:
   `C:\Users\zygva\vakaru kemperiai\website`
3. If it says "this directory is not a Git repository", click **create a repository**. Name it `vakaru-kemperiai`, leave defaults, **Create repository**.
4. Bottom-left: type a summary like `Initial commit`, click **Commit to main**.
5. Top bar: **Publish repository**. You can keep it **Private** (Vercel still works). Click Publish.

Your `.env.local` is NOT uploaded (it's ignored on purpose). Photos/videos in `public` ARE uploaded, which is correct.

## Part 2 — Deploy on Vercel

1. Go to vercel.com, log in (same account as rumfunk).
2. **Add New… → Project**.
3. Find **vakaru-kemperiai** in the list → **Import**.
4. Framework Preset should auto-detect **Next.js**. Leave Root Directory as is.
5. Expand **Environment Variables** and add these two (copy exactly):

```
NEXT_PUBLIC_SUPABASE_URL = https://rbhzynpvmklxebqdznzz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_HgdvcCRBMG3Zj0ihQxR90w_jUKVOkmK
```

6. Click **Deploy** and wait ~2 minutes.
7. You'll get a link like `vakaru-kemperiai.vercel.app`. Open it and check the site, the 4 languages, and `/lt/admin` login.

## Part 3 — Future updates
Any change you commit + push in GitHub Desktop auto-deploys to Vercel. (Admin/vehicle edits don't need a deploy, they update live within ~30s.)

## Part 4 — Connect your domain (when ready)
Vercel → your project → **Settings → Domains** → add `vakarukemperiai.lt` and `www.vakarukemperiai.lt`. Vercel shows the DNS records to set at your .lt domain provider. SSL is automatic. (We can do this together when you're ready to switch the live domain over.)

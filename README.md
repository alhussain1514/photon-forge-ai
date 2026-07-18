# SunScale Pro

AI-assisted solar engineering & project management platform — React + Vite +
TypeScript + Tailwind CSS + shadcn/ui, backed by a real [Supabase](https://supabase.com)
database for accounts, projects, clients, load audits, and quotations.

This guide assumes you're working entirely from your phone using **GitHub
Codespaces** (a full dev environment that runs in the browser — no laptop
needed).

---

## 1. Push this code to GitHub

1. On your phone, go to **github.com** → **+** → **New repository**. Name it
   (e.g. `sunscale-pro`) and create it (empty, no README).
2. Open the **GitHub** app (or the mobile browser) → your new repo → there's
   an **"uploading an existing file"** link on the empty repo page.
3. Unzip this project on your phone (any file manager / zip app works), then
   upload all the files and folders through that page. If your phone can't
   unzip, open the zip's contents with any "extract" app first — GitHub's
   uploader needs individual files/folders, not the zip itself.

   *(Alternative: if you have any desktop access even briefly, `git init`,
   `git add .`, `git commit`, and `git push` is faster than the web
   uploader.)*

## 2. Open it in a Codespace

1. In the GitHub app/browser, open your repo.
2. Tap **Code** → **Codespaces** tab → **Create codespace on main**.
3. Wait ~1 minute — it opens a full VS Code + terminal in your browser. The
   `.devcontainer` config in this repo runs `npm install` for you
   automatically.

## 3. Create your free Supabase backend

1. Go to **supabase.com** → sign up (free tier is enough) → **New project**.
2. Once it's ready, go to **SQL Editor** → **New query**.
3. In your Codespace, open `supabase/schema.sql`, copy its entire contents,
   paste into the Supabase SQL editor, and hit **Run**. This creates all
   tables (`profiles`, `customers`, `projects`, `load_audits`, `quotations`)
   with row-level security so each user only ever sees their own data.
4. In Supabase, go to **Project Settings → API**. Copy the **Project URL**
   and the **anon public** key.

## 4. Connect the app to Supabase

In the Codespace terminal:

```bash
cp .env.example .env
```

Open `.env` and paste in your two values:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 5. Run it

```bash
npm run dev
```

Codespaces will pop up a "port forwarded" notification — tap **Open in
Browser**. You now have a real, working app: sign up creates a real Supabase
account, "New Project" saves a real row in your database, clients you add in
CRM persist, and load audits save real reports.

## 6. Deploy it for real (so it has a public URL)

The easiest free option:

1. Push your `.env` values (not the file itself — see below) as **secrets**
   in whichever host you pick.
2. **Vercel** (recommended): go to vercel.com → **Add New Project** → import
   your GitHub repo → in "Environment Variables" add
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` → Deploy. Vercel detects
   Vite automatically.
3. You'll get a public `https://your-app.vercel.app` URL that works from any
   phone.

**Never commit your real `.env` file** — it's already in `.gitignore`. Only
`.env.example` (with placeholder values) should go into GitHub.

---

## What's real vs. simulated

Wired to the real Supabase backend:
- **Auth** — real signup/login/logout/sessions
- **Projects** (New Project Wizard, Dashboard project list)
- **CRM** — real client records
- **Load Audits** — editable appliance list, saved reports

Still UI-only simulations (by nature — they'd need paid third-party APIs or
real hardware to be "real", e.g. satellite imagery providers, inverter/BMS
telemetry hardware): Roof Analysis satellite view, System Designer drag-drop,
live Monitoring energy flow, Maintenance/Installation timelines,
Recommendation Engine comparisons, Financials/Quotation numbers (these
compute from your inputs, but aren't yet linked line-by-line to saved
projects), Collaboration chat, Reporting charts. Tell me which of these
matter most to you and which real data source/provider you want to use
(e.g. a specific solar-irradiance API, a specific inverter brand's API) and
I'll wire those up next.

---

## Local development (non-Codespaces)

```bash
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev
npm run build           # production build
npm run typecheck       # type-check without emitting
```

---

## Tech stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · shadcn/ui · Supabase ·
Framer Motion · Recharts · React Hook Form + Zod

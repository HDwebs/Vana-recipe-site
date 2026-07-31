# VANA Recipe Library

The VANA Health & Performance member recipe library. Static site (Eleventy) with a self-serve admin panel (Decap CMS), built to deploy on Netlify. The site is public — no password required to view it.

## What's included

- 21 launch-ready recipes with full ingredients, method, and macros (calories/protein/carbs/fat)
- Search + filter by Meal Type, Diet, and Calorie band
- An admin panel at `/admin` for adding and editing recipes without touching code
- VANA branding throughout (black/orange, Toxigenesis Bold headings, Inter body)

See `VANA_Recipe_Data_Audit.md` for the 11 recipes still missing macros/content — add them any time through `/admin` and they'll appear on the site automatically.

## 1. Push this to GitHub

Netlify's CMS (Decap) needs a Git repository to save new recipes to. From this folder:

```
git init
git add .
git commit -m "Initial VANA recipe library"
```

Then create a new empty repository on GitHub and push:

```
git remote add origin <your-repo-url>
git push -u origin main
```

## 2. Deploy to Netlify

1. In Netlify: **Add new site → Import an existing project** → connect the GitHub repo.
2. Build settings are already configured in `netlify.toml` (build command `npm run build`, publish directory `_site`) — Netlify should pick these up automatically.
3. Deploy.

## 3. Turn on the admin panel (`/admin`)

The admin panel uses Netlify Identity + Git Gateway so you can log in and edit recipes without a GitHub account.

1. In Netlify: **Site configuration → Identity → Enable Identity**.
2. Under Identity settings, set registration to **Invite only**.
3. Under **Services → Git Gateway**, click **Enable Git Gateway**.
4. Go to the **Identity** tab for your site and **Invite user** — invite yourself (and anyone else who should be able to add recipes).
5. You'll get an email invite — follow it to set a password for `/admin`.

Once that's done, go to `yoursite.netlify.app/admin`, log in, and you'll see a form for adding/editing recipes. Publishing a recipe there commits it to the GitHub repo and Netlify automatically rebuilds the site — usually live within a minute or two.

Note: `/admin` login (Netlify Identity) is only for whoever edits recipes — it's a separate, private login, not something clients ever see. The recipe site itself is fully public.

## 4. Adding recipe photos

Recipes currently show a placeholder tile instead of a photo — the Notion cover images were mostly generic stock photos, not real dish photography, so I didn't carry them over. Add a real photo to any recipe any time via the **Photo** field in `/admin`; it'll appear on both the card and the recipe page automatically.

## Local development

```
npm install
npm run build     # builds the static site to _site/
npm start         # local dev server with live reload
```

`/admin` won't fully function locally (it depends on Netlify's Identity service) — test it on a real Netlify deploy.

## Project structure

```
content/recipes/*.md     — one file per recipe (what /admin edits)
_includes/                — page templates (base layout + recipe layout)
index.njk                  — homepage (search/filter/grid)
css/style.css              — all styling
js/filter.js                — client-side search & filter logic
admin/                       — Decap CMS admin panel
```

`netlify/functions/login.js` and `netlify/edge-functions/gate.js` are left in the project but unused — they were the password gate, now switched off in `netlify.toml`. Safe to ignore or delete; if you ever want the gate back, restore the `[[edge_functions]]` block in `netlify.toml`.

# Heartfelt Family Church — website

A static HTML site. No build step, no server code — just files. It runs anywhere that serves plain HTML.

## Publish on GitHub Pages

1. **Create the repo.** On github.com, create a new repository (e.g. `heartfelt-website`). You can make it public or private (Pages works with both on free accounts for public repos).

2. **Upload these files.** Upload *everything inside this `export` folder* to the repo root — not the `export` folder itself. So the repo root should directly contain `index.html`, `about.html`, the `assets/` folder, `.nojekyll`, and `.image-slots.state.json`.
   - Easiest: on the repo page click **Add file → Upload files**, then drag all the files/folders in. (Drag the *contents*, so `index.html` sits at the top level.)
   - The `.nojekyll` and `.image-slots.state.json` files start with a dot. GitHub's uploader keeps them — just make sure they come along. `.nojekyll` is required, or your photos won't load.

3. **Turn on Pages.** In the repo: **Settings → Pages**. Under *Build and deployment → Source*, choose **Deploy from a branch**. Set branch to **main** and folder to **/ (root)**. Save.

4. **Wait ~1 minute.** GitHub gives you a URL like `https://YOUR-USERNAME.github.io/heartfelt-website/`. That's your live site. `index.html` is the home page.

## Notes

- **Photos:** the images you dropped in are baked into `.image-slots.state.json` and load automatically. Any spot you never filled will show an empty placeholder box — fill those before publishing if you want them gone.
- **Editing later:** to change text or images, edit the files here and re-upload, or edit directly on GitHub. There's no live editor once it's on Pages.
- **Custom domain:** in Settings → Pages you can point your own domain (e.g. heartfeltchurch.co.za) at the site.

## Files
- `index.html` — home
- `about.html` — about / leadership
- `perfecting-the-saints.html` — courses
- `sermons.html`, `social.html`, `welfare.html`, `youth.html`, `contact.html`
- `assets/` — CSS, JS, logos, images, QR codes

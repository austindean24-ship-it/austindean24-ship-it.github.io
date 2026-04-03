# Austin Dean Living Resume

This repository contains a static personal website designed as a living resume, portfolio, and writing space.

## Files

- `index.html`: page structure and section layout
- `styles.css`: full visual system, responsive design, spacing, and animation
- `content.js`: the main content file for profile text, experience, skills, highlights, writing entries, and links
- `script.js`: rendering logic and light interactions
- `assets/`: resume PDF plus local image assets used in the design

## Update content

Edit `content.js` when you want to change:

- headline and hero text
- about copy
- experience entries
- highlights
- skills
- writing notes
- contact links

## Update images

Replace files inside `assets/images/` and then update the file paths in `content.js`.

Current visuals include public-source images used as a first pass:

- `austin-dean-portrait.jpeg`
- `cnu-campus.jpg`
- `cnu-research.jpg`
- `bonner-community.jpg`

## View locally

If the local server is running, open:

- `http://localhost:8000`

If not, from this folder run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Good next upgrades

- Turn writing entries into dedicated post pages
- Add a custom domain and analytics
- Replace placeholder/public contextual visuals with lab, poster, conference, and hospital images that are more specific to Austin

# Srivastava Lab website

Source for <https://srivastavalab.in>. GitHub Pages builds it with Jekyll
automatically on every push to `main`. There is no build step to run yourself.

## Common edits

| To change… | Edit this file |
|---|---|
| Add or edit a **publication** | `_data/publications.yml`: copy an entry, put the figure in `images/blog/` |
| Add or edit a **team member** card | `_data/team.yml` (`current` or `former`) |
| Add **lab news** to the homepage | `_data/news.yml`: newest entry at the top |
| A person's **profile page** | `_people/<name>.md` (becomes `<name>.html`) |
| A **research project** page | `_research/<name>.md` |
| Phone, email, address, menu | `_config.yml` |
| Header / footer | `_includes/header.html`, `_includes/footer.html` |
| Colours, spacing, fonts | `assets/css/site.css` |

### New profile page

1. Copy an existing file in `_people/`, e.g. `_people/rohit.md` → `_people/newname.md`.
2. Edit the details at the top (between the `---` lines) and the text below.
3. In `_data/team.yml`, add `page: newname.html` to that person's entry so the
   Team page links to it.

The old page addresses (`blog-grid.html`, `set 1.html`, `akar.html`, …) are kept
as small redirect files so existing links keep working.

## Previewing locally (optional)

Requires Ruby 3.3 with DevKit.

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

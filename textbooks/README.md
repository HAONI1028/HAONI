# Textbooks

The "📖 Textbook" buttons open a **hosted PDF link** in a new browser tab — the
PDF is not stored in this repo (the Pre-Calc 11 book alone is ~23 MB, too big to
commit and it would slow the site/push).

## How to set a course's textbook
Edit that course's `.tb-btn` link and set its `href` to a direct PDF URL:
- Home page cards → `index.html`
- Pre-Calculus 11 units page → `precalc_11/index.html`

Use a URL that ends in `.pdf` so it opens inline. For Google Drive, share the
file "Anyone with the link" and use the direct form
`https://drive.google.com/uc?export=view&id=FILE_ID`.

## Current links
| Course | Link |
|--------|------|
| Pre-Calculus 11 | ✅ set (hosted PDF) |
| Pre-Calculus 12 | ⬜ placeholder — replace the href when you have a URL |
| Physics 11 | ⬜ placeholder |
| Chemistry 11 | ⬜ placeholder |

(If you'd rather host a PDF yourself instead of linking out, you can still drop a
file here and point the href at e.g. `textbooks/precalc12.pdf`.)

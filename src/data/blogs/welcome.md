# Welcome to this blog

You are reading a **Markdown** file. The site turns it into HTML automatically (headings, lists, emphasis, code, links) using the same stack as your home `about.md`.

## How to write a new article

1. Add a `.md` file under `src/data/blogs/` (this folder).
2. Open `src/data/blogs/posts.js` and:
   - add a `case 'your-url-slug': return import('./your-file.md');` inside `importBlogMarkdown`;
   - add `{ slug, title, date, description }` to the `blogPosts` array.

Use a `YYYY-MM-DD` date string so the list sorts correctly.

## Markdown basics

- `#` / `##` for headings  
- `-` or `1.` for lists  
- `` `inline code` `` and fenced blocks with three backticks  
- `[label](https://example.com)` for links  

No raw HTML is required. When you run `npm run build`, the new file is bundled like any other source module.

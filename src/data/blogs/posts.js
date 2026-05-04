/**
 * Blog registry (similar idea to a Jekyll /posts folder, adapted for Create React App).
 *
 * To add a post:
 * 1. Create a new Markdown file next to this one, e.g. `my-topic.md` (write normal Markdown: # headings, lists, **bold**, links — no HTML needed).
 * 2. Add a matching `case 'your-slug':` in `importBlogMarkdown` below that returns `import('./your-file.md')`.
 * 3. Append an object to `blogPosts` with the same `slug`, plus `title`, `date` (YYYY-MM-DD), and `description` (shown on the list page).
 *
 * Posts are sorted newest-first on the Blogs page by `date`.
 */

/** @typedef {{ slug: string, title: string, date: string, description: string }} BlogPostMeta */

/** @type {BlogPostMeta[]} */
export const blogPosts = [
  {
    slug: 'welcome',
    title: 'Welcome to this blog',
    date: '2026-05-03',
    description: 'How posts are authored in Markdown and how this section is wired up.',
  },
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);

export const getSortedBlogPosts = () => [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

/**
 * @param {string} slug
 * @returns {Promise<{ default: string }>}
 */
export function importBlogMarkdown(slug) {
  switch (slug) {
    case 'welcome':
      return import('./welcome.md');
    default:
      return Promise.reject(new Error(`Unknown blog slug: ${slug}`));
  }
}

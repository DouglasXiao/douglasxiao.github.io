import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';
import { getPostBySlug, importBlogMarkdown } from '../data/blogs/posts';

function formatDate(isoDate) {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

const BlogPost = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState(null);

  const meta = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    const post = slug ? getPostBySlug(slug) : undefined;
    if (!post) {
      setMarkdown('');
      setError(null);
      return undefined;
    }
    let cancelled = false;
    setError(null);
    setMarkdown('');
    importBlogMarkdown(post.slug)
      .then((res) => fetch(res.default))
      .then((r) => r.text())
      .then((text) => {
        if (!cancelled) setMarkdown(text);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!meta) {
    return (
      <Main title="Not found" description="Blog post not found.">
        <article className="post" id="blog-missing">
          <header>
            <div className="title">
              <h2>Post not found</h2>
            </div>
          </header>
          <p>No article matches this URL. <Link to="/blogs">Back to Blogs</Link>.</p>
        </article>
      </Main>
    );
  }

  if (error) {
    return (
      <Main title={meta.title} description={meta.description}>
        <article className="post" id="blog-error">
          <header>
            <div className="title">
              <h2>{meta.title}</h2>
            </div>
          </header>
          <p>Could not load this post. <Link to="/blogs">Back to Blogs</Link>.</p>
        </article>
      </Main>
    );
  }

  return (
    <Main
      title={meta.title}
      description={meta.description}
    >
      <article className="post markdown" id="blog-post">
        <header>
          <div className="title">
            <h2><Link to={`/blogs/${meta.slug}`}>{meta.title}</Link></h2>
            <p className="published">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              {' · '}
              <Link to="/blogs">All posts</Link>
            </p>
          </div>
        </header>
        <Markdown>
          {markdown}
        </Markdown>
      </article>
    </Main>
  );
};

export default BlogPost;

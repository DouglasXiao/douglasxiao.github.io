import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { getSortedBlogPosts } from '../data/blogs/posts';

function formatDate(isoDate) {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

const Blogs = () => {
  const posts = getSortedBlogPosts();

  return (
    <Main
      title="Blogs"
      description="Articles and notes by Ke Xiao."
    >
      <article className="post" id="blogs">
        <header>
          <div className="title">
            <h2><Link to="/blogs">Blogs</Link></h2>
            <p>Longer-form writing. Each entry is a Markdown file in the repo.</p>
          </div>
        </header>
        {posts.length === 0 ? (
          <p>No posts yet. Add entries in <code>src/data/blogs/posts.js</code> and matching <code>.md</code> files.</p>
        ) : (
          <ul className="posts">
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <header>
                    <h3><Link to={`/blogs/${post.slug}`}>{post.title}</Link></h3>
                    <time className="published" dateTime={post.date}>{formatDate(post.date)}</time>
                  </header>
                  <p>{post.description}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </article>
    </Main>
  );
};

export default Blogs;

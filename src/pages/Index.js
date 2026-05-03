import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const Index = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/about.md')
      .then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdown);
      });
  }, []);

  const count = markdown.split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main
      description="Learn about Ke Xiao — AI Engineer at ByteDance Data AI Foundation, multimodal agentic AI, and production ML systems."
    >
      <article className="post markdown" id="index">
        <header>
          <div className="title">
            <h2><Link to="/">Brief Me</Link></h2>
            <p>(in about {count} words)</p>
          </div>
        </header>
        <Markdown>
          {markdown}
        </Markdown>
      </article>
    </Main>
  );
};

export default Index;

import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.png`} alt="" />
      </Link>
      <header>
        <h2>Ke Xiao</h2>
        <p><a href="mailto:luckyxiaoke@gmail.com">luckyxiaoke@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Douglas, a Senior AI Engineer at ByteDance’s Data AI Foundation and a former Tech Lead at
        TikTok Global E-Commerce. I have 11+ years of experience across AI and software engineering, with previous roles at
        Azure AI and Master's research focus in Neural Network and backpropagation algorithm. 
        My work focuses on building multimodal agentic AI systems, prompt engineering, reinforcement learning, post-training, 
        and scalable AI platform architecture.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Ke Xiao <Link to="/">https://douglasxiao.github.io/</Link>.</p>
    </section>
  </section>
);

export default SideBar;

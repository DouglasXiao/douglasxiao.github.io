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
      <p>Hi, I&apos;m Douglas, a Senior Frontend Engineer and Tech Lead at
        Microsoft AI Studio. With 9 years&apos; experience, including roles at Amazon and
        VMware, I specialize in Azure Machine Learning, AI studio UI, and OpenAI
        collaborations, expertly blending web design with large-scale systems and
        machine learning.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
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

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
      <p>Hi, I&apos;m Douglas, a Senior AI Engineer at Data AI Foundation and a former Tech Lead at
        TikTok Global E-Commerce. With 11 years of experience in AI and Software Engineering, including roles at Bytedance Data AI Foundation, Tiktok Shop seller center fulfillment, Microsoft AI Studio, Amazon payment and
        VMware End User Computing, I specialized in Agents, Prompt Engineering, RL and Frontend architecture, expertly blending web design with large-scale systems, parallel promises,
        state management system like Remesh, also mobile applications and frameworks like React Native, Lynx.
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

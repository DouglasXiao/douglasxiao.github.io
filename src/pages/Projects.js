import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const Projects = () => (
  <Main
    title="Projects"
    description="Learn about Ke Xiao's projects."
  >
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2><Link to="/projects">Projects</Link></h2>
          <p>Outside of work, I am also deeply passionate about Tech, here is a selection of side projects that I&apos;m not too ashamed of</p>
        </div>
      </header>
      {data.map((project) => (
        <Cell
          data={project}
          key={project.title}
        />
      ))}
    </article>
  </Main>
);

export default Projects;

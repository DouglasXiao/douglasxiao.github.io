/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('renders the app', () => {
  // mocks the fetch API used on the stats page and the index page (about.md).
  const jsonMock = jest.fn(() => Promise.resolve({}));
  const textMock = jest.fn(() => Promise.resolve(''));
  global.fetch = jest.fn(() => Promise.resolve({
    json: jsonMock,
    text: textMock,
  }));
  // mocks the scrollTo API used when navigating to a new page.
  window.scrollTo = jest.fn();

  let container;

  beforeEach(async () => {
    // BrowserRouter reads window.location; reset so each test starts at /
    // after prior tests navigate (e.g. /projects).
    window.history.pushState({}, '', '/');
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      await ReactDOM.createRoot(container).render(<App />);
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    jest.clearAllMocks();
  });

  it('should render the app', async () => {
    expect(document.body).toBeInTheDocument();
  });

  it('should render the title', async () => {
    expect(document.title).toBe('Ke Xiao');
  });

  it('redirects /about to /', async () => {
    document.body.removeChild(container);
    window.history.pushState({}, '', '/about');
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      await ReactDOM.createRoot(container).render(<App />);
    });
    expect(window.location.pathname).toBe('/');
  });

  it('can navigate to /resume', async () => {
    expect.assertions(3);
    const contactLink = document.querySelector('#header > nav > ul > li:nth-child(1) > a');
    expect(contactLink).toBeInTheDocument();
    await act(async () => {
      await contactLink.click();
    });
    expect(document.title).toContain('Resume |');
    expect(window.location.pathname).toBe('/resume');
  });

  it('can navigate to /projects', async () => {
    expect.assertions(3);
    const contactLink = document.querySelector('#header > nav > ul > li:nth-child(2) > a');
    expect(contactLink).toBeInTheDocument();
    await act(async () => {
      await contactLink.click();
    });
    expect(document.title).toContain('Projects |');
    expect(window.location.pathname).toBe('/projects');
  });

  it('can navigate to /stats', async () => {
    const contactLink = document.querySelector('#header > nav > ul > li:nth-child(3) > a');
    expect(contactLink).toBeInTheDocument();
    await act(async () => {
      await contactLink.click();
    });
    expect(document.title).toContain('Stats |');
    expect(window.location.pathname).toBe('/stats');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(textMock).toHaveBeenCalledTimes(1);
  });

  it('can navigate to /contact', async () => {
    expect.assertions(3);
    const contactLink = document.querySelector('#header > nav > ul > li:nth-child(4) > a');
    expect(contactLink).toBeInTheDocument();
    await act(async () => {
      await contactLink.click();
    });
    expect(document.title).toContain('Contact |');
    expect(window.location.pathname).toBe('/contact');
  });
});

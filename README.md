# Personal Website

Welcome to my [personal website](https://douglasxiao.github.io/)! This is an MIT licensed React-based Jamstack application. It offers a simple interface, easy modifications, static export capabilities, and free automatic deployments via [GitHub Pages](https://pages.github.com/).

## 🚀 Features

- Built with modern JavaScript, using tools and frameworks like [create-react-app](https://github.com/facebook/create-react-app), [React-Router](https://reactrouter.com/), and SCSS.
- Automated deployment workflows via [GitHub Actions](https://github.com/features/actions).
- And more!

## 🔧 Dependencies

Ensure you have [node](https://nodejs.org/) >= v16. Optionally, use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage node versions.

## 🚀 Setup and Running

1. Clone the repository:

    ```bash
    git clone https://github.com/DouglasXiao/douglasxiao.github.io.git
    cd douglasxiao.github.io/
    ```

2. (Optional) Ensure you're on Node v16 or higher, or you can use NVM to manage the node versions:

    ```bash
    nvm install
    node --version
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the application locally:

    ```bash
    npm start
    ```

By default, the application should be available at [http://localhost:3000/](http://localhost:3000/).

## 🚢 Deploy to github io page

### Deploying to GitHub Pages

1. Build project locally: `npm run predeploy`
2. Execute the command `npm run deploy`. It will leverage the gh-pages tool to publish the page, recommend watching [this video](https://youtu.be/7wzuievFjrk?si=yft_PbfnUZWrFSKU) for detailed steps.
3. Now view site douglasxiao.github.io, it should be available with all your changes! 
3. Git add all local changes and commit/push.


### Static Export (can be used to deploy to CDN)

For a static export without deploying to GitHub Pages:

- Remove or disable `.github/workflows/github-pages.yml`.
- Execute:

    ```bash
    npm run predeploy
    ```

This will generate a static version in `personal-site/build/` which you can host or deploy to a CDN.

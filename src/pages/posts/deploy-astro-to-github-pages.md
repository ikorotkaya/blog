---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Deploying Astro to GitHub Pages'
pubDate: '2024 05 01'
tags: ['astro', 'blog', 'github-pages', 'deployment', 'static-site']
---

## Step 1: Configure Your Astro Project

The first thing you need to do is adapt your project configuration to GitHub Pages:

1. **Disable Jekyll Processing**:
  Create a `.nojekyll` file in the root of your project and any relevant subdirectories such as `/public/` and `/public/astro/`. This tells GitHub Pages to ignore Jekyll, preventing conflicts with your static files.
2. **Adjust Astro Configuration**:
  When preparing your Astro project for deployment on GitHub Pages, it's important to configure the `astro.config.mjs` file.This configuration prepares your project for static site generation and ensures proper deployment on GitHub Pages, especially regarding how URLs and links are handled:

```javascript
// Example configuration for Astro
export default defineConfig({
  integrations: [tailwind({})], // Include any integrations specific to your needs
  output: 'static',
  outDir: './docs', // GitHub uses this directory to serve your site
  base: '/project-name/' // Replace 'project-name' with your actual project name
});
```

Key Configuration: The Base URL

- **Why Set a Base URL**:
GitHub Pages by default serves your project from a URL structured as `<username>.github.io`. If your repository name is not simply `<username>.github.io` but includes additional paths (like `<username>.github.io/project-name/`), you need to specify this in the base URL setting in your Astro configuration. This base URL helps Astro understand the root directory of your site relative to the custom URL path.
- **Impact on Links**: 
By setting the `base` property to `/project-name/`, you ensure that all internal links are prefixed with this base. This is essential because, without the correct base setting, your site's navigation and resource links will not point to the correct paths, leading to broken pages and missing assets when viewed on GitHub Pages.

```javascript
// Example of how to set up internal links with a base URL
<a href="/project-name/about">About</a> // "Project-name" should be equal to base url in `astro.config.mjs`.
```

## Step 2: Build Your Astro Project

Once your project is configured, build the static files:

3. **Build the project:** Run `npm run build` in your terminal to compile the project into the `/docs` folder. Verify that all files are correctly placed and structured within the `/docs` directory, ensuring they're ready for deployment.

## Step 3: Deploy Your Astro Project to GitHub Pages

The last steps are: to push your project to GitHub and set up GitHub Pages:

4. **Push project to GitHub**: Commit all changes, especially the new `/docs` directory. Push these changes to your GitHub main branch.
5. **Set up GitHub Pages**: In your GitHub repository settings, find the "Pages" section. Under "Build and deployment", choose "Deploy from a branch" and set it to deploy from the `main` branch, specifically from the `/docs` folder. Save your changes and wait a few minutes for GitHub to publish your site.

These steps help you easily set up your project on <a href="https://pages.github.com/" >Github Pages</a>. Share your site with everyone!
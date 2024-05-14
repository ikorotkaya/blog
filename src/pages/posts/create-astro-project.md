---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Create astro project'
pubDate: '2024 03 25'
tags: ['astro', 'blog']
---

This guide will walk you through creating a simple Astro project with a home page and a navigation bar.

## Step 1: Create Astro Project

First, you need to create a new Astro project and run it. Open your terminal and run the following commands:

```bash
npm create astro@latest
cd your-project-name # Replace 'your-project-name' with the name of your Astro project folder
npm run dev
```

## Step 2: Access Your Project

After running your project, go to `localhost:3000` in your web browser. You should see the default Astro project page.

## Step 3: Create Index Page

Create an `index.astro` file in the `/src/pages/` directory for your homepage. This directory holds all your pages that follow the `http://hostname/path/` pattern once deployed. Run the following commands in your terminal:

```bash
cd src/pages/
touch index.astro
```

Add basic HTML structure to your `index.astro` file:

```html
--- 
// This is the frontmatter section where you can import components and define metadata. See Step 8 for an example of importing a NavBar component.
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Home</title>
  </head>
  <body>
    <h1>Your first Blog!</h1>
  </body>
</html>
```

## Step 4: Configure Astro Project

At the root of your project, create an `astro.config.mjs` file to configure your Astro application.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Configuration for your app, you can add plugins, optimize, and more
});
```

## Step 5: Add Favicon

Create a `/public` folder at the root of your project and add a `favicon.ico` file to this folder. This favicon will be displayed in the browser tab. You can create it using a favicon generator like [favicon.io](https://favicon.io/).

## Step 6: Integrate Tailwind CSS

Astro supports Tailwind CSS out of the box. To add Tailwind to your project, run:

```bash
npx astro add tailwind
```

## Step 7: Create Tailwind Navbar Component

Create a `Navbar.astro` component inside `/src/components/`. If the `/src/components/` directory doesn't exist, create it. Use the following code for your navbar component:

```html
{/* src/components/Navbar.astro */}

<div class="flex flex-row gap-4">
  <a href="/blog/posts/" class="hover:text-smalt no-underline">
    Posts
  </a>
  <a href="/blog/topics/" class="hover:text-smalt no-underline">
    Topics
  </a>
  <a href="/blog/about/" class="hover:text-smalt no-underline">
    About
  </a>
</div>
```

## Step 8: Use Navbar in Index Page

Import and use the `Navbar` component in your `index.astro` page by modifying the file as follows:

```html
---
import Navbar from '../components/Navbar.astro';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Home</title>
  </head>
  <body>
    <Navbar />
  </body>
</html>
```

Now, when you run `npm run dev` and go to `localhost:3000`, you should see your index page with the Navbar at the top.
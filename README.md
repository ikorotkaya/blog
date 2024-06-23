# Personal Blog - Astro Project

Welcome to my personal blog repository. This project is part of my learning journey as a software engineer and serves as a platform to share my thoughts and learnings related to software development.

## Adding a New Post

To add a new post to your blog, follow these simple steps:

1. **Create a Post File:** Navigate to `src/pages/posts`. Here, create a new Markdown file.
2. **Insert Frontmatter:** At the beginning of your file, include the following metadata (frontmatter), which helps define the properties of your post:

```js
---
layout: ../../layouts/MarkdownPostLayout.astro // Specifies the layout used, incorporating necessary styles and data
title: 'Your Post Title' // The title of your post
pubDate: 'YYYY-MM-DD' // The publication date of your post
tags: ['tag1', 'tag2'] // Appropriate tags that relate to the content of your post
---
```

3. **Write Your Post:** After the closing `---` of the frontmatter, begin writing the content of your post and style it as necessary.

## Why Astro?

Astro is chosen as the platform for this blog because it offers a new and smart way to build websites. It combines creating static pages with dynamic parts, which means the site loads quickly and performs better. Astro also works well with many front-end technologies, making it very flexible and easy for developers to use.

## Technologies used

* Astro
* Typescript 
* Tailwind CSS
* Tailwind Typography
* Vercel for hosting

## Development

### Installation

1. Clone the repo
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## License

This project is released under the MIT Licence. Feel free to use, modify, and redistribute the code under the terms of the licence.
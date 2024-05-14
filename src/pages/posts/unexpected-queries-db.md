---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Handling unexpected queries in database migrations'
pubDate: '2024 05 13'
tags: ['backend', 'database', 'migration', 'typeorm']
---

When generating migrations with new changes, you may find that the new migration file contains additional queries that you didn't write. This can be confusing and might initially seem like an error.

This scenario typically occurs due to a mismatch between the state of your backend (BE) and your database (DB). Here are two common situations:

1. **Current BE, outdated DB**: you've updated your backend code but your local database isn't synchronised with these changes.
2. **Current DB, outdated BE**: your database is up to date, but your backend code is several commits behind.

These mean that your local environment isn’t aligned with the latest state of the app, leading TypeORM (or any ORM you might be using) to auto-generate queries to bridge the gap to the last known state.

In my experience, this usually happened to me because I had fetched the latest database state but hadn't updated my backend code accordingly. I was trying to add a new migration without the latest backend updates, prompting TypeORM to insert additional queries to reach the latest state of the app.

**Here’s what to do if this happens to you:**

- **Check the migration file**: always review the contents of a new migration file to be sure it only includes your changes.
- **Identify outdated components**: if you notice unexpected queries, verify whether your backend or database is outdated and update it.
- **Regenerate the migration**: once everything is updated, try generating the migration again. If no unexpected changes appear and no new migrations are created when everything is up-to-date, then you're set to go.

Remember the importance of keeping both your database and backend in sync with the latest changes, especially before attempting to introduce new migrations.
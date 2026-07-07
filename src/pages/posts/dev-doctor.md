---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'pnpm dev:doctor — a healthcheck for your local dev stack'
pubDate: '2026-07-06'
tags: ['tooling', 'developer-experience', 'monorepo', 'typescript']
---

There's a specific kind of pain that hits right after a `git pull`: you run the dev server, get a cryptic `ZodError` in `environment.ts`, and spend 20 minutes figuring out that someone added a new required env var to main two days ago. Or Docker quietly crashed overnight and your API won't start. Or Prisma is out of sync after a migration landed.

None of these problems are hard to fix. They're just annoying to diagnose — especially if you're new to the codebase.

I built `pnpm dev:doctor` to make the full expected state of the local stack explicit and checkable in one command.

### What it does

```bash
pnpm dev:doctor
```

Runs ~25 checks across 9 categories and prints a colored summary. If anything is wrong, it prints the fix command directly below the failure — no guessing, no Slack pinging.

| Category     | What it checks                                                                |
| ------------ | ----------------------------------------------------------------------------- |
| Runtime      | Node and pnpm versions match `engines`/`packageManager` in root package.json  |
| Docker       | Each compose service (database, redis, redpanda, redpanda-console) is healthy |
| Env files    | `.env` and `.env.keys` present for api, web-app, admin, polarix, cms          |
| Secrets      | 1Password CLI installed, session active, `DOTENV_PRIVATE_KEY` resolvable      |
| API env      | Critical keys exist; env template freshness — catches stale `.env` after pull |
| Database     | Prisma client generated, databases exist, migrations up to date               |
| Ports        | Dev server ports (8080, 5173, 8083) are free                                  |
| Dev tools    | Lefthook hooks installed, optional Grafana stack status                       |
| Dependencies | `node_modules` present; lockfile newer than installed modules                 |

The stale env check is the one I use the most. It compares the mtime of the local `.env` against the team template — if the template is newer, the env is out of sync. This is exactly the scenario that produces `ZodError` after pulling main.

### How it's structured

Each category is a _prescription_ — a small module that receives a shared context and a set of helper functions (`ok`, `warn`, `fail`, `info`), runs its checks, and writes to a buffer that gets printed under a section header.

```typescript
export type Prescription = {
  title: string;
  run: (
    ctx: PrescriptionContext,
    helpers: PrescriptionHelpers
  ) => Promise<void> | void;
};
```

The main runner loops over all prescriptions in order, collects errors and fixes, then prints a summary at the end:

```typescript
for (const prescription of prescriptions) {
  const buf: string[] = [];
  const helpers: PrescriptionHelpers = {
    ok: (msg) => buf.push(`${G('✔')} ${msg}`),
    info: (msg) => buf.push(`${D('ℹ')} ${D(msg)}`),
    warn: (msg, fix?) => {
      buf.push(`${Y('⚠')} ${msg}`);
      if (fix) buf.push(`  ${D(`→ ${fix}`)}`);
    },
    fail: (msg, fix) => {
      buf.push(`${R('✘')} ${msg}`);
      ctx.errors.push(msg);
      ctx.fixes.push(fix);
    }
  };
  p.log.step(prescription.title);
  await prescription.run(ctx, helpers);
  if (buf.length) p.log.message(buf.join('\n'));
}
```

`@clack/prompts` handles the terminal UI — section headers, the intro/outro, and interactive prompts. On the first run, when `.env` doesn't exist yet, the script asks which team you're on so fix commands are pre-filled with the right team name.

The script lives in `internal/scripts/doctor/` inside a proper workspace package (`@liqid/scripts`) with its own `tsconfig.json` and `eslint.config.js`. This matters — scripts dropped in a root `scripts/` folder typically don't get type-checked or linted. Making it a real package means Turbo covers it.

### Adding a new check

Each prescription is self-contained. Adding a new check means adding a file to `prescriptions/`, exporting it from `prescriptions/index.ts`, and registering it in the array. The context object carries shared state across prescriptions — for example, the docker prescription sets `ctx.postgresHealthy`, and the database prescription reads it to skip the checks that need a live database.

```typescript
export const database: Prescription = {
  title: 'Database',
  run: (ctx, { ok, warn, fail }) => {
    // Prisma client is checked regardless — it doesn't need a running DB
    // ...

    if (ctx.postgresHealthy) {
      // database existence + migration status checks
    } else {
      warn('Skipping migration check (PostgreSQL not running)');
    }
  }
};
```

### How I use it

Whenever something locally isn't working, this is the first thing I run. It takes a couple of seconds and solves roughly 95% of the issues right away — usually a stale env, a missing migration, or Docker being down. It's also useful for onboarding: new people on the team run it to confirm their local setup is complete and stable instead of debugging each piece separately.

The useful thing isn't the checks themselves — it's that the output tells you exactly what to run next. No detective work required.

Here's what a run with a few failures looks like:

![dev:doctor CLI output showing checks across categories like Secrets, API environment, Database, Ports, and Dependencies — with green checkmarks for passing checks, yellow warnings, and red failures with fix commands listed at the bottom](/blog/images/dev-doctor-output.png)

---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Object.values<string>() vs Object.values() as string[]'
pubDate: '2026-06-22'
tags: ['typescript', 'refactoring']
---

When you call `Object.values()` on a TypeScript enum, TypeScript can be picky about the return type. A common fix looks like this:

```ts
(Object.values(SmartMoneyStrategy) as string[]).includes(s);
```

It compiles, but `as string[]` is a blunt instrument — it's an assertion that overrides whatever TypeScript inferred, even if that inference was wrong. You're not adding type information, you're silencing the type checker.

### The better way

```ts
Object.values<string>(SmartMoneyStrategy).includes(strategy);
```

`Object.values` accepts a generic parameter. Passing `<string>` guides TypeScript from the start of the call rather than overriding it at the end. You're working with the type system, not around it.

The difference is subtle but meaningful:

- `as string[]` — asserts. Overrides the inferred type after the fact.
- `Object.values<string>(...)` — guides. Tells TypeScript what to expect upfront.

Both compile to the same JavaScript. But the generic form is more precise and won't mask a type error if something changes later.

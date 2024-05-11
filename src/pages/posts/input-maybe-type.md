---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'InputMaybe<T>'
pubDate: '2024-05-04'
tags: ['frontend', 'typescript', 'types']
---

When working with TypeScript, specifically in a project that involve GraphQL, I encountered the type `InputMaybe<T>`. Here’s a explanation of how it works and why it’s useful.

**What is `InputMaybe<T>`?**

`InputMaybe<T>` defines how nullable and optional fields are managed. It’s defined as follows:

```typescript
export type InputMaybe<T> = Maybe<T>;
```

And `Maybe<T>` is:

```typescript
type Maybe<T> = T | null | undefined;
```

This setup allows a variable of type `InputMaybe<T>` to accept three kinds of values:
1. A value of type `T` (the specific expected type, like `SortNulls`).
2. `null` (allows explicitly setting the value to null).
3. `undefined` (the value can be omitted).

**Why use `InputMaybe<SortNulls>` instead of `SortNulls`?**

In TypeScript, marking a property as optional with `?` means the property can be either its specific type or `undefined`. It does not include `null` by default. Here's what that looks like:

- `nulls?: SortNulls` — Here, `nulls` can be either a `SortNulls` value or `undefined`. It cannot be `null`.
- `nulls?: InputMaybe<SortNulls>` — In this case, `nulls` can be a `SortNulls` value, `null`, or `undefined`.

**Practical Implication in Usage**

In settings like GraphQL APIs, distinguishing between `null` and `undefined` is crucial:

- **`undefined` might signal "do not alter this field",**
- **`null` could indicate "clear any value this field might have".**

This distinction matters because it affects how mutations or queries behave—whether to update a field, clear it, or leave it unchanged. Using `InputMaybe` ensures that the API’s TypeScript types are aligned with its operational logic.
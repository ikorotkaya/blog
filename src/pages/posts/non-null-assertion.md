---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Handling non-null assertions in TypeScript'
pubDate: '2024-04-14'
tags: ['frontend', 'typescript', 'types']
---

When coding in TypeScript, you might come across an exclamation mark (`!`) following a variable name. This is known as the "non-null assertion operator". It's used to tell TypeScript that even though a variable could be `null` or `undefined` according to its type, you are certain it is neither.

**Context and How It's Used**

Here’s an example to explain how this works:

```typescript
sorting!.nulls = initialSorting.nulls;
```

In this line, `sorting` might be `null` or `undefined` as per its defined type, but you as the developer know that it has already been assigned a value elsewhere in your code. By using `!`, you're effectively telling TypeScript:

- "I've checked this already. `sorting` is definitely not `null` or `undefined`."

**Caution in Using the Non-Null Assertion Operator**

Although the non-null assertion operator can be very useful, it should be used carefully:

- it overrides TypeScript’s strict null checks. If your assumption is incorrect, it could cause errors at runtime.
- relying heavily on `!` might suggest that your types or your approach to managing nullability could be improved. Think of it as a quick fix that could potentially mask deeper design issues in your code.

**Best Practices**

- ensure there’s a logical reason supported by your code’s flow that guarantees the variable is not null or undefined before using `!`.
- always document why it’s safe to use the non-null assertion in that instance, either through inline comments or in your project documentation.

Using `!` places the burden on you to uphold the safety guarantees usually provided by TypeScript's type system. While it's a potent tool, it should be used judiciously and backed by solid reasoning.

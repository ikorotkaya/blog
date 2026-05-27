---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'When to use the factory pattern in TypeScript'
pubDate: '2026-05-27'
tags: ['typescript', 'patterns', 'coding']
---

### What is the factory pattern?

The factory pattern is a way to create objects through a function instead of directly. Instead of constructing something with `new` or writing it inline, you call a function that builds and returns it for you. The idea is to separate _how something is created_ from _how it is used_.

In classic OOP, this often means a function that decides which class to instantiate. In TypeScript (especially in functional-style codebases), it usually looks simpler — a function that returns an object with methods:

```typescript
const createLogger = (prefix: string) => ({
  log: (message: string) => console.log(`[${prefix}] ${message}`),
  error: (message: string) => console.error(`[${prefix}] ${message}`)
});

const logger = createLogger('app');
logger.log('started'); // [app] started
```

The factory here does useful work — it captures `prefix` and bakes it into the returned methods. That's the pattern earning its place.

### When it doesn't earn its place

I saw this pattern in a codebase where every use case was wrapped in a factory:

```typescript
export const generateAuditDocumentUseCase = () => ({
  execute: async (input: AuditInput): Promise<AuditResult> => {
    // ...business logic
  }
});

// Called as:
const result = await generateAuditDocumentUseCase().execute(input);
```

The factory takes no arguments, holds no state, and returns a single method. It's the same as:

```typescript
export const generateAuditDocument = async (
  input: AuditInput
): Promise<AuditResult> => {
  // ...business logic
};

// Called as:
const result = await generateAuditDocument(input);
```

So when does the factory actually earn its place?

### 1. Dependency injection

The factory accepts collaborators, so you can swap them in tests:

```typescript
export const createOrderUseCase = (payment: PaymentGateway) => ({
  execute: async (order: Order) => {
    await payment.charge(order.total);
  }
});

// Production
createOrderUseCase(stripeGateway).execute(order);

// Test
createOrderUseCase(mockGateway).execute(order);
```

### 2. Expensive setup done once

The factory initializes something heavy, and `execute` reuses it:

```typescript
export const processReportsUseCase = () => {
  const parser = initializeHeavyParser(); // runs once
  return {
    execute: async (report: Report) => parser.parse(report)
  };
};

const useCase = processReportsUseCase();
await useCase.execute(report1);
await useCase.execute(report2); // reuses the same parser
```

### 3. Multiple related operations

The factory groups methods that belong together:

```typescript
export const portfolioUseCase = () => ({
  create: async (data: CreateInput) => {
    /* ... */
  },
  validate: async (id: string) => {
    /* ... */
  },
  submit: async (id: string) => {
    /* ... */
  }
});
```

### Tradeoffs

The performance cost is zero in practice — creating one small `{ execute: fn }` object is negligible. The real tradeoffs are about clarity:

- **More noise** — `fooUseCase().execute(input)` instead of `foo(input)` at every call site.
- **False signal** — a factory implies "construction matters here." When it doesn't, readers waste time wondering what the factory does, whether they should cache the instance, what state it might hold.
- **Harder to pass around** — you can't just pass `foo` as a callback. You'd need `(...args) => fooUseCase().execute(...args)`.
- **Heavier types** — you end up defining a `FooUseCase` type for the `{ execute: ... }` shape when a plain function signature would do.

When the factory _does_ take arguments or hold state, these costs are worth it — you get testability, encapsulation, and clear separation between dependencies and inputs.

### Rule of thumb

If your factory takes no arguments, creates no state, and returns a single method — it's just a function in disguise. Keep it simple.

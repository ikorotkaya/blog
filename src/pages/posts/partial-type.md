---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Partial<T>'
pubDate: '2024-05-03'
tags: ['frontend', 'typescript', 'types']
---

Sometimes we need flexibility in our data structures, like deciding which fields are required and which aren't.

Typescript has a utility called `Partial<T>` that can make all properties of a type `<T>` optional.

Here's a practical example related to sorting configurations in a project. Suppose we have a `sortNullsConfig` object that shouldn't need values for all sortable fields. To implement this, we adjust the type definition like this:

```typescript
sortNullsConfig?: Partial<Record<TSortableField, SortNulls>>;
```

In this updated type definition:

- `Record<TSortableField, SortNulls>`: This means we’re creating a type where each sortable field should have a corresponding `SortNulls` value.
- `Partial<...>`: By wrapping the record with `Partial`, we make it so you can include any or none of the fields. Each property becomes optional.

This tweak makes you code adaptable to different scenarios without errors.

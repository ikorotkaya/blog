---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Implementing infinite scroll using Intersection Observer API'
pubDate: '2024-07-10'
tags: ['frontend', 'react', 'javascript', 'performance', 'api']
---

We had an issue with our transactions table where users had to click a `Load More` button to fetch additional transactions. This wasn't smooth and took up users' time. So, we decided to implement infinite scrolling to load more data automatically as users scroll down.

### Initial Approach with Scroll Event Listener

The first thing I tried to do was to use the `useEffect` hook with a traditional scroll event listener, which can lead to frequent re-calculations and renderings:

```typescript
useEffect(() => {
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement;
    if (
      scrollTop + clientHeight > scrollHeight - 100 &&
      !loading &&
      pageInfo.hasNextPage
    ) {
      onFetchMore();
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [loading, pageInfo, onFetchMore]);
```

The `handleScroll` function checks if the user is close to the bottom of the page (`scrollTop + clientHeight > scrollHeight - 100`). You can adjust the `100` pixel threshold as needed.

**Advantages:**

1. **Simple**: Easy to implement and understand.
2. **Control**: Direct access to the scroll event.

**Disadvantages:**

1. **Performance**: Scroll events fire frequently, which can lead to performance issues.
2. **Precision**: It's harder to precisely determine when the last item is in view.

### Improved Approach with Intersection Observer API

We switched to using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), which is more efficient and accurate. This API allows us to observe changes in the intersection of a target element with a parent element or the viewport.

**Advantages:**

1. **Performance**: More efficient as it doesn't require continuous event handling.
2. **Accuracy**: Precisely detects when an element is in view.
3. **Less Code**: No need to manually calculate positions.

**Disadvantages:**

1. **Complexity**: Slightly more complex to set up.
2. **Browser Support**: May need [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) for older browsers.

### Implementing Infinite Scroll with Intersection Observer API

#### 1. Set Up the Hook and State

The hook defines an interface `UseInfiniteScrollProps` to specify the expected properties. First, I defined the properties we get from our data fetching hook:

```typescript
const { resources, pageInfo, loading, fetchMore } = useResourcesQuery<
  RentalContractsQuery,
  RentalContractsQueryVariables
>({
  query: RENTAL_CONTRACTS_QUERY,
  variables
});
```

- `onFetchMore`: A function that triggers the loading of additional data.
- `hasMore`: A boolean indicating whether there is more data to load.
- `loading`: A boolean to track if a data fetch is currently in progress, preventing multiple concurrent fetches.

#### 2. Use `useRef` for Intersection Observer

The [`useRef`](https://react.dev/reference/react-dom/components/common#ref-callback) hook is used to maintain a mutable reference to the `IntersectionObserver` instance. This reference does not trigger re-renders when it changes.

```typescript
const observerRef = useRef<IntersectionObserver | null>(null);
```

This line initializes the observer reference but does not yet create the `IntersectionObserver`.

#### 3. Callback Ref for Observing Elements

The `useCallback` hook creates a memoized callback function that assigns the Intersection Observer to the `lastElementRefCallback`, the element at the bottom of the list:

```typescript
const lastElementRefCallback = useCallback(
  (node) => {
    // Do not re-attach the observer if data is being loaded
    if (loading) return;

    // Disconnect any existing observer to reset or prevent multiple instances observing different elements.
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        // Trigger data loading if the observed element is intersecting and there is more data
        onFetchMore();
      }
    });

    // Attach the observer to the new node
    if (node) observerRef.current.observe(node);
  },
  [loading, hasMore, onFetchMore]
);
```

This callback function is called every time the component that it is attached to (usually the last item in the list) mounts or unmounts.

- If `loading` is true, the callback exits early to prevent unnecessary operations.
- It [disconnects](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect) any previous observers to avoid duplicates.
- A new `IntersectionObserver` is created and given a callback function that checks if the element is intersecting and if more data can be loaded.
- The observer is then attached to the passed `node`.

#### 4. Cleanup on Unmount

The `useEffect` hook ensures that the Intersection Observer is cleaned up when the component unmounts:

```typescript
useEffect(
  () => () => {
    if (observerRef.current) observerRef.current.disconnect();
  },
  []
);
```

This cleanup function runs when the component unmounts, disconnecting the Intersection Observer to prevent memory leaks and removing it from the element it was observing.

#### 5. Returning the Ref

Finally, the hook returns a functional component that renders the element to be observed:

```typescript
const InfiniteScrollLastObservedElement: FC = () => (
  <>
    {loading ? (
      <Icon
        name={'loading'}
        className="animate-spin fill-stone-400 dark:fill-neutral-400 mt-8"
      />
    ) : null}
    <div ref={lastElementRefCallback} style={{ height: 1 }}></div>
  </>
);

return { InfiniteScrollLastObservedElement };
};
```

### Usage in a Component

This setup automatically loads more content as the user scrolls down, improving the user experience significantly.

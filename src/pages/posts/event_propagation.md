---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Event Propagation in JavaScript'
pubDate: 2024-04-14
tags: ['frontend', 'HTML', 'DOM', 'event']
---

## Event Propagation is the blanket term for both _event bubbling_ and _event capturing_.

- event bubbling triggers on the deepest target element, and then bubbles up to its parents.
- event capturing involves the event going down to the target element, starting from its parents

The propagation is **bidirectional**, from the window to the event target and back.

## Phases of Event Propagation:

1. **Capture phase** (from window to event target parent):

   - During this phase, only listeners designated as capturers are triggered. These are registered with `true` as the third parameter in [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Without specifying this parameter, it defaults to `false`, meaning the listener will not capture:
     ```javascript
     el.addEventListener('click', listener, true);
     ```

2. **Target phase** (at the event target):
   - Here, all listeners on the event target are activated, irrespective of their capture flag setting.
3. **Bubble phase** (from the event target parent to the window)

## Adding an Event Handler

Utilize `EventTarget.addEventListener` to attach an event handler.

## Default behaviour of Event Propagation

By default, JavaScript utilizes _event bubbling_. Events initiate at the target element and and bubble up to the root of the document. To modify this:

```javascript
// Activate event capturing:
yourElement.addEventListener(type, listener, { capture: true });

// Alternatively:
yourElement.addEventListener(type, listener, useCapture: true);
```

## Preventing Default Actions in Event Handling

The `preventDefault()` method is used within event handlers to prevent the browser from executing the default action associated with a specific event. This method is particularly useful in several scenarios:

- **Form Submission:** To stop the browser from submitting a form the traditional way, which typically refreshes the page.
- **Links:** To prevent navigation to a URL when clicking on a link, allowing for a custom behaviour to be implemented instead.
- **Drag-and-Drop Operations:** To avoid the browser's default handling of dragged data, like images or links.
- **Right-Click Menus:** To prevent the default context menu from appearing on right-click, allowing a custom menu to be displayed.

Here’s how you might use `preventDefault()` in a real-world scenario involving a form:

```javascript
document
  .querySelector('form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Stops the form from submitting traditionally
    // Additional code to handle the form submission via JavaScript
  });
```

## Considerations When Using `preventDefault():

- **Conditional Use:** Sometimes you may only want to prevent default behaviour under specific conditions. In such cases, you can wrap `preventDefault()` inside a conditional statement.
- **Event Bubbling:** It’s important to note that `preventDefault()` does not stop the event from bubbling up the DOM tree, only `stopPropagation()` does that. Therefore, other handlers can still respond to the event unless explicitly stopped.

Example: Consider a webpage with several links where, instead of navigating away, you want to load content dynamically:

```javascript
document.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Prevents the link from navigating
    const href = link.getAttribute('href');
    // Function to load content dynamically based on the href value
    loadContent(href);
  });
});
```

## Check if it is bubbling event or not

The `bubbles` property on the event object indicates if the event propagates through the DOM and returns a boolean value.

## Managing Event Propagation

`stopPropagation()` – This method prevents the event from continuing to propagate up (bubbling) or down (capturing) the DOM tree. It’s useful in scenarios where you want to limit an event to a specific component or prevent parent elements from reacting to the same event triggered on a child element.

`stopImmediatePropagation()`– This extends the functionality of `stopPropagation()` by not only stopping the event from moving up or down the DOM but also preventing any other listeners on the same element from being executed. This is particularly valuable when multiple handlers are attached to a single element and could conflict or redundantly respond to the same event trigger.

Here’s a practical example of using `stopPropagation()` in an event handler for a nested element:

```javascript
document.getElementById('innerDiv').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents the event from reaching the outer div
    console.log('Inner div clicked!');
});

document.getElementById('outerDiv').addEventListener('click', function() {
    console.log('Outer div clicked!');
});
```

In this setup, clicking on `innerDiv` logs its message without triggering the click event of `outerDiv`, thanks to `stopPropagation()`.

## Using Event Bubbling and Capturing Simultaneously: Event Delegation

Event delegation is a powerful technique in JavaScript that leverages the concepts of event bubbling and capturing to efficiently manage events, especially in scenarios involving multiple child elements. This approach involves attaching a single event listener to a parent element rather than setting individual listeners on each child. Here's why and how this technique is beneficial:

- **Performance Optimisation:** By reducing the number of event listeners, you minimise the memory usage and improve performance, particularly when dealing with a large number of elements.
- **Dynamic Content:** It is ideal for elements that are dynamically added to the page. Since the listener is on the parent, any child, existing or newly added, will have the event handling capabilities without the need to attach new listeners.
- **Simplicity:** It simplifies event management by centralising the handling in one location, reducing redundancy and potential errors in event handling setup.

In event delegation, the event listener is added to a parent element. During event propagation, when an event occurs on a child element, it bubbles up to the parent where the listener is triggered. Here, the event handler can check the origin of the event (using properties like `event.target`) and execute appropriate actions based on the target element.

For example, if you have a `ul` list with numerous `li` items, instead of attaching a click event to each `li`, you attach it once to the `ul`:

```javascript
document
  .querySelector('ul')
  .addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
      console.log('List item clicked:', event.target.textContent);
    }
  });
```

This method ensures that any click on a list item, regardless of when it was added to the list, is handled appropriately without individual listeners on each item. Practical Use Cases:

- Handling clicks on a large table where each row or cell might trigger an action.
- Managing interactive lists where items can be added or removed.
- Simplifying form controls like buttons or checkboxes grouped in a panel.

In essence, event delegation is not just a technique but a fundamental approach to efficient event handling in modern web applications, taking full advantage of the event bubbling and capturing mechanisms.

## Understanding `Event.target` vs `Event.currentTarget`

`Event.target` – This property refers to the element that initially triggered the event. It is the most deeply nested element that was clicked or interacted with. For instance, if you have a button with a span inside it, and the user clicks on the span, `Event.target` would be the span.

`Event.currentTarget` – In contrast, `Event.currentTarget` refers to the element to which the event handler is currently attached. During the event's propagation, this property always refers to the element whose event listener triggered the current function. If the same button mentioned earlier has an event listener, and the span inside it is clicked, `Event.currentTarget` would be the button, assuming the listener was attached to the button.

It allows developers to precisely determine where an event originated (`Event.target`) versus where it is being handled (`Event.currentTarget`).

Here's a practical example to illustrate their use:

```javascript
document
  .querySelector('#button')
  .addEventListener('click', function (event) {
    console.log('Event.target:', event.target.tagName); // Could be 'SPAN'
    console.log('Event.currentTarget:', event.currentTarget.tagName); // Always 'BUTTON'
  });
```

In this code, if a user clicks on a span inside a button, `Event.target` logs 'SPAN', and `Event.currentTarget` logs 'BUTTON'. This distinction is particularly useful for implementing event delegation or handling events on a parent element while knowing the specific target that triggered the event.

## Non-bubbling Events

Certain events do not bubble. Here are examples:

- [blur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) (Contrast with [focusout](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event), which does bubble).
- [focus](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event) (Contrast with [focusin](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event), which does bubble).
- [mouseleave](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event) (Contrast with [mouseout](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event), which does bubble).
- [mouseenter](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event) (Contrast with [mouseover](https://transang.me/everything-about-event-bubbling/mouseover), which does bubble).
- [load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event), [unload](https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event), [abort](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event), [error](https://developer.mozilla.org/en-US/docs/Web/API/Element/error_event), [beforeunload](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event).

Note: Events that do bubble have `true` set on the `bubbles` option when the event is created, though they still undergo the Capturing phase.

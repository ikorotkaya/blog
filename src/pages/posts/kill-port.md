---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'How to kill a process running on a specific port'
pubDate: '2024-06-30'
tags: ['terminal', 'command-line', 'processes']
---

Sometimes a development server or application may not shut down properly, leaving the port in use. These commands help to stop a process running on a specific TCP port and free up a port for another application.

### What is TCP?

**TCP (Transmission Control Protocol)** ensures reliable communication between devices over a network, ensuring that data is delivered accurately.

### Two-step process

I usually use two commands:

1. Find the PID:
   ```sh
   lsof -t -i tcp:1234
   ```
2. Kill the process:
   ```sh
   kill <PID>
   ```

### One-step command

But recently I found out how to do it in one line:

```sh
lsof -t -i tcp:1234 | xargs kill
```

- **`lsof -t -i tcp:1234`**: Lists the process ID (PID) using TCP port 1234.
- **`| xargs kill`**: Passes the PID to the `kill` command to stop the process.

### Caution

Be careful to know what process you are killing, especially on a shared server, as it may affect other users or services.

---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'My most frequently used Git commands'
pubDate: '2024-06-06'
tags: ['git']
---

I've been learning a lot about Git while working, and I wanted to document some useful commands that I use on a daily basis.

### Resetting Changes

- **Discard all local changes and revert to the last commit:**

  ```sh
  git reset --hard
  ```

  This command will remove all local changes and reset your working directory to match the last commit.

- **Undo the last commit and unstage all changes (if you didn't push it yet):**

  ```sh
  git reset
  ```

  This will undo the last commit, but keep your changes in the working directory.

- **Unstage a file but keep the changes:**
  ```sh
  git reset HEAD <file>
  ```
  This unstages the specified file, keeping the changes in the working directory.

### Stashing Changes

- **Save all local changes for later:**

  ```sh
  git stash
  ```

  This command stashes your changes, allowing you to apply them later.

- **Apply stashed changes:**
  ```sh
  git stash apply
  ```
  This command re-applies stashed changes to your working directory.

### Working with Commits

- **Undo the last commit but keep everything else intact:**

  ```sh
  git reset --soft HEAD
  ```

  This keeps your changes staged but removes the last commit.

- **Discard all uncommitted changes and reset to the previous commit:**

  ```sh
  git reset --hard HEAD
  ```

  This completely removes any local changes and resets to the last commit.

- **Go back five commits, resetting everything:**

  ```sh
  git reset --hard HEAD~5
  ```

  This will take your project back five commits, discarding all changes made since then.

- **Go back five commits, keeping your changes:**
  ```sh
  git reset --soft HEAD~5
  ```
  This moves the HEAD back five commits but keeps your changes in the working directory.

### Merging and Rebasing

- **Merge changes from another branch:**

  ```sh
  git merge <branch-name>
  ```

  This merges the specified branch into your current branch.

- **Rebase your current branch onto another branch:**

  ```sh
  git rebase <branch-name>
  ```

  This re-applies your commits on top of the specified branch.

- **Force push after merging or rebasing:**
  ```sh
  git push --force
  ```
  This forces the push of your local changes to the remote repository, even if there are conflicts.

### Viewing Commit Logs and Diffs

- **See a log of all commits between origin/main and HEAD:**

  ```sh
  git log origin/main..HEAD
  ```

  This shows all the commits that are in your local branch but not in the origin/main branch.

- **View the diff between origin/main and HEAD:**
  ```sh
  git diff origin/main..HEAD
  ```
  This shows the differences between your current branch and the origin/main branch.

These commands have been incredibly useful for managing my codebase and keeping track of changes. This post will be updated as I learn more about Git and discover new commands.

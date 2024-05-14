---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Understanding the `git clean` command'
pubDate: '2024-05-02'
tags: ['git', 'git-clean']
---

The `git clean` command helps to keep the project folder tidy by removing files and directories that Git isn't tracking.

**What are untracked files?**
Untracked files are those that exist in your directory but haven't been added to Git's record of tracked files. Essentially, Git doesn't know about these files yet.

**Options in `git clean`:**
- **`-f` or `--force`:** this is required to actually delete files because Git wants to prevent accidental deletions of important data.
- **`-d`:** use this if you need to remove untracked directories in addition to untracked files.
- **`-n`:** this stands for "dry run." It shows you what would be deleted if you were to run the command without this option. It’s a safe way to ensure you don’t delete something you might need.

**How to use it:**
- **`git clean -n`:** run this to see what would be deleted. It’s like a preview.
- **`git clean -f -d`:** when you confirm that all files and directories shown can be deleted, use this command to actually remove all untracked files and directories.

The options above allow you to manage deletions carefully, ensuring that you only remove what you intend to and check everything before you make it final.
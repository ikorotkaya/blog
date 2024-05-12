---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Switch from HTTPS to SSH for GitHub Access'
pubDate: '2024-03-20'
tags: ['git', 'github', 'ssh', 'https']
---

I needed to switch working computers and wanted to access my GitHub repositories without repeatedly entering my username and password. I found that using SSH keys was the best way to do this. And here are the steps to switch from HTTPS to SSH for GitHub access.

## What are HTTPS and SSH?

**HTTPS** is likely what you're using at first. It’s a secure protocol requiring regular credential checks. It uses your username and password to access repositories. But if you have two-factor authentication, it demands an extra step of using a personal access token.

**SSH** is a secure protocol using cryptographic keys for authentication. It uses a pair of keys — one private and one public — to secure network operations without needing to input your credentials every time.

## Steps to Switch to SSH

1. **Generate an SSH key pair**: First, you need to create a new SSH key pair on your computer. Open your terminal or command prompt and type:

   ```sh
   ssh-keygen
   ```

   Follow the prompts to choose a file location and passphrase. This generates two files: your private key (`id_rsa`) and public key (`id_rsa.pub`).

2. **Add your SSH key to GitHub**: Open the `id_rsa.pub` file with a text editor and copy its contents:

   - Go to GitHub and click on your profile picture, then click on `Settings`.
   - In the sidebar, click `SSH and GPG Keys`, then `New SSH Key`.
   - Paste your public key into the field, give it a title, and click `Add SSH key`.

3. **Change Your Repository’s Remote URL**: Change your repository's remote URL from HTTPS to SSH. In your terminal, go to your repository directory and run:

   ```sh
   git remote set-url origin git@github.com:username/repository.git
   ```

   Replace `username` and `repository.git` with your GitHub username and repository name respectively.

And that's it. Now there's no need to enter my username and password every time you push or pull from your repository.
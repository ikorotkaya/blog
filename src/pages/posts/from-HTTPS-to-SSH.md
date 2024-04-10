---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'from HTTPS to SSH'
pubDate: 2024-03-20
tags: ["git", "github", "ssh", "https"]
---

## How to switch from HTTPS to SSH for GitHub access: A simple guide

If you're a GitHub user, you've likely experienced the hassle of repeatedly entering your username and password to access your repositories. This process becomes even more tedious if you use two-factor authentication, requiring you to generate a personal access token for every push or pull operation. However, there's a simpler and more secure method to work with GitHub: using SSH.

### Understanding HTTPS and SSH

**HTTPS** is the method you're probably using right now. It's straightforward and secure, requiring your username and password for access. However, it can be tedious, especially with the extra step of using a personal access token for those with two-factor authentication.

**SSH** is a protocol that allows secure network operations using a pair of keys: one private and one public. This method doesn't require you to enter your username and password each time you interact with your repositories, making your workflow smoother and more secure.

### Making the switch

Switching from HTTPS to SSH may sound daunting, but it's actually quite simple. Here's how to do it in a few steps:

1. **Generate an SSH key pair**: First, you need to create a new SSH key pair on your computer. Open your terminal or command prompt and type

   ```sh
   ssh-keygen
   ```

   Press `Enter` to accept the default file location and passphrase, or set one for added security. This will create two files: a private key (usually `id_rsa`) and a public key (`id_rsa.pub`).

2. **Add your SSH key to GitHub**: Next you need to add your public key to your GitHub account. Open the `id_rsa.pub` file with a text editor and copy its contents:
   - Go to GitHub and click on your profile picture, then click on `Settings`.
   - In the sidebar, click `SSH and GPG Keys`, then `New SSH Key`.
   - Paste your public key into the field, give it a meaningful title, and click `Add SSH key`.

3. **Change the remote URL of your repository to SSH**: Finally, you need to change your repository's remote URL to use SSH instead of HTTPS. In your terminal or command prompt, go to your repository's directory and run

   ```sh
   git remote set-url origin git@github.com:username/repository.git
   ```

   Replace `username` and `repository.git` with your GitHub username and repository name respectively.

And that's it! You can now interact with your GitHub repositories without having to enter your username and password each time. This method not only simplifies your workflow, but also increases security by using cryptographic keys for authentication.
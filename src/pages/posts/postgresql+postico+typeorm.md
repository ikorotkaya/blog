---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Set up a PostgreSQL, Postico and TypeORM project'
pubDate: '2024-05-14'
tags: ['coding', 'typeorm', 'postico', 'database']
---

Here’s a short guide on how to set up a PostgreSQL database, connect it to Postico (a macOS PostgreSQL client), and configure a TypeORM project.

**Step 1: Check PostgreSQL Server**

Check that your PostgreSQL server is running. If it's not, you can start it with this command on macOS:

```bash
brew services start postgresql
```

**Step 2: Create Database Using Postico**

1. **Open Postico** and select "New Server".
2. **Connect to Server**:
   - **Nickname**: Provide a descriptive name for your connection.
   - **Host**: Use `localhost`.
   - **User**: Enter your PostgreSQL username.
   - **Password**: Enter your PostgreSQL password.
   - **Port**: Use `5432`, the default PostgreSQL port.
   - Click "Connect".
3. **Create Database**:
   - Once connected, click on `+ Database` at the bottom left of the window.
   - Enter the desired database name and confirm its creation.

**Step 3: Configure TypeORM**

Configure TypeORM in your project. This configuration usually locates in a file named `ormconfig.json` or `data-source.ts`. Here’s an example:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "username",
  "password": "password",
  "database": "typeorm_basics"
}
```

Make sure to replace `"password"` with your actual PostgreSQL password and `"typeorm_basics"` with the name of your newly created database.

**Step 4: Start Your TypeORM Project**

In your project directory, start your TypeORM application with:

```bash
npm start
```

This command starts your project, and TypeORM connects to the database.

**Alternatively, Create and Manage the Database via Terminal:**

1. **Connect to PostgreSQL**:
   ```bash
   psql -U username -h localhost
   ```
2. **Create Database**:
   ```sql
   CREATE DATABASE typeorm_basics;
   ```
3. **Grant Permissions**:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE typeorm_basics TO username;
   ```
4. **Exit psql**:
   ```bash
   \q
   ```
5. Finally, navigate to your project directory and run:
   ```bash
   npm start
   ```

This process should get you up and running with PostgreSQL, Postico, and TypeORM, making it easier to manage your data effectively.

Additional note for myself: to list all database names, use:

```
psql -l
```

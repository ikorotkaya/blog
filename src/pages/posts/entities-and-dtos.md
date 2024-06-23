---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'DTOs, entities, frontend and backend connections'
pubDate: '2024 06 23'
tags:
  ['dto', 'apollo', 'entity', 'codegen', 'migration', 'query', 'view']
---

I came across a problem where I needed to add a label for units in the units table. I use the label info from property entity where the units are stored, but the required field wasn't there in our current set-up. So, I had to update the DTO on the backend and then use code generation to create new types on the frontend. This way, we could successfully add and display the new label for the units.

# Backend Components

**Entities**:

In a backend framework like NestJS, Entities represent tables in a database when using TypeORM. They lay out the structure of the tables, including the columns and data types.

Updating Entities: If you're making changes to an entity, like adding a new column, you'll usually need to create a migration. A migration is a script or set of operations that alters the database schema to match the changes in your entities. This is how any changes to the entity definitions get reflected in the database.

**DTOs (Data Transfer Objects)**:

DTOs are used to define the shape and data validation of the requests that come in to your API. They help to structure the data that comes into your endpoints, and are really important in applications that use GraphQL or RESTful APIs.

Modifying DTOs: When you make changes to DTOs, like adding a new field, it usually affects how data is accepted from the client or returned to it. These changes often mean that the frontend needs to be updated to handle the new data structures.

# Frontend Components

**GraphQL Model Updates**:

GraphQL models are basically the blueprint for how the frontend interacts with the GraphQL server. When there are changes to the GraphQL schema on the backend (often due to changes to DTOs or query/mutation definitions), these changes need to be reflected in the frontend.

Running Codegen: If your frontend uses tools like Apollo and has a code generation tool (which is often called codegen), any update to the GraphQL schema means you have to run the codegen again. This process updates the types and query hooks in your frontend application that were generated locally to match the new schema definitions from the backend.

# Workflow Summary

1. **Update Entity**: If you need to add a new database column, just update your entity definition in the backend.
2. **Create Migration**: Once you've updated the entity, you can create and run a migration to alter the database schema.
3. **Update DTO**: If you need to expose this new data to your API, just update your DTOs to include it.
4. **Update GraphQL Schema**: Make necessary changes to your GraphQL types and resolvers to expose the new data.
5. **Run Codegen on FE**: Once you've made updates to the GraphQL schema, you'll need to run the frontend codegen to update the types and any other generated code that interacts with these types.
6. **Update GraphQL Queries/Fragments on FE**: Once you've updated your frontend types with codegen, you'll need to make any affected GraphQL queries, mutations, or fragments include the new data fields. For instance, if you've added a new field called 'birthdate' to the user entity and it's now available through your GraphQL API, you'll need to update the relevant query or fragment like this:

   ```graphql
   fragment UserDetails on User {
     id
     username
     email
     birthdate # newly added field
   }
   ```

   You can use these queries or fragments to adjust any frontend components so that your application’s UI reflects the new data. This is a really important step for making the new data accessible and usable within your application.

7. **Update Frontend Usage**: Once you've got the new data types and queries set up, you can make the necessary changes to the frontend logic.

This workflow makes sure that your backend and frontend are in sync with each other when it comes to data structures and API contracts. This makes it easier for the client and server to exchange data.

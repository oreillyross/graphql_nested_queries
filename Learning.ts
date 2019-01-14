// SETTING UP A PRISMA DATABASE
// =================================

// npm install -g prisma

// mkdir hello-world
// cd hello-world
// prisma init

// TWO SERVICE FILES FOR PRISMA
//=========================================================
// prisma.yml

// EXAMPLE FILE
//=========================================================
// endpoint: http://localhost:4466
// datamodel: datamodel.prisma
// ---- if you have multiple files, then it can be written as follows ----
// datamodel:
//   - types.prisma
//   - enums.prisma
// secret: mysecret42
// generate:
//   - generator: `graphql-schema`
//     output: ./prisma-schema

//=========================================================


// datamodel.prisma
//=========================================================

// prisma deploy

// PREPARE A NODE APPLICATION
// =============================

// touch index.js

// npm init -y
// npm install --save prisma-client-lib


// INDEX.JS FILE
//=========================================================
const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {

  // Create a new user called `Alice`
  const newUser = await prisma.createUser({ name: 'Alice' })
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)

  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log(allUsers)
}

main().catch(e => console.error(e))
//===============================================================

// POSTS_CHANGE.ts
// =================================================================
const newUserWithLinks: UserNode = await prisma
  .createUser({
    name: "Alice",
    password: "IlikeTurtles",
    links: {
      create: [{
        description: "The data layer for modern applications",
        url: "https://www.prisma.io"
      }, {
        description: "Fullstack GraphQL tutorial",
        url: "https://www.howtographql.com"
      }],
      connect: {
        id: "cjli6tknz005s0a23uf0lmlve"
      }
    }, 
  })
// =================================================================
// BASIC_SUBSCRIPTION
// =================================================================
prisma.$subscribe.user({
  mutation_in: ["CREATED"],
  email_contains: "gmail"
}).node()
// =================================================================

// FLUENTAPI RELATIONS
// =================================================================
const postsByUser = await prisma
  .user({ id })
  .posts()
// =================================================================

  
  
// EXECUTE THE APPLICATION
// ==========================

// node index.js

// DATAMODEL
// ==============
// datamodel.prisma sits in the root folder, written in SDL.

type Post {
  id: ID! @unique
  createdAt: DateTime!
  published: Boolean! @default(value: "false")
  title: String!
  author: User!
}

type User {
  id: ID! @unique
  email: String @unique
  name: String!
  posts: [Post!]!
}

// APPLICATION SERVER - Where all the business logic goes and where the GraphQL
// generatede CRUD APIs are exposed as required
// ============================================================
const GraphQLSever = require('graphql-yoga')
const Prisma = require('prisma-binding')
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './schema.graphql'
  resolvers,
  context: {
    db: new Prisma({
      typeDefs: './prisma.graphql',
      endpoint: 'http://localhost:4466'
    })
  }
})
server.start(() => console.log(`Sever is running on http://localhost:4000`))
// ============================================================
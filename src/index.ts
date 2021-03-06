import { GraphQLServer } from 'graphql-yoga'
import { resolvers } from './resolvers'
import { data } from './data'
import { prisma } from '../generated/prisma-client'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { data },
} as any)

server.start(() => console.log('Server is running on http://localhost:4000'))

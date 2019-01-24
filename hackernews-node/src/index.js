const { GraphQLServer } = require('graphql-yoga')
const typeDefs = './src/schema.graphql'
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: (parent, args, context, info) => context.prisma.links(),
    // // link: (parent, args, conext, info) => {
    // //     return links.find((link) => link.id === args.id)
    // }
  },
  Mutation: {
    // 2
    // deleteLink: (parent, {id}, context, info) => {
    //   const [link] = links.filter(link => id === link.id)
    //   const index = links.findIndex((link) => id === link.id)
    //     const newLinks = [...links.slice(0,index), 
    //                       ...links.slice(index + 1, links.length)
    //                     ]
    //       links = newLinks               
    //   return link
    // },
    // updateLink: (parent, {id, url, description}, context, info) => {
    //     let link = {id, url, description}
    //     const index = links.findIndex((link) => id === link.id)
    //     const newLinks = [...links.slice(0,index), 
    //                       {...link}, 
    //                       ...links.slice(index + 1, links.length)
    //                     ]
    //       links = newLinks               
    //     return link                 
    // },
    post: (parent, {url, description}, context, info) => {
      return context.prisma.createLink({url, description})
    }
  },
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { prisma },
})
server.start(() => console.log(`Server is running`))
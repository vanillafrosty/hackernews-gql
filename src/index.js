const { GraphQLServer } = require('graphql-yoga')



let links = [{
  id: 'link-0',
  description: 'Hello world i am link 0',
  url: 'link/0'
}]


const resolvers = {
  Query: {
    info: () => 'Hello World!',
    feed: () => links
  },

  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

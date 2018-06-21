const { GraphQLServer } = require('graphql-yoga')

// 1
const typeDefs = `
type Query {
  info: String!,
  feed: [Link!]!
}

type Link {
  id: ID!,
  description: String!,
  url: String!
}
`

let links = [{
  id: 'link-0',
  description: 'Hello world i am link 0',
  url: 'link/0'
}]

// 2
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

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

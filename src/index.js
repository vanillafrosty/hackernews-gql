const { GraphQLServer } = require('graphql-yoga')



let links = [{
  id: 'link-0',
  description: 'Hello world i am link 0',
  url: 'link/0'
}]

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'Hello World!',
    feed: () => links,
    link: (root, args) => {
      for (let i=0; i<links.length; i++) {
        if (args.id === links[i].id) {
          return links[i];
        }
      }
      return null;
    }
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        url: args.url,
        description: args.description,
        id: `link-${idCount++}`
      }
      links.push(link)
      return link
    }
  }

}

//the below isn't necessary in our resolvers, because graphQL is
//smart enough to assume this for links (specifically our feed query).
//general NOTE: (root) in this case represents each Link returned by the
//feed query. so each of the three resolvers below are called per Link.
// Link: {
//   id: (root) => root.id,
//   description: (root) => root.description,
//   url: (root) => root.url,
// }

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

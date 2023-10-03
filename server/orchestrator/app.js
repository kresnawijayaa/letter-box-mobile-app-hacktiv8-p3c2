if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schema/userSchema");

const {
  typeDefs: movieTypeDefs,
  resolvers: movieResolvers,
} = require("./schema/movieSchema");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, movieTypeDefs],
  resolvers: [userResolvers, movieResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});

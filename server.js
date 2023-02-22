const  jwt  = require("jsonwebtoken");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schemaTypes");
const { Mutation } = require("./resolvers/Mutation");
const { Query } = require("./resolvers/Query");
const mongoose = require("mongoose");
require("dotenv").config();

const context = ({ req }) => {
  const { authorization } = req.headers.authorization || "";
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
    Query,
  },
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");

    server.listen().then(({ url }) => {
      console.log(" 🚀 Server is up at " + url);
    });
  })
  .catch((err) => {
    console.log(err);
  });

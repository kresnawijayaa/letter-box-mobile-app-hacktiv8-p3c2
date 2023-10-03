const axios = require("axios");
const BASE_URL_USER = "http://localhost:4001";

const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 19839,
  password: process.env.REDIS_PASSWORD,
});

const typeDefs = `#graphql
 type User {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  input UserInput {
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
    password: String
  }
  
  type ResponseMessage {
    message: String!
  }

  type Query {
    users: [User]
    userById(_id: ID): User
  }

  type Mutation {
  addUser(body: UserInput): ResponseMessage
  deleteUser(_id: ID): ResponseMessage
}

  `;

const resolvers = {
  Query: {
    users: async function () {
      try {
        let result = await redis.get("users");
        if (!result) {
          const { data } = await axios({
            url: BASE_URL_USER + "/users",
            method: "GET",
          });

          await redis.set("users", JSON.stringify(data));
          result = data;
        } else {
          result = JSON.parse(result);
          console.log("cache items from redis");
        }
        return result;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },

    userById: async (_, args) => {
      try {
        const { data } = await axios({
          url: BASE_URL_USER + "/users/" + args._id,
          method: "GET",
        });
        return data;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },
  },

  Mutation: {
    addUser: async function (_, args) {
      try {
        console.log(args);
        const input = args.body;

        const { data } = await axios({
          url: BASE_URL_USER + "/users",
          method: "POST",
          data: {
            username: input.username,
            email: input.email,
            role: input.role,
            phoneNumber: input.phoneNumber,
            address: input.address,
            password: input.password,
          },
        });

        // Invalidate the cache
        await redis.del("users");
        return {
          message: data.message || "User added successfully",
        };
      } catch (error) {
        if (error.response && error.response.status === 400) {
          throw new Error("Bad Request: " + error.response.data.message);
        }
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },

    deleteUser: async (_, args) => {
      const id = args._id;
      console.log(args);
      try {
        const response = await axios.delete(`${BASE_URL_USER}/users/${id}`);
        const user = response.data;
        if (!user) {
          throw new Error("Failed to delete user");
        }
        await redis.del("users");
        await redis.del(`user:${id}`);
        return {
          message: "User deleted successfully",
          user,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Server Error");
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

const axios = require("axios");
const BASE_URL_MOVIE = process.env.BASE_URL_MOVIE || "http://localhost:4002";
const BASE_URL_USER = process.env.BASE_URL_USER || "http://localhost:4001";

const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 19839,
  password: process.env.REDIS_PASSWORD,
});

const typeDefs = `#graphql
 type Movie {
      id: ID
      title: String
      slug: String
      synopsis: String
      trailerUrl: String
      imgUrl: String
      rating: Int
      genreId: ID
      UserMongoId: ID
      createdAt: String
      updatedAt: String
      Genre: Genre
      Casts: [Cast]
      User: User
  }

  input MovieInput {
      title: String
      synopsis: String
      trailerUrl: String
      imgUrl: String
      rating: Int
      genreId: Int
      UserMongoId: String
      Casts: [CastInput]
  }

  input MovieInputUpdate {
      id:ID
      title: String
      synopsis: String
      trailerUrl: String
      imgUrl: String
      rating: Int
      genreId: Int
      UserMongoId: String
      Casts: [CastInput]
  }

  type Genre {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }

  type User {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }
  
  input CastInput {
    name: String
    profilePict: String
  }

  type Cast {
    id: ID
    name: String
    profilePict: String
    movieId: ID
    createdAt: String
    updatedAt: String
  }
  
  type ResponseMessage {
    message: String!
  }

  input CastInput {
    name: String!
    profilePict: String!
}

  type Query {
    movies: [Movie]
    movieBySlug(slug: String): Movie
  }

  type Mutation {
  addMovie(body: MovieInput): ResponseMessage
  updateMovie(body: MovieInputUpdate): ResponseMessage
  deleteMovie(id: ID): ResponseMessage
}

  `;

const resolvers = {
  Query: {
    movies: async function () {
      try {
        let result = await redis.get("movies");
        if (!result) {
          const { data } = await axios({
            url: BASE_URL_MOVIE + "/movies",
            method: "GET",
          });

          await redis.set("movies", JSON.stringify(data));
          result = data;
        } else {
          result = JSON.parse(result);
          console.log("cache items from redis");
        }
        console.log(result);
        return result;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },

    movieBySlug: async (_, args) => {
      try {
        const { data } = await axios({
          url: BASE_URL_MOVIE + "/movies/" + args.slug,
          method: "GET",
        });

        const { data: user } = await axios({
          url: BASE_URL_USER + "/users/" + data.UserMongoId,
          method: "GET",
        });

        console.log(user, "user apapap");
        data.User = user;

        return data;
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : error.message
        );
      }
    },
  },

  Mutation: {
    addMovie: async function (_, args) {
      try {
        console.log(args);
        const input = args.body;

        const { data } = await axios({
          url: BASE_URL_MOVIE + "/movies",
          method: "POST",
          data: {
            title: input.title,
            synopsis: input.synopsis,
            trailerUrl: input.trailerUrl,
            imgUrl: input.imgUrl,
            rating: input.rating,
            genreId: input.genreId,
            UserMongoId: input.UserMongoId,
            casts: input.Casts,
          },
        });

        console.log(data, "apapapapap");

        // Invalidate the cache
        await redis.del("movies");
        return {
          message: data.message || "Movie added successfully",
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

    updateMovie: async (_, args) => {
      try {
        const input = args.body;
        console.log(input);

        const response = await axios.put(
          BASE_URL_MOVIE + `/movies/update/${input.id}`,
          input
        );
        const updatedMovieData = response.data;

        if (!updatedMovieData) {
          throw new Error("Failed to update movie");
        }

        await redis.del("movies");
        await redis.del(`movie:${args.id}`);

        return {
          message: "Movie updated successfully",
        };
      } catch (error) {
        console.error(error);
        throw new Error("Server Error");
      }
    },

    deleteMovie: async (_, args) => {
      const id = args.id;
      console.log(args);
      try {
        const response = await axios.delete(
          `${BASE_URL_MOVIE}/movies/delete/${id}`
        );
        const movie = response.data;
        if (!movie) {
          throw new Error("Failed to delete movie");
        }
        await redis.del("movies");
        await redis.del(`movie:${id}`);
        return {
          message: "Movie deleted successfully",
          movie,
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

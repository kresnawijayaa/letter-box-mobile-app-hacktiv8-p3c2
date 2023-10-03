"use strict";
const { hashPassword } = require("../helpers/hash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/users.json").map((user) => {
      user.password = hashPassword(user.password);
      user.createdAt = user.updatedAt = new Date();
      return user;
    });
    await queryInterface.bulkInsert("Users", users, {});

    const genres = require("../data/genres.json").map((genre) => {
      genre.createdAt = genre.updatedAt = new Date();
      return genre;
    });
    await queryInterface.bulkInsert("Genres", genres, {});

    const movies = require("../data/movies.json").map((movie) => {
      movie.createdAt = movie.updatedAt = new Date();
      return movie;
    });
    await queryInterface.bulkInsert("Movies", movies, {});

    const casts = require("../data/casts.json").map((cast) => {
      cast.createdAt = cast.updatedAt = new Date();
      return cast;
    });
    await queryInterface.bulkInsert("Casts", casts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Genres", null, {});
    await queryInterface.bulkDelete("Movies", null, {});
    await queryInterface.bulkDelete("Casts", null, {});
  },
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: "authorId" });
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.Cast, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Title required.`,
          },
          notNull: {
            args: true,
            msg: `Title required.`,
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Slug required.`,
          },
          notNull: {
            args: true,
            msg: `Slug required.`,
          },
        },
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Synopsis required.`,
          },
          notNull: {
            args: true,
            msg: `Synopsis required.`,
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: `Rating at least 1 star`,
          },
          max: {
            args: 5,
            msg: `Rating maximum 5 star`,
          },
        },
      },
      genreId: DataTypes.INTEGER,
      UserMongoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
      hooks: {
        beforeCreate(movie) {
          movie.slug = String(movie.title)
            .normalize("NFKD") // split accented characters into their base characters and diacritical marks
            .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
            .replace(/\s+/g, "-") // replace spaces with hyphens
            .replace(/-+/g, "-"); // remove consecutive hyphens
        },
      },
    }
  );
  return Movie;
};

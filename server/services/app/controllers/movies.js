const { Movie, Cast, Genre, User, sequelize } = require("../models");

function slugify(str) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

class MovieController {
  static async create(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        casts,
        UserMongoId,
      } = req.body;
      const slug = slugify(title);

      let movie = await Movie.create(
        {
          title,
          slug,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          UserMongoId,
        },
        { transaction }
      );

      const newCasts = casts.map((cast) => {
        cast.movieId = movie.id;
        return cast;
      });

      await Cast.bulkCreate(newCasts, { transaction });
      await transaction.commit();
      res.status(201).json(movie);
    } catch (error) {
      console.log(error, "apanihhh");
      await transaction.rollback();
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [
          {
            model: Genre,
          },
          {
            model: Cast,
          },
        ],
        order: [["id", "ASC"]],
      });
      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const movie = await Movie.findOne({
        where: { slug: req.params.slug },
        include: [
          {
            model: Genre,
          },
          {
            model: User,
          },
          {
            model: Cast,
          },
        ],
      });
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        UserMongoId,
      } = req.body;

      const slug = slugify(title);

      await Movie.update(
        {
          title,
          slug,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          UserMongoId,
        },
        { where: { id } }
      );
      res.status(201).json(`Movie with id ${movie.id} updated`);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const movie = await Movie.findByPk(req.params.id);
      if (!movie) {
        throw { name: "NotFound" };
      }
      await Movie.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: `${movie.title} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;

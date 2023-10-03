const { Movie, Cast, Genre, User, sequelize } = require("../models");

class PubController {
  static async read(req, res, next) {
    try {
      const movies = await Movie.findAll({
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
        order: [["id", "ASC"]],
      });
      console.log(movies, "ini juga berhasil");
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
      console.log(movie, "berhasil kokkk");
      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PubController;

const { Genre, sequelize } = require("../models");

class GenreController {
  static async create(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      let genre = await Genre.create(req.body);
      await transaction.commit();
      res.status(201).json(genre);
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const genres = await Genre.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const genre = await Genre.findByPk(req.params.id);
      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      const { name } = req.body;
      await Genre.update({ name }, { where: { id } });
      res.status(201).json(`Genre with id ${genre.id} updated`);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const genre = await Genre.findByPk(req.params.id);
      if (!genre) {
        throw { name: "NotFound" };
      }
      await Genre.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: `${genre.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;

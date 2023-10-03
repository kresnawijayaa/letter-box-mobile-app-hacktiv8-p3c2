const { Cast, sequelize } = require("../models");

class CastController {
  static async create(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      let cast = await Cast.create(req.body);
      await transaction.commit();
      res.status(201).json(cast);
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const casts = await Cast.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(casts);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const cast = await Cast.findByPk(id);
      const { name, profilePict, movieId } = req.body;
      await Cast.update({ name, profilePict, movieId }, { where: { id } });
      res.status(201).json(`Cast with id ${cast.id} updated`);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const cast = await Cast.findByPk(req.params.id);
      if (!cast) {
        throw { name: "NotFound" };
      }
      await Cast.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: `${cast.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CastController;

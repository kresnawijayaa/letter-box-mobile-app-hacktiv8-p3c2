const { User, sequelize } = require("../models");
const { checkPassword } = require("../helpers/hash");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { status: 400, message: "Email required" };
      }
      if (!password) {
        throw { status: 400, message: "Password required" };
      }
      let user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { status: 401, message: `Invalid email/password` };
      }
      let validPassword = checkPassword(password, user.password);
      if (!validPassword) {
        throw { status: 401, message: `Invalid email/password` };
      }
      let access_token = generateToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      let user = await User.create(req.body);
      await transaction.commit();
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      const users = await User.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        throw { name: "NotFound" };
      }
      await User.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        message: `${user.email} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

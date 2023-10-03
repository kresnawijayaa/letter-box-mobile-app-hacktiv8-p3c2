const User = require("../models/User");
const { validateEmail, hashPassword } = require("../helpers");

class Controller {
  static async findAll(req, res) {
    try {
      let users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static async create(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      if (
        !username ||
        !email ||
        !password ||
        !role ||
        !phoneNumber ||
        !address
      ) {
        console.log(req.body, username, email);
        return res.status(400).json({ msg: "All fields are required" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Invalid email format" });
      }

      const hashedPassword = hashPassword(password);

      const result = await User.createOne({
        username,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
        address,
      });

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      const result = await User.deleteById(id);
      if (result.deletedCount === 0) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.status(200).json(`${user.email} deleted`);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
}

module.exports = Controller;

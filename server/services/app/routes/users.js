const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

// create user
router.post("/", UserController.create);

// read user
router.get("/", UserController.read);

// read
router.get("/:id", UserController.detail);

// delete user
router.delete("/delete/:id", UserController.delete);

// login user
router.post("/login", UserController.login);

module.exports = router;

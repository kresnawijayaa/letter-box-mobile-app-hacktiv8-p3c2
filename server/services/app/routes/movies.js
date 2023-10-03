const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movies");

// create
router.post("/", MovieController.create);

// read
router.get("/", MovieController.read);

// read
router.get("/:slug", MovieController.detail);

// update
router.put("/update/:id", MovieController.update);

// delete
router.delete("/delete/:id", MovieController.delete);

module.exports = router;

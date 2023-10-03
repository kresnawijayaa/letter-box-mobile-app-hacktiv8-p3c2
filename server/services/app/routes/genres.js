const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/genres");

// create
router.post("/", GenreController.create);

// read
router.get("/", GenreController.read);

// read
router.get("/:id", GenreController.detail);

// update
router.put("/update/:id", GenreController.update);

// delete
router.delete("/delete/:id", GenreController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();
const CastController = require("../controllers/casts");

// create
router.post("/", CastController.create);

// read
router.get("/", CastController.read);

// update
router.put("/update/:id", CastController.update);

// delete
router.delete("/delete/:id", CastController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();
const PubController = require("../controllers/publics");

// read
router.get("/", PubController.read);

// read
router.get("/:slug", PubController.detail);

module.exports = router;

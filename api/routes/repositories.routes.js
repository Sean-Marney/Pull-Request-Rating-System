const express = require("express");

const {
  getAllRepositories,
} = require("../controllers/repositories.controller");

const router = express.Router();

router.get("/", getAllRepositories);

module.exports = router;

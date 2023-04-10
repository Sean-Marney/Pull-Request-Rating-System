const express = require("express");
const {deleteBadge, createBadge,getBadgesById, updateBadge} = require("../controllers/badges.controller");

const router = express.Router();

router.post("/create", createBadge);
router.delete("/delete/:id", deleteBadge);
router.get("/:id", getBadgesById);
router.patch("/update/:id", updateBadge);

module.exports = router;

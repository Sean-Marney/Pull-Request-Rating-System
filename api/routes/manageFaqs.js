const express = require("express");
const {
    getFaq,
    createFAQs,
    deleteFAQs,
} = require("../controllers/faqController");

const router = express.Router();

// CRUD routes for /manage/questions
router.get("/", getFaq);
router.post("/create", createFAQs);
router.delete("/delete/:id", deleteFAQs);

module.exports = router;

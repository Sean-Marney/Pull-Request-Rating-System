const express = require("express");
const {
    getQuestions,
    getQuestionById,
    createQuestions,
    deleteQuestions,
} = require("../controllers/newQuestions.controller");

const router = express.Router();

// CRUD routes for /manage/questions
router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/create", createQuestions);
router.delete("/delete/:id", deleteQuestions);



module.exports = router;
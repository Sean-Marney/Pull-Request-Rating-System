const express = require("express");
const {
    getQuestions,
    getQuestionById,
    createQuestions,
    deleteQuestions,
} = require("../controllers/newQuestions.controller");

const router = express.Router();
const permit = require('../middleware/permissions')

const verifyJWTToken = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

// CRUD routes for /manage/questions
router.get("/", permit('Manager Developer'), getQuestions);
router.get("/:id", permit('Manager Developer'), getQuestionById);
router.post("/create", permit('Developer'), createQuestions);
router.delete("/delete/:id", permit('Manager'), deleteQuestions);



module.exports = router;
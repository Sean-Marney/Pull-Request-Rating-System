const express = require("express");
const {
    getQuestions,
    getQuestionById,
    createQuestions,
    deleteQuestions,
} = require("../controllers/newQuestions.controller");

const router = express.Router();
const permit = require('../middleware/permissions')

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

// CRUD routes for /manage/questions
router.get("/", verifyManger, getQuestions);
router.get("/:id", verifyManger, getQuestionById);
router.post("/create", createQuestions);
router.delete("/delete/:id", verifyManger, deleteQuestions);



module.exports = router;
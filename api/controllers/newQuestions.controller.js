const Questions = require("../models/questions.model.js");

// CRUD methods for new questions

// Get all new questions
const getQuestions = async (req, res) => {
    try {
        const questions = await Questions.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a new questions by ID
const getQuestionById = async (req, res) => {
    try {
        const questions = await Questions.findById(req.params.id);
        if (!questions) {
            return res
                .status(404)
                .json({ message: "Question with that ID was not found" });
        }

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new question
const createQuestions = async (req, res) => {
    try {
        const questions = new Questions({
            question: req.body.question,
        });
        await questions.save();

        res.status(201).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Question
const deleteQuestions = async (req, res) => {
    try {
        const questions = await Questions.findById(req.params.id);
        if (!questions) {
            return res.status(404).json({ message: "Question not found" });
        }

        await questions.remove();

        res.status(200).json({ message: "Question deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getQuestions,
    getQuestionById,
    createQuestions,
    deleteQuestions,
};

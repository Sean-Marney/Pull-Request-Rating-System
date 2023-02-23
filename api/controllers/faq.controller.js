const Faq = require("../models/FAQ.js");

// CRUD methods for FAQs

// Get all FAQs
const getFaq = async (req, res) => {
    try {
        const faq = await Faq.find();
        res.status(200).json(faq);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a FAQs by ID
const getFaqById = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return res
                .status(404)
                .json({ message: "Question with that ID was not found" });
        }

        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a FAQs
const createFAQs = async (req, res) => {
    try {
        const faq = new Faq({
            question: req.body.question,
            answer: req.body.answer,
        });
        await faq.save();

        res.status(201).json(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a FAQs
const updateFAQs = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: "Question with that ID not found" });
        }

        faq.question = req.body.question;
        faq.answer = req.body.answer;
        await faq.save();

        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a FAQs
const deleteFAQs = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: "Question not found" });
        }

        await faq.remove();

        res.status(200).json({ message: "Question deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFaq,
    getFaqById,
    createFAQs,
    updateFAQs,
    deleteFAQs,
};

const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
        question: {
            type: String,
            required: true
        },
    },
    {
        timestamp: true
    }
);

const NewQuestion = mongoose.model("NewQuestion", questionsSchema);
module.exports = NewQuestion;


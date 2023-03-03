const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
        question: {
            type: String,
            required: true
        },
        answer:{
            type: String,
            required: true
        },
    },
    {
        timestamp: true
    }
);

const FaqModel = mongoose.model("FaqModel", faqSchema);
module.exports = FaqModel;




const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
        question: {
            String,
            required: true
        },
        answer:{String,
            required: true
        },
    },
    {
        timestamp: true
    }
);

const Faq = mongoose.model("Faq", faqSchema);
module.exports = Faq;




const express = require("express");
const {
    getFaq,
    getFaqById,
    createFAQs,
    updateFAQs,
    deleteFAQs,
} = require("../controllers/faq.controller");

const router = express.Router();


const verifyJWTToken = require('../middleware/verifyJWT')
router.use(verifyJWTToken)


// CRUD routes for /manage/questions
router.get("/", getFaq);
router.get("/:id", getFaqById);
router.post("/create", createFAQs);
router.patch("/update/:id", updateFAQs);
router.delete("/delete/:id", deleteFAQs);



module.exports = router;

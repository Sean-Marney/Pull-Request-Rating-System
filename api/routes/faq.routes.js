const express = require("express");
const {
    getFaq,
    getFaqById,
    createFAQs,
    updateFAQs,
    deleteFAQs,
} = require("../controllers/faq.controller");


const router = express.Router();
// const permit = require('../middleware/permissions')

// const verifyJWTToken = require('../middleware/verifyJWT')
// router.use(verifyJWTToken)

// pass a string of allowed roles to the permission hanlder, 
// each role should be seperated with a space

// CRUD routes for /manage/questions
router.get("/", getFaq);
router.get("/:id", getFaqById);
router.post("/create", createFAQs);
router.patch("/update/:id", updateFAQs);
router.delete("/delete/:id", deleteFAQs);
// router.delete("/delete/:id", permit('Manager'), deleteFAQs);



module.exports = router;

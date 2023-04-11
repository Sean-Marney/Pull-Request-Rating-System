const express = require("express");
const {deleteBadge, createBadge,getBadgesById, updateBadge} = require("../controllers/badges.controller");
const multer = require('multer');

const router = express.Router();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' })


router.post("/create", upload.single('image'), createBadge);
router.delete("/delete/:id", deleteBadge);
router.get("/:id", getBadgesById);
router.patch("/update/:id", updateBadge);

module.exports = router;

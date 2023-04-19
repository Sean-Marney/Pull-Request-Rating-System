const express = require("express");
const {deleteBadge, createBadge,getBadgesById, updateBadge, updateBadgeImage} = require("../controllers/badges.controller");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const router = express.Router();
const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });


router.delete("/delete/:id", verifyManger, deleteBadge);
router.get("/get/:id", getBadgesById);
router.patch("/update/:id", verifyManger, updateBadge);
router.post("/upload", upload.single('photo'), verifyManger, createBadge);
router.patch("/updateimage/:id", upload.single('photo'), verifyManger, updateBadgeImage);

module.exports = router;

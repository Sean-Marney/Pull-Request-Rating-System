const express = require("express");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const router = express.Router();
const Badge = require("../models/badges.model");
var fs = require('fs');

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


router.post("/all", upload.single('photo'), async (req, res) => {
    try {
        let npath = path.join(__dirname + '/..');
        let badge = new Badge({
            name: req.body.name,
            value: req.body.value,
            img: {
                data: fs.readFileSync(path.join(npath + '/images/' + req.file.filename)),
                contentType: 'image/png'
            }
        });
        await badge.save();
        fs.unlinkSync(path.join(npath + '/images/' + req.file.filename));
        res.status(201).json(badge);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;

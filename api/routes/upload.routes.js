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
    console.log(req.body);
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
    res.status(201).json(badge);
});

router.get('/photo', async function (req, res) {
    try {
        const badge = await Badge.findById("643572a2e0ef93ee429445d8");
        if (!badge) {
          return res
            .status(404)
            .json({ message: "Badge with that ID was not found" });
        }
        res.status(200).json(badge);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    // console.log(path.extname("images\\fb0a3b47-0790-4cd9-a7c3-97709a328e41-1681222861773.PNG"));
    // res.sendFile("images\\fb0a3b47-0790-4cd9-a7c3-97709a328e41-1681222861773.PNG");
});

module.exports = router;

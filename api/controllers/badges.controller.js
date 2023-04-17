const Badge = require("../models/badges.model");
var fs = require('fs');
let path = require('path');

// Get all badges
const getAll = async (req, res) => {
    try {
        const badges = await Badge.find().sort({ value: 1 });
        res.status(200).json(badges);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};


// Delete a badge
const deleteBadge = async (req, res) => {
    try {
      const badge = await Badge.findById(req.params.id);
      if (!badge) {
        return res.status(404).json({ message: "Badge with that ID not found" });
      }
      await badge.remove();
      res.status(200).json({ message: "Badge deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  // Create a badge
const createBadge = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
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
  console.log(error);
    res.status(500).json({ message: error.message });
}
};

// Get a badge by ID
const getBadgesById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res
        .status(404)
        .json({ message: "Badge with that ID was not found" });
    }
    res.status(200).json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a badge
const updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: "Badge with that ID not found" });
    }

    badge.name = req.body.badgeName;
    badge.value = req.body.starsRequired;
    await badge.save();

    res.status(200).json(badge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a badge
const updateBadgeImage = async (req, res) => {
  try {
        const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: "Badge with that ID not found" });
    }
    let npath = path.join(__dirname + '/..');
    badge.name = req.body.name;
    badge.value = req.body.value,
    badge.img = {
      data: fs.readFileSync(path.join(npath + '/images/' + req.file.filename)),
      contentType: 'image/png'
    }

    await badge.save();
    fs.unlinkSync(path.join(npath + '/images/' + req.file.filename));
    res.status(201).json(badge);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } 
};




module.exports = {
    getAll, deleteBadge, createBadge,getBadgesById, updateBadge,getAllNames, updateBadgeImage
};

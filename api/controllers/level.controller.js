const Level = require("../models/level.model");
// Reads the pull request for a user
// Takes in the id as a parameter and then returns the pull requests
const getNameForLevel = async (req, res) => {
    try {
        const level = req.params.id;
        const user = await Level.findOne({ level: level },{ name: 1 });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
const getAll = async (req, res) => {
    try {
        const user = await Level.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getNameForLevel,
    getAll
};

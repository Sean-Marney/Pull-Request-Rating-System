
// managerDash.controller.js

const PullRequest = require('../models/pullRequest.model');

exports.getRequests = async (req, res) => {
  try {
    const requests = await PullRequest.find({ 'rating_complete': false }).lean().exec();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { 
  getRequests: exports.getRequests 
};

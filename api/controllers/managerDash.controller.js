const PullRequest = require('../models/pullRequest.model');
const ClaimedReward = require('../models/claimedRewards.model');

const getRequests = async (req, res) => {
  try {
    const requests = await PullRequest.find({ 'rating_complete': false }).lean().exec();
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getArchivedRewards = async (req, res) => {
  try {
    const rewards = await ClaimedReward.find({ archived: true })
      .sort({ createdAt: 'desc' })
      .limit(3)
      .lean()
      .exec();
    res.json(rewards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { 
  getRequests,
  getArchivedRewards,
};


const Option = require('../models/option');
const Question = require('../models/question');

module.exports.deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'option not found',
      });
    }

    const question = await Question.findById(option.question);

    // remove reference of this option from question's options field
    await question.updateOne({ $pull: { options: optionId } });

    // delete the option
    await Option.findByIdAndDelete(optionId);

    return res.status(200).json({
      success: true,
      message: 'option deleted successfully!',
    });
  } catch (err) {
    console.log('*******', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports.addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'option not found',
      });
    }

    // add one to the value of votes
    option.votes +=  1;

    option.save();

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    console.log('*******', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

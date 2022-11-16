const Question = require('../models/question');
const Option = require('../models/option');

module.exports.createQuestion = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'title is required for creating question',
      });
    }

    const question = await Question.create({
      title,
    });

    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log('*******', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports.createOptions = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: 'text required for creating option',
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: 'question not found!',
      });
    }

    const option = await Option.create({
      text,
      question,
    });

    // create link_to_vote using _id of option
    const link_to_vote = `http://localhost:8000/options/${option.id}/add_vote`;

    option.link_to_vote = link_to_vote;

    option.save();

    // put reference of option in question schema
    await question.updateOne({ $push: { options: option } });

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

module.exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(400).json({
        message: 'question not found',
      });  
    }

    // delete all the options of the question
    await Option.deleteMany({ question: questionId });

    // delete question
    await Question.findByIdAndDelete(questionId);

    return res.status(200).json({
      success: true,
      message: "question and its options deleted successfully!"
    })
  } catch (err) {
    console.log('*******', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

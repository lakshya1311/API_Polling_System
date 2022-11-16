const express = require('express');
const router = express.Router();

const questionsController = require('../controllers/questions_controller');

router.post('/create', questionsController.createQuestion);
router.post('/:id/options/create', questionsController.createOptions);

module.exports = router;

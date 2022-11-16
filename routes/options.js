const express = require('express')
const router = express.Router()

const optionsController = require('../controllers/options_controller')

router.delete('/:id/delete', optionsController.deleteOption)
router.get('/:id/add_vote', optionsController.addVote)

module.exports = router
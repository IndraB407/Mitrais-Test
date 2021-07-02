const express = require('express')
const router = express.Router();
const transactionControllers = require('../controllers/transaction')

router.post('/transaction', transactionControllers.transactionUserToUser)
router.get('/transaction', transactionControllers.getUserHistory)

module.exports = router;
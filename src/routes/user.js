const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')

router.post('/users/create', userController.createUser)
router.get('/users/getAll', userController.getAllUser)
router.get('/users/getById/:id', userController.getUserById)
router.patch('/users/updateUser/:id', userController.updateUser)
router.get('/users/getAllWithCondition', userController.getAllUserWithCondition)
router.get('/users/birthday', userController.getUserBirthday)
router.post('/users/activateBirthdayScheduler', userController.activateBirthdayScheduler)

module.exports = router
const { Router } = require('express')
const authController = require('../controller/authController')

const router = Router()

router.post('/users', authController.users_post)
router.get('/users', authController.users_get)
router.get('/users/:id', authController.users_getId)
router.post('/users/login', authController.users_login)


module.exports = router
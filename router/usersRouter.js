const express = require('express')
const {getUsers} = require('../controller/usersController')
const router = express.Router()
router.get('/', getUsers)

module.exports = router;
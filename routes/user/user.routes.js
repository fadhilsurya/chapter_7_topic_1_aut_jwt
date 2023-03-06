const router = require('express').Router()
const { register, login, whoami } = require('../../controller/user.controller')
const { restrict } = require('../../middleware/common.middleware')

router.post('/login', login)
router.post('/register', register)
router.get('/whoami', restrict, whoami)


module.exports = router
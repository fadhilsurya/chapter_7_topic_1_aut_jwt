const router = require('express').Router()
const { register, login, whoami } = require('../../controller/user.controller')
const restrict = require('../../lib/passport')

router.post('/login', login)
router.post('/register', register)
router.get('/whoami', restrict, whoami)


module.exports = router
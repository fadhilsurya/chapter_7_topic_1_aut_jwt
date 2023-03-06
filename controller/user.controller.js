const helper = require('../helper/common.helper')
const { User } = require('../models/index')
const resp = require('../helper/response.helper')
const jwt = require('jsonwebtoken')

async function login(req, res) {

    const userCheck = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (!userCheck) {
        resp.data = ''
        resp.message = 'username not found'
        resp.status = 400
        res.json(resp)
        return
    }

    const checkPass = helper.comparePass(req.body.password, userCheck.password)

    if (!checkPass) {
        resp.data = ''
        resp.message = 'password incorrect'
        resp.status = 400
        res.json(resp)
        return
    }

    if (checkPass) {

        const accessToken = jwt.sign({
            username: userCheck.username,
            id: userCheck.id
        }, process.env.SECRET)

        resp.data = {
            token: accessToken,
            user_id: userCheck.id
        }
        resp.message = 'success'
        resp.status = 200
        res.json(resp)
        return
    }


}

function register(req, res, next) {
    const pass = helper.generatePass(req.body.password)

    const payload = {
        username: req.body.username,
        password: pass,
        email: req.body.email,
    }

    User.create(payload)
        .then((resp) => {
            resp.data = ""
            resp.message = resp
            resp.status = 200

            res.json(resp)
            return
        })
        .catch((err) => {
            resp.data = ""
            resp.message = err.message
            resp.status = 500
            res.json(resp)
            return
        })
}

async function whoami(req, res) {
    const dataUser = await User.findOne({
        where: {
            id: req.user.id
        }
    })

    res.json({
        user: dataUser
    }).status(200)
}


module.exports = {
    register,
    login,
    whoami
}
// function loginPage(req, res) {
//     let message = ''

//     if (req.session) {
//         if (req.session.message) {
//             message = req.session.message[0]

//             req.session.message = []
//         }
//     }
//     res.json({
//         message
//     }).status(200)
// }

// const login = passport.authenticate('local', {
//     successRedirect: '/homepage',
//     failureRedirect: '/register',
//     failureMessage: true,
//     session: false
// })


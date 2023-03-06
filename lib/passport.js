const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models/index')

const option = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
}

passport.use(new JwtStrategy(option, (payload, done) => {
    User.findByPk(payload.id)
        .then(user => done(null, user))
        .catch(user => done(err, false))
}))


module.exports = passport
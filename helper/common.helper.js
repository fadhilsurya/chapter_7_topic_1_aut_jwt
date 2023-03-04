const bcrypt = require('bcrypt');

function generatePass(pass) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND))
    const hash = bcrypt.hashSync(pass, salt)

    return hash
}

function comparePass(pass, hashPass) {

    const match = bcrypt.compareSync(pass, hashPass)

    return match
}







module.exports = {
    generatePass,
    comparePass
}
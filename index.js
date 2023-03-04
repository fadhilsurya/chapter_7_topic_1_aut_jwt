const express = require('express')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 3000
const router = require('./routes/routes')
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log(`running live and well at port ${port}`)
})
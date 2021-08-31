const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const port = process.env.PORT

app.use(morgan('dev'))
app.use(express.json())
app.use('/sendMail', require('./routes/sendMail'))

app.listen(port, () => {
    console.log(`app is live on ${port}`)
})
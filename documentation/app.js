const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/UnitTestCarrot'
const  authRouter = require('./routes/AuthRoutes')
// const cookiePraser = require('cookie-parser')

const app = express()
require('./models/User')

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


//middleware
// app.use(express.static('public'))
app.use(express.json())

// routes
app.use(authRouter)



app.listen(9000, () => {
    console.log('Server started')
})
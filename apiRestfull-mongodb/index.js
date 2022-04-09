// initi config
const express = require('express')  //imports
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// routes
const personRoutes = require('./routes/personRoute')

app.use('/person', personRoutes)

// endpoint initial
app.get('/', (req, res) => {

    res.json({ messaage: 'hello world' })

})

// port
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
    .connect(`your link data base `)   // conexão com database cloud
    .then(() => {
        console.log("Conexão feita com sucesso ao mongodb")
        app.listen(3000)
    })
    .catch(err => console.log(err))
//altere a senha e nome banco api
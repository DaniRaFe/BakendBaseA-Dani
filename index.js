require('dotenv').config()

const express = require('express')
const res = require('express/lib/response')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(process.env.PORT,() => {
    console.log("Backend en ejecucion en el puerto", process.env.PORT)
})
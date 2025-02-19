const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('./config')
const app = express()

app.get('/api', (req, res) => {

})
//connecting server to the database (MongoDB)
mongoose.connect(config.databaseURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => { console.log("Server started on Port: 5000") });
}).catch((error) => {
    console.log(error);
})
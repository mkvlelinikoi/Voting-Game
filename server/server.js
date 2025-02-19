const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const app = express()

//importing inner files
const config = require('./config')
const Joke = require('./models/jokeModel')

app.get('/api/fetch-jokes', async (req, res) => {
    try {
        //declaring amount of jokes
        const count = 30;

        const jokesToSave = [];

        //iterating and taking jokes
        for (let i = 0; i < count; i++) {
            const response = await axios.get('https://teehee.dev/api/joke');
            const joke = response.data;

            jokesToSave.push({ //pushing joke data
                id: i,
                question: joke.question,
                answer: joke.answer,
            });
        }

        //adding data to DB
        await Joke.insertMany(jokesToSave);

        res.status(200).json({ message: `${jokesToSave.length} jokes  saved to database` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//connecting server to the database (MongoDB)
mongoose.connect(config.databaseURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => { console.log("Server started on Port: 5000") });
}).catch((error) => {
    console.log(error);
})
const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const cors = require('cors')
const app = express()

//importing inner files
const config = require('./config')
const Joke = require('./models/jokeModel')

app.use(cors()); //cors is used to allow request from enywhere

app.get('/api/fetch-jokes', async (req, res) => {
    try {
        //declaring amount of jokes
        const count = 20;

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
});


//get random joke
app.get('/api/joke/random', async (req, res) => {
    try {
        //count jokes
        const count = await Joke.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: "No jokes were found" });
        }

        //creating a randome for index
        const random = Math.floor(Math.random() * count);
        //randomly chooses joke 
        const randomJoke = await Joke.findOne().skip(random);

        res.status(200).json(randomJoke)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//-----IMPLEMENT POST METHOD FOR VOTING

//connecting server to the database (MongoDB)
mongoose.connect(config.databaseURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => { console.log("Server started on Port: 5000") });
}).catch((error) => {
    console.log(error);
})
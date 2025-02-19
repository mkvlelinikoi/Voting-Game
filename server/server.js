const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Importing inner files
const config = require('./config');
const Joke = require('./models/jokeModel');

app.use(cors()); // CORS is used to allow requests from anywhere
app.use(express.json()); // Added to parse JSON bodies

// Fetch and save new jokes from API
app.get('/api/fetch-jokes', async (req, res) => {
    try {
        const count = 20;
        const jokesToSave = [];

        for (let i = 0; i < count; i++) {
            const response = await axios.get('https://teehee.dev/api/joke');
            const { question, answer } = response.data;

            jokesToSave.push({
                id: i,
                question,
                answer,
                votes: [
                    { smileValue: 0 },
                    { likeValue: 0 },
                    { loveValue: 0 }
                ],
            });
        }

        await Joke.insertMany(jokesToSave);
        res.status(200).json({ message: `${jokesToSave.length} jokes saved to database` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a random joke
app.get('/api/joke/random', async (req, res) => {
    try {
        const count = await Joke.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: "No jokes were found" });
        }

        const random = Math.floor(Math.random() * count);
        const randomJoke = await Joke.findOne().skip(random);

        res.status(200).json(randomJoke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Implement POST method for voting
app.post('/api/joke/:id/reaction', async (req, res) => {
    try {
        const { id } = req.params;
        const { reaction } = req.body;

        const joke = await Joke.findById(id);
        if (!joke) {
            return res.status(404).json({ error: 'Joke not found' });
        }

        //votes array
        if (!Array.isArray(joke.votes) || joke.votes.length !== 3) {
            joke.votes = [
                { smileValue: 0 },
                { likeValue: 0 },
                { loveValue: 0 }
            ];
        }

        // Update reactions
        if (reaction === 'smile') {
            joke.votes[0].smileValue += 1;
        } else if (reaction === 'like') {
            joke.votes[1].likeValue += 1;
        } else if (reaction === 'love') {
            joke.votes[2].loveValue += 1;
        } else {
            return res.status(400).json({ error: 'Invalid reaction type' });
        }

        await joke.save();
        res.status(200).json(joke);
    } catch (error) {
        console.error('Error adding reaction:', error);
        res.status(500).json({ error: 'An unexpected error occurred while adding the reaction' });
    }
});

//server connection
mongoose.connect(config.databaseURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => { console.log("Server started on Port: 5000") });
    })
    .catch((error) => {
        console.log(error);
    });
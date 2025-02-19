const mongoose = require('mongoose')

const jokeSchema = mongoose.Schema(
    {
        id: String,
        question: String,
        answer: String,
        votes: [
            {
                smileValue: Number,
            },
            {
                likeValue: Number,
            },
            {
                loveValue: Number,
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Joke = mongoose.model('jokes-db', jokeSchema);
module.exports = Joke;
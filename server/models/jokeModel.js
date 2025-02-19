const mongoose = require('mongoose')

const jokeSchema = mongoose.Schema(
    {
        id: Number,
        question: String,
        answer: String,
        votes: [
            {
                smileValue: { type: Number, default: 0 }
            },
            {
                likeValue: { type: Number, default: 0 }
            },
            {
                loveValue: { type: Number, default: 0 }
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Joke = mongoose.model('jokes-db', jokeSchema);
module.exports = Joke;
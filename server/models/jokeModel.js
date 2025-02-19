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
        defaults: {
            votes: [
                { smileValue: 0 },
                { likeValue: 0 },
                { loveValue: 0 }
            ]
        }
    }
)

const Joke = mongoose.model('jokes-db', jokeSchema);
module.exports = Joke;
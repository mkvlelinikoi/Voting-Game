import React, { useState, useEffect } from 'react'

function JokeComponent() {
    const [joke, setJoke] = useState({});
    const [jokeId, setJokeId] = useState(1);
    const [totalJokes, setTotalJokes] = useState(0)


    //functions that shows the joke with id
    function showId() {
        fetch(`http://localhost:5000/api/joke/random`).then(response => response.json())
            .then(data => {
                if (data) {//if data exists setJoke
                    setJoke(data);
                } else {
                    console.log("Joke not found");
                }
            }).catch(error => console.log(error));
    }



    useEffect(() => {
        if (jokeId > 0) {
            showId();
        }
    }, [jokeId]);




    return (
        <>
            <h1>{joke.question}</h1>
            <h1>{joke.answer}</h1>
            <button onClick={showId}>Next Joke</button>
        </>
    )
}

export default JokeComponent
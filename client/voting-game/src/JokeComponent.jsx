import React, { useState, useEffect } from 'react'

function JokeComponent() {
    const [joke, setJoke] = useState({});
    const [jokeId, setJokeId] = useState(1);
    const [smileReaction, setSmileReaction] = useState({});


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
    }, []);




    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <div className="joke_content">
                        <p>{joke.question}</p>
                        <p>{joke.answer}</p>
                    </div>
                    <div className="functional_content">
                        <div className="reaction_content">
                            <button className="reaction_button"><img className='icon' src="./src/assets/happy-face.png" alt="smile" /><p>{joke.votes?.[0]?.smileValue ?? 0}</p></button>
                            <button className="reaction_button"><img className='icon' src="./src/assets/like.png" alt="like" /><p>{joke.votes?.[1]?.likeValue ?? 0}</p></button>
                            <button className="reaction_button"><img className='icon ' src="./src/assets/heart.png" alt="love" /><p>{joke.votes?.[2]?.loveValue ?? 0}</p></button>
                        </div>
                        <button className='next_button' onClick={showId}>Next Joke</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JokeComponent
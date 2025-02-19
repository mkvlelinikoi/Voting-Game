import React, { useState, useEffect } from 'react';

function JokeComponent() {
    const [joke, setJoke] = useState({});
    const [smileReaction, setSmileReaction] = useState(0);
    const [likeReaction, setLikeReaction] = useState(0);
    const [loveReaction, setLoveReaction] = useState(0);

    // Function to fetch a random joke
    function showId() {
        fetch('http://localhost:5000/api/joke/random')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setJoke(data);
                    setSmileReaction(data.votes?.[0]?.smileValue ?? 0);
                    setLikeReaction(data.votes?.[1]?.likeValue ?? 0);
                    setLoveReaction(data.votes?.[2]?.loveValue ?? 0);
                } else {
                    console.log("Joke not found");
                }
            })
            .catch(error => console.log(error));
    }

    // Add reaction to joke
    function addReaction(reactionType) {
        if (!joke._id) {
            console.log("Joke ID is missing:", joke);
            return;
        }

        fetch(`http://localhost:5000/api/joke/${joke._id}/reaction`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reaction: reactionType })
        })
            .then(response => response.json())
            .then(data => {
                // Update based on reaction
                if (reactionType === 'smile') {
                    setSmileReaction(prev => prev + 1);
                } else if (reactionType === 'like') {
                    setLikeReaction(prev => prev + 1);
                } else if (reactionType === 'love') {
                    setLoveReaction(prev => prev + 1);
                }
            })
            .catch(error => {
                console.error(`Error adding ${reactionType} reaction:`, error.message);
                alert('Failed to add reaction. Please try again later.');
            });
    }

    useEffect(() => {
        showId();
    }, []);

    return (
        <div className="wrapper">
            <div className="container">
                <div className="joke_content">
                    <p>{joke.question}</p>
                    <p>{joke.answer}</p>
                </div>
                <div className="functional_content">
                    <div className="reaction_content">
                        <button className="reaction_button" onClick={() => addReaction('smile')}>
                            <img className="icon" src="./src/assets/happy-face.png" alt="smile" />
                            <p>{smileReaction}</p>
                        </button>
                        <button className="reaction_button" onClick={() => addReaction('like')}>
                            <img className="icon" src="./src/assets/like.png" alt="like" />
                            <p>{likeReaction}</p>
                        </button>
                        <button className="reaction_button" onClick={() => addReaction('love')}>
                            <img className="icon" src="./src/assets/heart.png" alt="love" />
                            <p>{loveReaction}</p>
                        </button>
                    </div>
                    <button className="next_button" onClick={showId}>Next Joke</button>
                </div>
            </div>
        </div>
    );
}

export default JokeComponent;
import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
      <>
        <div className="header">
         <img src="/images/logo-blue.png" alt="SayLess logo with smiling mouth"></img>
        </div>

        <h2 className="motto">The fun phrase game you will be itching to play!</h2>
        <h3 className="intro-premise">SayLess is a game where your opponent attempts to guess an entire phrase correctly using only a portion of the characters used in the original phrase.</h3>
        
        <h2 className="rules">Rules</h2>
          <h4>
           <ol>
            <li>Player One will select a phrase to use.</li>
            <li>Player One will then reduce the phrase by using only a portion of the characters used in the original phrase.</li>
            <li>Player One will then send the reduced phrase to Player Two to decipher.</li>
            <li>Player Two must guess the correct phrase in order to win.</li>
            <li>Players will earn points for each phrase that is solved correctly!</li>
           </ol>
          </h4>
          <video className="intro-demo" width="500px" height="400px" controls="controls">
              <source src="images/intro-vid.mp4" type="video/mp4" />
          </video>
          
          
          
              <Link to="/game">
                <button className="intro-button">Say Less! Let's Play!</button>
              </Link>
         

      </>

)};

export default Intro;
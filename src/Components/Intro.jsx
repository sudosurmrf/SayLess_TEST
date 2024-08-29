import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
      <>
        <div className="logo"><img src="images/logo.png"></img></div>

        <div className="header">
         <h1>SayLess</h1>
        </div>

        <h2 className="motto">The fun phrase game you will be itching to play!</h2>
        <h3 clssName="intro-premise">SayLess is a game where your opponent attempts to guess an entire phrase correctly using only a portion of the characters used in the original phrase.</h3>
        
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
          <input className="intro-demo" placeholder='Demo Vid'></input>
          
          
              <Link to="/game">
                <button className="intro-button">Say Less! Let's Play!</button>
              </Link>
         

      </>

)};

export default Intro;
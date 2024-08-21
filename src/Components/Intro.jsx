import React from 'react';

const Intro = () => {
    return (
      <>
      
        <div class="header">
         <h1>
          <span>SayLess</span>
  
          <span>SayLess</span>
          <span>SayLess</span>
         </h1>
        </div>

        <h2>The fun phrase game you will be itching to play!</h2>
        <h3>SayLess is a game where your opponent attempts to guess an entire phrase correctly by using only half of the characters used in the original phrase.</h3>
        <h4>
          <ol>
            <li>Player One will create or select a phrase to use.</li>
            <li>Player One will then reduce the phrase by using only half of the characters of the original phrase.</li>
            <li>Player One will then send the shortended phrase to Player Two to decipher.</li>
            <li>Player Two must guess the correct phrase in order to win!</li>
            <li>Players will earn points based on the amount of characters in the original phrase that was solved correctly!</li>
          </ol>
        </h4>
      </>

)};

export default Intro;
import React from 'react';

const Intro = () => {
    return (
      <>
        <h1>SayLess</h1>
        <h2>The fun phrase game yo wil e itchg to ply!</h2>
        <h3>SayLess is a game where your opponent attempts to guess an entire phrase correctly by using only half of the characters used in the original phrase.</h3>
        <h4>
          <ol>
            <div>Player One will create or select a phrase to use.</div>
            <div>Player One will then reduce the phrase by using only half of the characters of the original phrase.</div>
            <div>Player One will then send the shortended phrase to Player Two to decipher.</div>
            <div>Player Two must guess the correct phrase in order to win!</div>
            <div>Players will earn points based on the amount of characters in the original phrase that was solved correctly!</div>
          </ol>
        </h4>
      </>

)};

export default Intro;
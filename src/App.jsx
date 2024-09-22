import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav.jsx';
import Intro from './Components/Intro.jsx';
import Foot from './Components/Foot.jsx';
import Game from './Components/Game.jsx';
import Account from './Components/Account.jsx';
import Login from './Components/Login.jsx';


function App() {
  const [loginMessage, setLoginMessage] = useState(``);

  return (
    <>
      <Router>
       <Nav />
       <Routes>
          <Route path="/login" element={ <Login loginMessage={loginMessage} setLoginMessage={setLoginMessage} /> } />
          <Route path="/account" element={ <Account setLoginMessage={setLoginMessage} /> } />
          <Route path="/" element={ <Intro /> } />
          <Route path="/game" element={ <Game /> } />
        </Routes>  
        <Foot />
      </Router>
    </>
  )
}

export default App

import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [token, setToken] = useState(null)

  useEffect(()=> {
    const fetchToken = () => {
      const token = localStorage.getItem('token');
        if (token) {
          setToken(token)};
        };

		fetchToken();
  },[token])

  const logOut = () => {
    setToken(null);
		localStorage.removeItem('token');
  }; 

  return (
    <>
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          {/* <img src={homeImage} alt="Home Image" /> */}
        </a>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>

          <li><a href="/game">Let's Play!</a></li>

          {
            token?
							<>
            		<li><a href="/account">My Account</a></li>
								<button onClick={logOut}>Log Out</button>
							</>
            	:
              <li><a href="/login">Login</a></li>
          }
      	</ul>
    	</nav>
  	</>
	);
}

export default Nav

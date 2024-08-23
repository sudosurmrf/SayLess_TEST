import React from 'react';

const Nav = () => {
    return (
        <>
         <nav className="navbar">
            <a href="/" className="navbar-brand">
              {/* <img src={homeImage} alt="Home Image" /> */}
            </a>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/game">Let's Play!</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/account">My Account</a></li>
            </ul>
         </nav>
        </>
    );
}

export default Nav

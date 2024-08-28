import React, { useState, useEffect } from 'react';

const Nav = () => {
    const [token, setToken] = useState(null)

    useEffect(()=> {
        const jsontoken = localStorage.getItem('token');
        setToken(jsontoken);
    },[token])

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
                <li><a href="/account">My Account</a></li>
                :
                <li><a href="/login">Login</a></li>
                }
            </ul>
         </nav>
        </>
    );
}

export default Nav

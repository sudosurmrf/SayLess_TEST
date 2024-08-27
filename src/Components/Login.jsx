import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const navigate = useNavigate();

    const register = async(event) => {
        event.preventDefault();
        const response = await fetch('https://.com/api/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                email: emailInput,
                password: passwordInput
            })
        });
        
        const json = await response.json();
        setUsernameInput("");
        setEmailInput("");
        setPasswordInput("");
    }
    
    const login = async(event) => {
        event.preventDefault();
        const response = await fetch('https://.com/api/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });
        const json = await response.json();
        console.log(json.access_token);
        navigate('/')
        
    }

    return (
    <>
      <div className="header">
         <h1>SayLess</h1>
        </div>

      <h2>Sign in Below</h2>
      <form className="login">
        {
          //add username for register and login
            showLogin ? 
             null :
             <>
              <input className="login" value={emailInput} onChange={(event) => { setEmailInput(event.target.value) }} type="email" placeholder="email"/>
             </>
        }
        <input className="login" value={usernameInput} onChange={(event) => { setUsernameInput(event.target.value)}} placeholder="username" />
        <input className="login" value={passwordInput} onChange={(event) => { setPasswordInput(event.target.value) }} type="password" placeholder="password"/>
        </form>

        {
            showLogin ? <button>Log In</button> : <button onClick={register}>Register</button>
        }
        
        {
            showLogin ?
                <p>Not a Member? Say Less! <button onClick={() => { setShowLogin(false) }}>Register now!</button></p>:
                <p>Already a Member? <button onClick={() => { setShowLogin(true) }}>Log In</button> here!</p>
            }
        </>
    );
}

export default Login;

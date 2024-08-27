import React from 'react';

const Login = () => {
    return (
        <>
          <form>
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
        {
            showLogin ? <button>Log In</button> : <button onClick={register}>Register</button>
        }
        </form>
        {
            showLogin ?
                <p>Not a Member? Say Less! <button onClick={() => { setShowLogin(false) }}>Register now!</button></p>:
                <p>Already a Member? <button onClick={() => { setShowLogin(true) }}>Log In</button> here!</p>
            }
        </>
    );
}

export default Login;
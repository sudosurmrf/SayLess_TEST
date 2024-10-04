import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ loginMessage, setLoginMessage }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const [registrationFailMessage, setRegistrationFailMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [secondaryPasswordInput, setSecondaryPasswordInput] = useState("");

  const navigate = useNavigate();

  const logInUser = async () => {
    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        username: usernameInput,
        password: passwordInput,
      });
      console.log(`log in response`, response);   
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        navigate('/account')
      } else {
        console.log(`Login failed:`, response.data.message);
      }
    } catch (error) {
      console.log(error);
    };
  };

  const registerUser = async () => {
    if (passwordInput === secondaryPasswordInput) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
          username: usernameInput,
          password: passwordInput,
          email: emailInput,
        });
          setShowLogin(true);
          setRegistrationSuccessful(true);
          setRegistrationFailMessage('');
        } catch (error) {
          setRegistrationSuccessful(false);
          setRegistrationFailMessage(error.response.data.error);
      }
  
        setUsernameInput("");
        setEmailInput("");
        setPasswordInput("");
        setSecondaryPasswordInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      logInUser();
    } else {
      registerUser();
    }
  }

  const switchForms = () => {
    setShowLogin(!showLogin);
    setLoginMessage('');
    setRegistrationFailMessage('');
  };

    return (
        
        <div className="login-container">
          <h1>{showLogin ? 'Login Page' : 'Register Page'}</h1>
          {loginMessage === `Either username or password do not match our records.` ? <h3>{loginMessage}</h3>:null}
          {registrationFailMessage ? <h3>{registrationFailMessage}</h3>:null}
          {registrationSuccessful ? <h3>Account created! You can log in now.</h3>:null}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="login-input">
            <input value={usernameInput} onChange={(event) => setUsernameInput(event.target.value)} type="text" placeholder="username" required /> <br />
            <input value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)} type="password" placeholder="password" required /> <br /></div>
            
          {!showLogin && ( 
            <>
              <input value={secondaryPasswordInput} onChange={(event) => setSecondaryPasswordInput(event.target.value)} type="password" placeholder="Confirm password" required /> 
              <input value={emailInput} onChange={(event) => setEmailInput(event.target.value)} type="email" placeholder="email" required />
            </>
          )}
          {showLogin ? (
            <>
              <button type="submit" className="switch-link">Log In</button>
              <br /> 
              <button type="button" className="switch-link" onClick={switchForms}>Not a User? Sign up HERE</button>
            </>
          ) : (
            <>
              <button type="submit" className="switch-link">Sign up</button>
              <br /> 
              <button type="button" className="switch-link" onClick={switchForms}>Already a User? Login</button>
            </>
          )}
          </form>
        </div>
        
  );
};


export default Login;

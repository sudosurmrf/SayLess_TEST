import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const UpdateUserDetails = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [emailInput, setEmailInput]= useState('');
  const [passwordInput, setPasswordInput]= useState('');
  const [secondaryPasswordInput, setSecondaryPasswordInput]= useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/userdetails`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();        
        setCurrentEmail(data.userInfo.email);
      } catch (error) {
        console.error('Failed to fetch user email:', error);
        navigate('/Login'); 
      }
    };

    fetchUserEmail();
  }, [navigate]);

  const onEmailUpdate = (status) => {
    setEmailUpdated(status);
    setTimeout(() => {
      setEmailUpdated(false);
    }, 3000);
  };

  const changeEmail = async(event) => {
    event.preventDefault();
      try{
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/change-email`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newEmail: emailInput }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data);
        }

        setCurrentEmail(data.updatedAndCensoredEmail);
        onEmailUpdate(true);
      } catch (error) {
        console.error('Error changing email:', error);
        onEmailUpdate(false);
      }
      setEmailInput(``);
    }

  const onPasswordUpdate = (status) => {
    setPasswordUpdated(status);
    setTimeout(() => {
      setPasswordUpdated(false);
    }, 3000);
  };
    
  const changePW = async(event) => {
    event.preventDefault();
    if(passwordInput === secondaryPasswordInput){
      try{
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/change-pw`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({newPassword: passwordInput}),
        });  
        
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data);
        }

        onPasswordUpdate(true);
      } catch (error) {
        console.error('Error changing password:', error);
        onPasswordUpdate(false);
      }
    } else {
      alert('Passwords do not match, Please try again!');
      onPasswordUpdate(false);
    }
    setPasswordInput(``);
    setSecondaryPasswordInput(``);
  }

  return (
    <div className="update-buttons">
      
      {showChangeEmail ?
        <>
          <h3>Your Current Email Is: {currentEmail}</h3>
          <form className="uud" onSubmit={(e) => changeEmail(e)}>
            <input type="email" value={emailInput} onChange={(event)=>{setEmailInput(event.target.value)}} placeholder='Enter New Email' required /> <br />
            <button type="submit">Change Email</button>
          </form> 
          {emailUpdated ? <h2>Email updated!</h2>: null}
          <button onClick={() => {setShowChangeEmail(false)}}>Maybe on second thought, my email is fine.</button>
        </>
      :
        <button onClick={() => {setShowChangeEmail(true)}}>Want to change your Email?</button>
      }

      {showChangePassword ?
        <>
          <form className="uud" onSubmit={(e) => changePW(e)}>
            <input type="password" value={passwordInput} onChange={(event)=>{setPasswordInput(event.target.value)}} placeholder='Enter New Password' required /> <br />
            <input type="password" value={secondaryPasswordInput} onChange={(event)=>{setSecondaryPasswordInput(event.target.value)}} placeholder='Confirm New Password' required /> <br />
            <button type="submit">Change Password</button>
          </form>
          {passwordUpdated ? <h2>Password updated!</h2>: null}
          <button onClick={() => {setShowChangePassword(false)}}>Maybe on second thought, my password is fine.</button>
        </>
      :
        <button onClick={() => {setShowChangePassword(true)}}>Want to change your Password?</button>
      }
    </div>
  )
}

export default UpdateUserDetails

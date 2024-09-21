import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUserDetails = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [emailInput, setEmailInput]= useState('');
  const [passwordInput, setPasswordInput]= useState('');
  const [secondaryPasswordInput, setSecondaryPasswordInput]= useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/userdetails`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCurrentEmail(response.data.userInfo.email);
      } catch (error) {
        console.error('Failed to fetch user email:', error);
        navigate('/Login'); 
      }
    };

    fetchUserEmail();
  }, [navigate]);

  const changeEmail = async(event) => {
    event.preventDefault();
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/change-email`, {newEmail: emailInput},
        config
        );
        console.log(response.data);
        setCurrentEmail(response.data.updatedAndCensoredEmail);
      }catch(err) {
        if (axios.isAxiosError(err)) {
          console.error('Axios error:', err.response?.data || err.message);
        } else {
          console.error('Unexpected error:', err);
        }
      }
      setEmailInput(``);
    }

  const changePW = async(event) => {
    if(passwordInput === secondaryPasswordInput){
      try{
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/change-pw`, {newPassword: passwordInput},
        config  
        );
        console.log(response.data);
      }catch(err) {
        if (axios.isAxiosError(err)) {
          console.error('Axios error:', err.response?.data || err.message);
        } else {
          console.error('Unexpected error:', err);
        }
      }
    } else{
      alert('Passwords do not match, Please try again!');
    }
  }

  return (
    <div className="update-buttons">
      
      {showChangeEmail ?
        <>
          <h3>Your Current Email Is: {currentEmail}</h3>
          <form className="uud">
            <input type="email" value={emailInput} onChange={(event)=>{setEmailInput(event.target.value)}} placeholder='Enter New Email' /> <br />
            <button onClick={(e) => {e.preventDefault(); changeEmail(e)}}>Change Email</button>
          </form> 
          <button onClick={() => {setShowChangeEmail(false)}}>Maybe on second thought, my email is fine.</button>
        </>
      :
        <button onClick={() => {setShowChangeEmail(true)}}>Want to change your Email?</button>
      }

      {showChangePassword ?
        <>
          <form className="uud">
            <input type="password" value={passwordInput} onChange={(event)=>{setPasswordInput(event.target.value)}} placeholder='"Enter New Password' /> <br />
            <input type="password" value={secondaryPasswordInput} onChange={(event)=>{setSecondaryPasswordInput(event.target.value)}} placeholder='"Enter New Password Again' /> <br />
            <button onClick={(e)=>{changePW(e)}}>Change Password</button>
          </form>
          <button onClick={() => {setShowChangePassword(false)}}>Maybe on second thought, my password is fine.</button>
        </>
      :
        <button onClick={() => {setShowChangePassword(true)}}>Want to change your Password?</button>
      }
    </div>
  )
}

export default UpdateUserDetails

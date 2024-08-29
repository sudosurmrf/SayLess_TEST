import { useState } from "react";
import axios from 'axios'

const UpdateUserDetails = () => {
  const [emailInput, setEmailInput]= useState('');
  const [passwordInput, setPasswordInput]= useState('');
  const [secondaryPasswordInput, setSecondaryPasswordInput]= useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
    
  const changeEmail = async(event) => {
    event.preventDefault();
      try{
        const response = await axios.patch('/api/v1/users/change-email', {email: emailInput});
        console.log(response);
      }catch(err) {
        if (axios.isAxiosError(err)) {
          console.error('Axios error:', err.response?.data || err.message);
        } else {
          console.error('Unexpected error:', err);
        }
      }
    }

  const changePW = async(event) => {
    event.preventDefault();
    if(passwordInput === secondaryPasswordInput){
      try{
        const response = await axios.patch('/api/v1/users/change-pw', {password: passwordInput});
        console.log(response);
      }catch(err) {
        console.log(err)
      }
    } else{
      alert('Passwords do not match, Please try again!');
    }
  }

  return (
    <div className="update-buttons">
      
      {showChangeEmail ?
        <>
          {/* This line will be implemented with token so the user knows their email. Should ask Jonathan about best practice regarding user account info <h3>Your Current Email is:</h3> */}
          <form className="uud">
          <input type="email" value={emailInput} onChange={(event)=>{setEmailInput(event.target.value)}} placeholder='"Enter New Email' /> <br />
          <button onClick={(e) => {e.preventDefault(); changeEmail(e)}}>Change Email</button>
          </form> 
        </>
      :
        <button onClick={() => {setShowChangeEmail(true)}}>Want to change your Email?</button>
      }

      {showChangePassword ?
        <form className="uud">
          <input type="password" value={passwordInput} onChange={(event)=>{setPasswordInput(event.target.value)}} placeholder='"Enter New Password' /> <br />
          <input type="password" value={secondaryPasswordInput} onChange={(event)=>{setSecondaryPasswordInput(event.target.value)}} placeholder='"Enter New Password Again' /> <br />
          <button onClick={()=>{changePW()}}>Change Password</button>
        </form>
      :
        <button onClick={() => {setShowChangePassword(true)}}>Want to change your Password?</button>
      }
    </div>
  )
}

export default UpdateUserDetails

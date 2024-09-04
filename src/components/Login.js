import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const login_url="http://localhost:9090/register/login"
const Login=()=>{
   const[mobileNumber,setMobileNumber]=useState('')
   const[pin,setPin]=useState('')
   const[message,setMessage]=useState('')
   const navigate=useNavigate();
   const handleLogin=(e)=>{
    e.preventDefault();
    const loginuser={
        mobileNumber:mobileNumber,
        pin:pin
    }
    axios.post(login_url,loginuser)
    .then(response => {
        console.log("Server Response:", response);
        if (response.status === 200 && response.data && response.data.mobileNumber) {
            setMessage("Login Successful");
            setMobileNumber('');
            setPin('')
        } else {
            setMessage("Invalid mobileNumber or pin");
        }
    })
    .catch(error => {
        console.error("Failed to Login", error);
        setMessage("Login Failed. Please check your pin or mobileNumber.");
    });
};
   return(
       <div>
        <h2> LOGIN </h2>
        <div>
        <form onSubmit={handleLogin}>
        <div>
        <label>mobileNumber</label>
        <input type="text" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}></input>
       </div>
       <div>
        <label> Pin</label>
        <input type="text" value={pin} onChange={(e)=>setPin(e.target.value)}></input>
       </div>
       <button type="submit" >Login</button>
        </form>
        </div>
        {message && <p>{message}</p>}
        </div>
   )
}
export default Login;
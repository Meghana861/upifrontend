import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const register_url="http://localhost:9090/register"
const Register=()=>{
  const[firstname,setFirstName]=useState('')
  const[lastname,setLastName]=useState('')
  const[email,setEmail]=useState('')
  const[mobileNumber,setMobileNumber]=useState('')
  const[pin,setPin]=useState('')
  const[message,setMessage]=useState('')
  const navigate = useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault()
    const newuser={
      firstname:firstname,
      lastname:lastname,
      email:email,
      mobileNumber:mobileNumber,
      pin:pin
     }
    axios.post(register_url,newuser)
    .then(response=>{
      setMessage("Registered Successfully");
       setFirstName('')
       setLastName('')
       setEmail('')
       setMobileNumber('')
       setPin('')
      navigate('/login')
    }
    )
   
  .catch(error=>{
    console.error('There was an error adding the user!', error);
        setMessage('Failed to add user');
  })
    }
  return(
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
       <div>
        <label>First Name</label>
        <input type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)}></input>
       </div>
       <div>
        <label>Last Name</label>
        <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)}></input>
       </div>
       <div>
        <label>Email</label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
       </div>
       <div>
        <label>mobileNumber</label>
        <input type="text" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}></input>
       </div>
       <div>
        <label> Pin</label>
        <input type="text" value={pin} onChange={(e)=>setPin(e.target.value)}></input>
       </div>
       <button type="submit" >Register</button>
       {message && <p>{message}</p>}
      </form>
    </div>
  )
}
export default Register;
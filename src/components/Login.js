import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const login_url = "http://localhost:8080/register/login";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobileNumber || !pin) {
      setMessage('Both fields are required');
      return;
    }
    const loginuser={
        mobileNumber:mobileNumber,
        pin:pin
    }

    axios.post(login_url,loginuser)
    .then(response => {
        console.log("Server Response:", response);
        if (response.status === 200 && response.data ) {
            setMessage("Login Successful");
            setMobileNumber('');
            setPin('');
            navigate('/home',{state:{firstname:response.data.firstName,id:response.data.id}});
        } else {
            setMessage("Invalid credentials");
        }
    })
    .catch(error => {
        console.error("Failed to Login", error);
        setMessage("Login Failed. Please check your credentials.");
    });
};

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Mobile Number</label>
          <input 
            type="text" 
            value={mobileNumber} 
            onChange={(e) => setMobileNumber(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Pin</label>
          <input 
            type="password" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;

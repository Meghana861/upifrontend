import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const register_url = "http://localhost:8080/register";

const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!firstname || !lastname || !email || !mobileNumber || !pin) {
      setMessage('All fields are required');
      return;
    }
    if (mobileNumber.length !== 10) {
      setMessage('Mobile number must be 10 digits');
      return;
    }
    if (pin.length !== 6) {
      setMessage('Pin must be 6 digits');
      return;
    }

    const newUser = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      mobileNumber: mobileNumber,
      pin: pin
    };

    console.log('Sending user data:', newUser); // Log data being sent

    axios.post(register_url, newUser)
      .then(response => {
        setMessage("Registered Successfully");
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobileNumber('');
        setPin('');
        navigate('/login');
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
        setMessage('Failed to add user');
      });
  };

  return (
    <div className="register-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Pin</label>
          <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} />
        </div>
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
      </form>
      <div className="redirect-link">
        <p>Already Registered? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;

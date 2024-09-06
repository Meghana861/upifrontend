import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';

// Base URL for the backend API
const userDetailsUrl = "http://localhost:8080/register"; 

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.id; // Get userId from passed state

  // State to hold user data
  const [userData, setUserData] = useState({
    firstName: '',  // Ensure the correct keys are used for the backend
    lastName: '',
    email: '',
    mobileNumber: '',
    pin: ''
  });

  const [isEditing, setIsEditing] = useState(false);  // Control edit mode
  const [message, setMessage] = useState('');         // Message for feedback

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${userDetailsUrl}/${userId}`);
        const user = response.data;
        
        // Ensure correct mapping from backend response
        setUserData({
          firstName: user.firstName,   
          lastName: user.lastName,    
          email: user.email,
          mobileNumber: user.mobileNumber,
          pin: user.pin
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user details.');
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle saving the updated user data
  const handleSave = async () => {
    console.log('Payload before saving:', userData);  // Log the data to be sent

    try {
      // Send a PUT request to update the user data
      await axios.put(`${userDetailsUrl}/${userId}`, userData);
      setMessage('Profile updated successfully!');
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Your Profile</h1>

      {!isEditing && (
        <button className="edit-button" type="button" onClick={handleEdit}>
          Edit Profile
        </button>
      )}

      {message && <p className="message">{message}</p>}

      <form className="edit-profile-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName} // Ensure correct mapping
            onChange={handleChange}
            readOnly={!isEditing} // Read-only when not editing
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}  // Ensure correct mapping
            onChange={handleChange}
            readOnly={!isEditing} // Read-only when not editing
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}  // Ensure correct mapping
            onChange={handleChange}
            readOnly={!isEditing} // Read-only when not editing
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={userData.mobileNumber}  // Ensure correct mapping
            onChange={handleChange}
            readOnly={!isEditing} // Read-only when not editing
          />
        </div>
        <div className="form-group">
          <label>Pin</label>
          <input
            type="password"
            name="pin"
            value={userData.pin}  // Ensure correct mapping
            onChange={handleChange}
            readOnly={!isEditing} // Read-only when not editing
          />
        </div>

        {isEditing && (
          <>
            <button type="button" onClick={handleSave}>Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditProfile;

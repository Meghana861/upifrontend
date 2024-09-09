import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfile.css';
import { UserContext } from './UserContext'; 

// Base URL for the backend API
const userDetailsUrl = "http://localhost:8080/register"; 

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);  // Get user from context

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
      if (user && user.id) {  // Ensure user is defined before making the request
        try {
          const response = await axios.get(`${userDetailsUrl}/${user.id}`);
          const userDataFromApi = response.data;
          
          // Ensure correct mapping from backend response
          setUserData({
            firstName: userDataFromApi.firstName,   
            lastName: userDataFromApi.lastName,    
            email: userDataFromApi.email,
            mobileNumber: userDataFromApi.mobileNumber,
            pin: userDataFromApi.pin
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setMessage('Failed to load user details.');
        }
      } else {
        setMessage('User not found or not logged in.');
      }
    };

    fetchUserData();
  }, [user]);

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
      await axios.put(`${userDetailsUrl}/${user.id}`, userData);
      setMessage('Profile updated successfully!');
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage('Failed to update profile.');
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

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
            value={userData.firstName}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={userData.mobileNumber}
            onChange={handleChange}
            readOnly={!isEditing}
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

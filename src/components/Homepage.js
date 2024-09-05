import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstname = location.state?.firstname;
  const id = location.state?.id;

  const handleEditProfile = () => {
    navigate('/edit-profile', {
      state: { firstname, id }
    });
  };

  const handleChangePin = () => {
    navigate('/change-pin', {
      state: { firstname, id }
    });
  };

  const handleAccountCreation = () => {
    navigate('/accountcreate', {
      state: { firstname, id }
    });
  };

  const handleMoneyTransfer = () => {
    navigate('/money-transfer', {
      state: { firstname, id }
    });
  };

  const handleViewAccounts = () => {
    navigate('/view-accounts', {
      state: { firstname, id }
    });
  };

  return (
    <div className="homepage-container">
      <h1>Welcome, {firstname}</h1>
      <h2>Your Id is {id}</h2>
      <button className="homepage-button" onClick={handleEditProfile}>Edit Your Profile</button>
      <button className="homepage-button" onClick={handleChangePin}>Change Login Pin</button>
      <button className="homepage-button" onClick={handleAccountCreation}>Account Creation</button>
      <button className="homepage-button" onClick={handleMoneyTransfer}>Money Transfer</button>
      <button className="homepage-button" onClick={handleViewAccounts}>View Bank Accounts & Check Balance</button>
    </div>
  );
};

export default Homepage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './HomePage.css';
const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstname = location.state?.firstname;
  const id = location.state?.id;
  const mobileNumber=location.state?.mobileNumber;
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
      state: { firstname, id, mobileNumber }
    });
  };

  const handleViewAccounts = () => {
    navigate('/view-accounts', {
      state: { firstname, id }
    });
  };

  const handleViewTransactions = () => {
    navigate('/view-transactions', {
      state: { firstname, id , mobileNumber}
    });
  };

  const handleChangeUpiPin = () => {
    navigate('/change-upi-pin', {
      state: { firstname, id , mobileNumber}
    });
  };

  return (
    <div className="homepage-container">
      <h1>Welcome, {firstname}</h1>
      <h2>Your Id is {id}</h2>
      <button className="homepage-button" onClick={handleEditProfile}>Edit Your Profile</button>
      {/* <button className="homepage-button" onClick={handleChangePin}>Change Login Pin</button> */}
      <button className="homepage-button" onClick={handleAccountCreation}>Account Creation</button>
      <button className="homepage-button" onClick={handleMoneyTransfer}>Money Transfer</button>
      <button className="homepage-button" onClick={handleViewAccounts}>View Bank Accounts & Check Balance</button>
      <button className="homepage-button" onClick={handleViewTransactions}>View All Your Transactions</button>
      <button className="homepage-button" onClick={handleChangeUpiPin}>Change UPI Pin</button>

    </div>
  );
};

export default Homepage;

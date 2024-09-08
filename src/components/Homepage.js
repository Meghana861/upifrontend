import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { UserContext } from './UserContext'; 

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Use context

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleAccountCreation = () => {
    navigate('/accountcreate');
  };

  const handleMoneyTransfer = () => {
    navigate('/money-transfer');
  };

  const handleViewAccounts = () => {
    navigate('/view-accounts');
  };

  const handleViewTransactions = () => {
    navigate('/view-transactions');
  };

  const handleChangeUpiPin = () => {
    navigate('/change-upi-pin');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage-container">
      <h1>Welcome, {user.firstname}</h1>
      <h2>Your Id is {user.id}</h2>
      <button className="homepage-button" onClick={handleEditProfile}>Edit Your Profile</button>
      <button className="homepage-button" onClick={handleAccountCreation}>Account Creation</button>
      <button className="homepage-button" onClick={handleMoneyTransfer}>Money Transfer</button>
      <button className="homepage-button" onClick={handleViewAccounts}>View Bank Accounts & Check Balance</button>
      <button className="homepage-button" onClick={handleViewTransactions}>View All Your Transactions</button>
      <button className="homepage-button" onClick={handleChangeUpiPin}>Change UPI Pin</button>
    </div>
  );
};

export default Homepage;

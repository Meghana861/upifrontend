import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { UserContext } from './UserContext'; 

const Homepage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/login'); 
  };

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

  const handleChangeTransactionLimit = () => {
    navigate('/transaction-limit'); 
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="navbar-left">
          <h1 className="bank-name">BankingApp</h1>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="homepage-content">
        <h1>Welcome, {user.firstname}</h1>
        <h2>Your Id is {user.id}</h2>
        <div className="button-container">
          <button className="homepage-button" onClick={handleEditProfile}>Edit Your Profile</button>
          <button className="homepage-button" onClick={handleAccountCreation}>Account Creation</button>
          <button className="homepage-button" onClick={handleMoneyTransfer}>Money Transfer</button>
          <button className="homepage-button" onClick={handleViewAccounts}>View Bank Accounts & Check Balance</button>
          <button className="homepage-button" onClick={handleViewTransactions}>View All Your Transactions</button>
          <button className="homepage-button" onClick={handleChangeUpiPin}>Change UPI Pin</button>
          <button className="homepage-button" onClick={handleChangeTransactionLimit}>Change Transaction Limit</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

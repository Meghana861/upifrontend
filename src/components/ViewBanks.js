import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewBank = () => {
  const location = useLocation();
  const firstname = location.state?.firstname;
  const userId = location.state?.id;
  
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');
  const [balances, setBalances] = useState({}); // State to hold balance info for each account

  // Fetch the user's bank accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/account/${userId}`);
        console.log(response);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setMessage('Failed to fetch accounts. Please try again later.');
      }
    };
    fetchAccounts();
  }, [userId]);

  // Function to check the balance of a specific account
  const checkBalance = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/account/accountId/${id}`);
      setBalances(prevBalances => ({
        ...prevBalances,
        [id]: `Balance for account ${id}: ${response.data.balance}`
      }));
    } catch (error) {
      console.error('Error checking balance:', error);
      setMessage('Failed to check balance. Please try again later.');
    }
  };

  return (
    <div className="accounts-container">
      <h1>{firstname}'s Bank Accounts</h1>
      {message && <p className="message">{message}</p>}
      
      {accounts.length > 0 ? (
        <div className="accounts-list">
          {accounts.map((account, index) => (
            <div key={index} className="account-box">
              <h3>Bank: {account.bankName}</h3>
              <p>Account Number: {account.accountNumber}</p>
              <p>Transaction Limit: {account.transactionLimit}</p>
              <p>Balance: {account.balance}</p>
              <button
                onClick={() => checkBalance(account.id)}
                style={{
                  fontSize: '12px',
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Check Balance
              </button>
              {/* Display balance below the button for the specific account */}
              {balances[account.id] && (
                <p style={{ marginTop: '10px', color: '#333' }}>{balances[account.id]}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No bank accounts found.</p>
      )}
    </div>
  );
};

export default ViewBank;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './ChangeTransactionLimit.css';
import { UserContext } from './UserContext';
// import './MoneyTransfer.css';

const ChangeTransactionLimit = () => {
  const { user } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newLimit, setNewLimit] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/account/${user.id}`);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setMessage('Failed to fetch accounts. Please try again later.');
      }
    };

    fetchAccounts();
  }, [user.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newLimit || !upiPin || !selectedAccount) {
      setMessage('Please fill in all required fields.');
      return;
    }
  
    try {
      // Fetch the current account details
      const accountResponse = await axios.get(`http://localhost:8080/account/accountId/${selectedAccount.id}`);
      const account = accountResponse.data;
  
      // Check UPI PIN
      if (upiPin !== account.upiPin) {
        setMessage('UPI PIN is incorrect. Please try again.');
        return;
      }
  
      // Prepare the payload
      const payload = {
        bankName: account.bankName,
        accountNumber: account.accountNumber,
        upiPin: account.upiPin,
        balance: account.balance, // Assuming balance remains the same
        transactionLimit: parseFloat(newLimit)
      };
  
      // Print the payload to console
      console.log('Payload:', payload);
  
      // Send the request to update the transaction limit
      const updateResponse = await axios.put(`http://localhost:8080/account/${selectedAccount.id}`, payload);
  
      if (updateResponse.status === 200) {
        // Update local state to reflect the new transaction limit
        setAccounts(prevAccounts => prevAccounts.map(acc => 
          acc.id === selectedAccount.id ? { ...acc, transactionLimit: parseFloat(newLimit) } : acc
        ));
        setMessage('Transaction limit updated successfully!');
        setSelectedAccount(null);
        setNewLimit('');
        setUpiPin('');
      } else {
        setMessage('Failed to update transaction limit.');
      }
    } catch (error) {
      console.error('Error updating transaction limit:', error);
      setMessage('Failed to update transaction limit. Please try again.');
    }
  };
  
  

  return (
    <div className="change-limit-container">
      <h1>Change Transaction Limit</h1>
      {message && <p className="message">{message}</p>}

      <div className="accounts-list">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <div
              key={account.id}
              className={`account-box ${selectedAccount?.id === account.id ? 'selected' : ''}`}
              onClick={() => setSelectedAccount(account)}
            >
              <h3>Bank: {account.bankName}</h3>
              <p>Account Number: {account.accountNumber}</p>
              <p>Current Transaction Limit: {account.transactionLimit}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {selectedAccount && (
        <form onSubmit={handleSubmit} className="change-limit-form">
          <div className="form-group">
            <label htmlFor="newLimit">New Transaction Limit:</label>
            <input
              type="number"
              id="newLimit"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="upiPin">UPI PIN:</label>
            <input
              type="password"
              id="upiPin"
              value={upiPin}
              onChange={(e) => setUpiPin(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Change Transaction Limit</button>
        </form>
      )}
    </div>
  );
};

export default ChangeTransactionLimit;

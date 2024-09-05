import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const TransferMoney = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [recipientMobile, setRecipientMobile] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [message, setMessage] = useState('');
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const location = useLocation();
  const firstname = location.state?.firstname;
  const userId = location.state?.id;
  // Fetch all user's accounts
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/account/${userId}`); // Adjust the endpoint if needed
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setMessage('Failed to fetch accounts. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!recipientMobile || !transferAmount || !selectedAccount) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setShowPinPrompt(true);
  };

  const handlePinSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/transfer', {
        fromAccount: selectedAccount.id,
        toMobile: recipientMobile,
        amount: transferAmount,
        upiPin
      });

      setMessage('Transfer successful!');
      setShowPinPrompt(false); // Hide PIN prompt after successful transfer
    } catch (error) {
      console.error('Error during transfer:', error);
      setMessage('Failed to complete transfer. Please check your UPI PIN and try again.');
    }
  };

  return (
    <div className="transfer">
      <h1>Money Transfer</h1>
      {message && <p className="message">{message}</p>}

      {!showPinPrompt ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="recipientMobile">Recipient Mobile No:</label>
            <input
              type="text"
              id="recipientMobile"
              value={recipientMobile}
              onChange={(e) => setRecipientMobile(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="transferAmount">Amount:</label>
            <input
              type="number"
              id="transferAmount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              required
              min="0.01" // Prevent zero or negative amounts
            />
          </div>

          <div className="accounts-list">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <div
                  key={account.id}
                  className="account-box"
                  onClick={() => setSelectedAccount(account)}
                  style={{
                    border: `2px solid ${selectedAccount?.id === account.id ? '#007bff' : '#ccc'}`,
                    padding: '10px',
                    marginBottom: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <h3>Bank: {account.bankName}</h3>
                  <p>Account Number: {account.accountNumber}</p>
                  <p>Transaction Limit: {account.transactionLimit}</p>
                  <p>Balance: {account.balance}</p>
                </div>
              ))
            ) : (
              <p>No bank accounts found.</p>
            )}
          </div>

          <button type="submit" disabled={!selectedAccount}>
            Submit Transfer
          </button>
        </form>
      ) : (
        <div className="pin-prompt">
          <h2>Enter UPI PIN</h2>
          <input
            type="password"
            value={upiPin}
            onChange={(e) => setUpiPin(e.target.value)}
            placeholder="UPI PIN"
            required
          />
          <button onClick={handlePinSubmit}>Verify PIN</button>
        </div>
      )}
    </div>
  );
};

export default TransferMoney;

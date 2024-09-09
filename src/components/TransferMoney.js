import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './MoneyTransfer.css';
import { UserContext } from './UserContext'; 


const TransferMoney = () => {
  // const location = useLocation();
  // const userId = location.state?.id;
  const { user } = useContext(UserContext); 

  const senderMobileNumber = user.mobileNumber; 

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [recipientMobile, setRecipientMobile] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [message, setMessage] = useState('');
  const [showPinPrompt, setShowPinPrompt] = useState(false);

  
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/account/${user.id}`);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setMessage('Failed to fetch accounts. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user.id]);

  
  const fetchSelectedAccountDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/account/accountId/${id}`);
      setSelectedAccount(response.data);
    } catch (error) {
      console.error('Error fetching account details:', error);
      setMessage('Failed to fetch account details.');
    }
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!recipientMobile || !transferAmount || !selectedAccount) {
      setMessage('Please fill in all required fields.');
      return;
    }
    if (parseFloat(transferAmount) > selectedAccount.transactionLimit) {
      setMessage(`Transfer amount exceeds the transaction limit of ${selectedAccount.transactionLimit}.`);
      return;
    }
    setShowPinPrompt(true);
  };

  
  const handlePinSubmit = async () => {
    if (upiPin !== selectedAccount.upiPin) {
      setMessage('UPI PIN is incorrect. Please try again.');
      return;
    }
  
    
    const payload = {
      senderMobileNumber,
      receiverMobileNumber: recipientMobile,
      amount: parseFloat(transferAmount),
      upiPin
    };
  
    console.log('Transfer Payload:', payload);
  
    try {
     
      const transferResponse = await axios.post('http://localhost:8080/transfer', payload);
      console.log('TransferResponse:', transferResponse);
  
      
      if (transferResponse.status === 200) {
        setMessage('Transfer successful!');
      } else {
        setMessage('Transfer failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during transfer:', error);
      setMessage('Failed to complete transfer. Please try again.');
    } finally {
      setShowPinPrompt(false); 
    }
  };
  

  return (
    <div className="transfer-container">
      <h1>Money Transfer</h1>
      {message && <p className="message">{message}</p>}

      {!showPinPrompt ? (
        <form onSubmit={handleSubmit} className="transfer-form">
          <div className="form-group">
            <label htmlFor="recipientMobile">Recipient Mobile No:</label>
            <input
              type="text"
              id="recipientMobile"
              value={recipientMobile}
              onChange={(e) => setRecipientMobile(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="transferAmount">Amount:</label>
            <input
              type="number"
              id="transferAmount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              required
            />
          </div>

          <div className="accounts-list">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <div
                  key={account.id}
                  className={`account-box ${selectedAccount?.id === account.id ? 'selected' : ''}`}
                  onClick={() => fetchSelectedAccountDetails(account.id)}
                >
                  <h3>Bank: {account.bankName}</h3>
                  <p>Account Number: {account.accountNumber}</p>
                  <p>Transaction Limit: {account.transactionLimit}</p>
                  <p>Balance: {account.balance}</p>
                </div>
              ))
            ) : (
              <p>Loading....</p>
            )}
          </div>

          <button type="submit" className="submit-button" disabled={!selectedAccount}>
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
          <button onClick={handlePinSubmit} className="verify-pin-button">Verify PIN</button>
        </div>
      )}
    </div>
  );
};

export default TransferMoney;

 

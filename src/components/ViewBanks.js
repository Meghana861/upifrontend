import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ViewBank.css';
import { UserContext } from './UserContext';

const ViewBank = () => {
  const { user } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState('');
  const [balances, setBalances] = useState({});
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [upiPin, setUpiPin] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedAccountUpiPin, setSelectedAccountUpiPin] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/account/${user.id}`);
        setAccounts(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setMessage('Failed to fetch accounts. Please try again later.');
        setLoading(false); // Set loading to false on error as well
      }
    };
    fetchAccounts();
  }, [user.id]);

  const promptForUpi = (id, upiPin) => {
    setSelectedAccountId(id);
    setSelectedAccountUpiPin(upiPin);
    setShowPinPrompt(true);
  };

  const handlePinSubmit = async () => {
    if (upiPin !== selectedAccountUpiPin) {
      setMessage('UPI PIN is incorrect. Please try again.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/account/accountId/${selectedAccountId}`);
      setBalances((prevBalances) => ({
        ...prevBalances,
        [selectedAccountId]: `Balance for account ${selectedAccountId}: ${response.data.balance}`,
      }));
      setMessage('');
    } catch (error) {
      console.error('Error checking balance:', error);
      setMessage('Failed to check balance. Please try again later.');
    } finally {
      setShowPinPrompt(false);
    }
  };

  return (
    <div className="accounts-container">
      <h1 className="header">{user.firstname}'s Bank Accounts</h1>
      {message && <p className="message">{message}</p>}

      {!showPinPrompt ? (
        loading ? (
          <p>Loading...</p>
        ) : accounts.length > 0 ? (
          <div className="accounts-list">
            {accounts.map((account) => (
              <div key={account.id} className="account-box">
                <h3 className="account-bank-name">{account.bankName}</h3>
                <p className="account-detail">Account Number: {account.accountNumber}</p>
                <p className="account-detail">Transaction Limit: {account.transactionLimit}</p>

                <button
                  onClick={() => promptForUpi(account.id, account.upiPin)}
                  className="check-balance-button"
                >
                  Check Balance
                </button>

                
                {balances[account.id] && (
                  <p className="account-balance">{`Balance: ${balances[account.id]}`}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-accounts">No Accounts Found for {user.firstname}</p>
        )
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
          <button onClick={handlePinSubmit} className="verify-pin-button">
            Verify PIN
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewBank;

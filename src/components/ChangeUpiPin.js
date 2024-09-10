import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const ChangeUpiPin = () => {
  const { user } = useContext(UserContext);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [oldUpiPin, setOldUpiPin] = useState('');
  const [newUpiPin, setNewUpiPin] = useState('');
  const [reEnterNewUpiPin, setReEnterNewUpiPin] = useState('');
  const [message, setMessage] = useState('');
  const [showPinFields, setShowPinFields] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user bank accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/account/${user.id}`);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setMessage('Failed to fetch accounts. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };
    fetchAccounts();
  }, [user.id]);

  // Verify old UPI PIN and show the fields for entering the new PIN
  const verifyOldPin = async (accountId) => {
    try {
      const response = await axios.get(`http://localhost:8080/account/accountId/${accountId}`);
      const account = response.data;
      if (oldUpiPin === account.upiPin) {
        setSelectedAccount(account);
        setShowPinFields(true);
        setMessage('');
      } else {
        setMessage('Old UPI PIN is incorrect.');
      }
    } catch (error) {
      console.error('Error verifying old UPI PIN:', error);
      setMessage('Failed to verify old UPI PIN. Please try again.');
    }
  };

  // Handle UPI PIN change
  const handleChangePin = async () => {
    if (newUpiPin !== reEnterNewUpiPin) {
      setMessage('New UPI PINs do not match.');
      return;
    }
    if (newUpiPin.length !== 4) {
      setMessage('UPI PIN must be 4 digits.');
      return;
    }

    try {
      const payload = {
        oldPin: oldUpiPin,
        newPin: newUpiPin,
      };

      await axios.put(`http://localhost:8080/account/updatePin/${selectedAccount.id}`, payload);
      setMessage('UPI PIN updated successfully.');
      setShowPinFields(false);
    } catch (error) {
      console.error('Error updating UPI PIN:', error);
      setMessage('Failed to update UPI PIN. Please try again.');
    }
  };

  return (
    <div className="change-upi-container">
      <h1>Change UPI PIN</h1>
      {message && <p className="message">{message}</p>}

      {loading ? ( // Show loading indicator while data is being fetched
        <p>Loading...</p>
      ) : !showPinFields ? ( // Show accounts list if not showing PIN fields
        <div className="accounts-list">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <div key={account.id} className="account-box">
                <h3>{account.bankName}</h3>
                <p>Account Number: {account.accountNumber}</p>
                <button
                  onClick={() => setSelectedAccount(account)}
                  className="change-upi-button"
                >
                  Change UPI PIN
                </button>

                {selectedAccount?.id === account.id && (
                  <div className="pin-verification">
                    <input
                      type="password"
                      value={oldUpiPin}
                      onChange={(e) => setOldUpiPin(e.target.value)}
                      placeholder="Enter Old UPI PIN"
                    />
                    <button onClick={() => verifyOldPin(account.id)}>Verify</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No accounts found.</p> // Message when no accounts are available
          )}
        </div>
      ) : ( // Show PIN fields if `showPinFields` is true
        <div className="new-upi-fields">
          <h2>Enter New UPI PIN</h2>
          <input
            type="password"
            value={newUpiPin}
            onChange={(e) => setNewUpiPin(e.target.value)}
            placeholder="New UPI PIN"
            maxLength={4}
          />
          <input
            type="password"
            value={reEnterNewUpiPin}
            onChange={(e) => setReEnterNewUpiPin(e.target.value)}
            placeholder="Re-enter New UPI PIN"
            maxLength={4}
          />
          <button onClick={handleChangePin}>Update PIN</button>
        </div>
      )}
    </div>
  );
};

export default ChangeUpiPin;

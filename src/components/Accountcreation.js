import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './AccountCreation.css';

const AccountCreation = () => {
  const location = useLocation();
  const firstname = location.state?.firstname;  // Get firstname from state
  const userId = location.state?.id;  // Get userId from state

  const [banks, setBanks] = useState([]);
  const [account, setAccount] = useState({ bankId: '', accountNumber: '', transactionLimit: '', upiPin: '' });
  const [message, setMessage] = useState('');
  const [showAddAccountButton, setShowAddAccountButton] = useState(false);

  // Fetch the list of banks when the component loads
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/account/banks');
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };
    fetchBanks();
  }, []);

  // Handle input changes for the account
  const handleInputChange = (field, value) => {
    setAccount({ ...account, [field]: value });
  };

  // Validate the form inputs
  const validateForm = () => {
    if (!account.bankId || !account.accountNumber || !account.transactionLimit || !account.upiPin) {
      return 'Please fill in all fields.';
    }
    if (account.upiPin.length !== 4 || isNaN(account.upiPin)) {
      return 'UPI Pin must be a 4-digit number.';
    }
    if (account.accountNumber.length !== 10 || isNaN(account.accountNumber)) {
      return 'Account Number must be a 10-digit number.';
    }
    if (parseFloat(account.transactionLimit) > 20000) {
      return 'Transaction Limit must not exceed 20,000.';
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    const payload = {
      bankName: account.bankId,  // Mapping bankId to bankName as per API requirement
      accountNumber: account.accountNumber,
      upiPin: account.upiPin,
      transactionLimit: parseFloat(account.transactionLimit),
      user: {
        id: userId  // Add user id in the 'user' object
      }
    };

    // Log the data to be sent to the API for debugging purposes
    console.log('Data being sent to API:', payload);

    try {
      const response = await axios.post('http://localhost:8080/account', payload);
      if (response.status === 200) {
        setMessage('Account created successfully!');
        setShowAddAccountButton(true);
        clearForm();  // Clear the form after successful submission
      } else {
        setMessage('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setMessage('An error occurred while creating the account.');
    }
  };

  // Clear form fields
  const clearForm = () => {
    setAccount({ bankId: '', accountNumber: '', transactionLimit: '', upiPin: '' });
  };

  // Add another account (clear form for a new account)
  const addAnotherAccount = () => {
    clearForm();
    setMessage(''); // Clear the message when adding another account
    setShowAddAccountButton(false);
  };

  return (
    <div className="account-creation-container">
      <h1>Welcome, {firstname}</h1> {/* Display the firstname */}
      <h2>Create Your Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="account-section">
          <div className="form-group">
            <label>Select Bank</label>
            <select
              value={account.bankId}
              onChange={(e) => handleInputChange('bankId', e.target.value)}
            >
              <option value="">Select a bank</option>
              {banks.map((bank, i) => (
                <option key={i} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              value={account.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              maxLength={10}
            />
          </div>

          <div className="form-group">
            <label>Transaction Limit</label>
            <input
              type="number"
              value={account.transactionLimit}
              onChange={(e) => handleInputChange('transactionLimit', e.target.value)}
              max="20000"
            />
          </div>

          <div className="form-group">
            <label>4-Digit UPI Pin</label>
            <input
              type="password"
              value={account.upiPin}
              onChange={(e) => handleInputChange('upiPin', e.target.value)}
              maxLength={4}
            />
          </div>
        </div>

        <button type="submit">Create Account</button>
      </form>

      {message && <p className="message">{message}</p>}

      {showAddAccountButton && (
        <button type="button" onClick={addAnotherAccount}>
          Add Another Bank Account
        </button>
      )}
    </div>
  );
};

export default AccountCreation;

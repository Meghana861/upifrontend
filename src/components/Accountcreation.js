import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './AccountCreation.css';
import { UserContext } from './UserContext'; 

const AccountCreation = () => {
  // const location = useLocation();
  // const firstname = location.state?.firstname;  
  // const userId = location.state?.id;  
  const { user } = useContext(UserContext);
  const [banks, setBanks] = useState([]);
  const [account, setAccount] = useState({
    bankId: '',
    accountNumber: '',
    transactionLimit: '',
    upiPin: '',
    isPrimary: false 
  });
  const [message, setMessage] = useState('');
  const [showAddAccountButton, setShowAddAccountButton] = useState(false);

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

  const handleInputChange = (field, value) => {
    setAccount({ ...account, [field]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    const payload = {
      bankName: account.bankId,  
      accountNumber: account.accountNumber,
      upiPin: account.upiPin,
      transactionLimit: parseFloat(account.transactionLimit),
      isPrimary: account.isPrimary,
      user: {
        id: user.id  
      }
    };

    console.log('Data being sent to API:', payload);

    try {
      const response = await axios.post('http://localhost:8080/account', payload);
      if (response.status === 200 || response.status === 201) {
        setMessage('Account created successfully!');
        setShowAddAccountButton(true);
        clearForm();  
      } else {
        setMessage('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setMessage('An error occurred while creating the account.');
    }
  };

  const clearForm = () => {
    setAccount({ bankId: '', accountNumber: '', transactionLimit: '', upiPin: '', isPrimary: false });
  };

  const addAnotherAccount = () => {
    clearForm();
    setMessage(''); 
    setShowAddAccountButton(false);
  };

  return (
    <div className="account-creation-container">
      <h1>Welcome, {user?.firstname}</h1>
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

          <div className="form-group-toggle">
  <label>
    Set as Primary Account
    <div className="toggle-switch">
      <input
        type="checkbox"
        checked={account.isPrimary}
        onChange={(e) => handleInputChange('isPrimary', e.target.checked)}
      />
      <span className="slider round"></span>
    </div>
  </label>
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

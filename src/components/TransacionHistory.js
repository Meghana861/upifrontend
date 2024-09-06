import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Transaction.css';

const TransactionHistory = () => {
  const location = useLocation();
  const { mobileNumber } = location.state || {};
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transfer/history/${mobileNumber}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setMessage('Failed to fetch transaction history. Please try again later.');
      }
    };

    if (mobileNumber) {
      fetchTransactions();
    }
  }, [mobileNumber]);

  return (
    <div className="transaction-history-container">
      <h1>Transaction History</h1>
      {message && <p className="message">{message}</p>}
      <h2>Transactions for Mobile Number: {mobileNumber}</h2>
      {transactions.length > 0 ? (
        <ul className="transaction-list">
          {transactions.map((transaction, index) => {
            // Convert timestamps to readable date and time
            const date = new Date(transaction.transactionDate);
            const formattedDate = date.toLocaleDateString();
            const formattedTime = date.toLocaleTimeString();
            
            return (
              <li key={index} className="transaction-item">
                <div className="transaction-detail">
                  <p><strong>Date:</strong> {formattedDate}</p>
                  <p><strong>Time:</strong> {formattedTime}</p>
                  <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                  <p><strong>Recipient:</strong> {transaction.receiverMobileNumber}</p>
                  <p><strong>Sender:</strong> {transaction.senderMobileNumber}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionHistory;

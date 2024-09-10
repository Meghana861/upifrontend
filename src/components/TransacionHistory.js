import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Transaction.css';
import { UserContext } from './UserContext';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user && user.mobileNumber) {
          const response = await axios.get(`http://localhost:8080/transfer/history/${user.mobileNumber}`);
          const data = response.data;
          // Ensure transactions is an array, even if empty
          setTransactions(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setMessage('Failed to fetch transaction history. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    if (user && user.mobileNumber) {
      fetchTransactions();
    }
  }, [user]);

  return (
    <div className="transaction-history-container">
      <h1>Transaction History</h1>
      {message && <p className="message">{message}</p>}
      
      {user && user.mobileNumber ? (
        <>
          <h2>Transactions for Mobile Number: {user.mobileNumber}</h2>
          {loading ? ( // Display loading message while data is being fetched
            <p>Loading...</p>
          ) : transactions.length > 0 ? ( // If transactions are found
            <ul className="transaction-list">
              {transactions.map((transaction, index) => {
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
        </>
      ) : (
        <p>Mobile number is not available.</p>
      )}
    </div>
  );
};

export default TransactionHistory;

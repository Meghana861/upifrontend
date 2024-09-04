import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const GetAllOrders = () => {
  const location = useLocation();
  const userName = location.state?.userName;
  const id = location.state?.id;
  const [orders, setOrders] = useState([]);  

  const orders_url = `http://localhost:8080/orders/userId/${id}`;

  useEffect(() => { 
    axios.get(orders_url)
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error Fetching Orders"));
  }, [orders_url]);

  let content;
  if (orders.length === 0) {
    content = <p>No Orders Placed Yet</p>;  
  } else {
    content = (
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>BookId: {order.bookId}</strong>
            <p>Ordered On</p>
            <strong>Date: {order.orderDate}</strong>
          </li>
        ))}  
      </ul>
    );
  }

  return (
    <div>
      <h1>Orders of {userName}</h1>
      {content}
    </div>
  );
};

export default GetAllOrders;

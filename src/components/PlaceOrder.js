import React from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const book_url='http://localhost:8080/orders';
const PlaceOrder=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const userName=location.state?.userName
    const id=location.state?.id
    const [userId,setUserId]=useState('');
    const[orderDate,setOrderDate]=useState('');
    const[bookId,setBookId]=useState('');
    const[message,setMessage]=useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const neworder={
            userId:userId,
            orderDate:orderDate,
            bookId:bookId
        };
        axios.post(book_url,neworder)
       .then(response=>{
        //console.log(response.data)
        setMessage(`Placed Order Successfully. ${response.data}`)
        setUserId('')
        setBookId('')
        setOrderDate('')
        setOrderPlaced(true)
       })
       .catch(error=>{
        console.error('Couldnt place Order')
        setMessage('Failed to place order')
       })
        }
       
        const handleOrders=()=>{
            navigate('/getorders',{state:{userName:userName,id:id}})
        }
    return(
        <div>
            <h1>Welcome, {userName} </h1>
            <h2>Your Id is {id}</h2>
            <h4>Please Place Your Order</h4>
            <form onSubmit={handleSubmit}>
            <h1>Place Order</h1>
            <label>User Id:</label>
            <input type="text" value={userId} onChange={(e)=>setUserId(e.target.value)}></input>
            <label>Order Date:</label>
            <input type="text" value={orderDate} onChange={(e)=>setOrderDate(e.target.value)}></input>
            <label>Book Id:</label>
            <input type="text" value={bookId} onChange={(e)=>setBookId(e.target.value)}></input>
            <button type="submit">Place Order</button>
            {message&&<p>{message}</p>}
            </form>
            {orderPlaced && (<button onClick={handleOrders}View All Orders></button>)}
        </div>
    )
}
export default PlaceOrder;
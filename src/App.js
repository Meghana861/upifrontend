import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import BookList from './components/BookList';
// import Login from './Login.js';

import BookList from './components/BookList.js';
import PostBook from './components/PostBooks.js';
 import PlaceOrder from './components/PlaceOrder.js';
  import Register from './components/Register.js';
 import Login from './components/Login.js';
 import GetAllOrders from './components/GetAllOrders.js'
function App() {
    return (
        <div>
           <Router>
                <Routes>
             <Route path="/" element={<Register/>}></Route> 
            <Route path='/login' element={<Login/>}></Route>
            <Route path="/books" element={<BookList/>}></Route>
            { <Route path="/postbook" element={<PostBook/>}></Route>}
            <Route path="/placeorder" element={<PlaceOrder/>}></Route> 
            <Route path="/getorders" element={<GetAllOrders/>}></Route>
            </Routes>
            </Router>
        </div>
    );
}

export default App;

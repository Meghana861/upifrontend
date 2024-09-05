import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import HomePage from './components/Homepage.js';
import AccountCreation from './components/Accountcreation.js';
import ViewBank from './components/ViewBanks.js';
import TransferMoney from './components/TransferMoney.js';
function App() {
    return (
        <div>
           <Router>
                <Routes>
             <Route path="/" element={<Register/>}></Route> 
            <Route path='/login' element={<Login/>}></Route>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/accountcreate" element={<AccountCreation/>}></Route>
            <Route path="/view-accounts" element={<ViewBank/>}></Route>
            <Route path="/money-transfer" element={<TransferMoney/>}></Route>
            </Routes>
            </Router>
        </div>
    );
}

export default App;

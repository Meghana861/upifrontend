import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.js';
import Login from './components/Login.js';
import HomePage from './components/Homepage.js';
import AccountCreation from './components/Accountcreation.js';
import ViewBank from './components/ViewBanks.js';
import TransferMoney from './components/TransferMoney.js';
import TransactionHistory from './components/TransacionHistory.js';
import EditProfile from './components/EditProfile.js';
import ChangeUpiPin from './components/ChangeUpiPin.js';
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
            <Route path="/view-transactions" element={<TransactionHistory/>}></Route>
            <Route path="/edit-profile" element={<EditProfile/>}></Route>
            <Route path="/change-upi-pin" element={<ChangeUpiPin/>}></Route>

            </Routes>
            </Router>
        </div>
    );
}

export default App;

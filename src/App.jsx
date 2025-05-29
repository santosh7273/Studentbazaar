import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Pages/Footer';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SellProduct from './Pages/SellProduct';
import MyListings from './Pages/MyListings';
import Products from './Pages/Products';
import ForgotPassword from './Pages/ForgotPassword'; // Password reset page
import UpdateProduct from './Pages/UpdateProduct';
import Notfound from './Pages/Notfound';
// import NotFound from './Pages/NotFound'; // Optional: if you want a 404 page

export const Store = createContext(null);

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Store.Provider value={{ token, setToken }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellproduct" element={<SellProduct />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/products" element={<Products />} />
          <Route path="/updatepassword" element={<ForgotPassword />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
          <Route path="*" element={<Notfound />} /> 
          {/* Optionally use a custom 404 page instead of Home: <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </Router>
    </Store.Provider>
  );
}

export default App;

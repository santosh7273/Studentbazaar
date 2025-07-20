import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../App';
import Swal from 'sweetalert2';
const Login = () => {
  // Access user and admin tokens from global context
  const { usertoken, setuserToken, setadminToken } = useContext(Store);
  const navigate = useNavigate();
  // Local state for user credentials and feedback messages
  const [ud, setUd] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  // Redirect to products if already logged in
  const p= usertoken || localStorage.getItem("usertoken");
  useEffect(() => {
    if (p) {
      navigate('/products');
    }
  }, [p, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUd((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const response = await axios.post('https://studentbazaar-backend.onrender.com/login', ud);
      const { token } = response.data;
      if (!token) throw new Error('Invalid response from server');

      // Save user token to context and localStorage
      setuserToken(token);
      localStorage.setItem('usertoken', token);

      // Clear any existing admin token
      setadminToken(null);
      localStorage.removeItem('admintoken');
      // Show success message
      await Swal.fire({
        title: 'Login Successful',
        text: 'Welcome back!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/products');
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: 'Login Failed',
        text: error.response?.data || 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Login to Your Account</h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-lg text-sm text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={ud.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={ud.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
              disabled={loading}
            />
          </div>

          <div className="flex justify-between text-sm text-indigo-600 font-medium">
            <Link to="/updatepassword" className="hover:underline">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600 text-sm">
          Don’t have an account?
          <Link to="/register" className="text-indigo-600 font-semibold ml-1 hover:underline">
            Register
          </Link>
        </div>

        <div className="text-center mt-2 text-gray-600 text-sm">
          Are you an Admin?
          <Link to="/admin_login" className="text-indigo-600 font-semibold ml-1 hover:underline">
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

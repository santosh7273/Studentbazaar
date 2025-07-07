import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store } from '../App';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SellProduct = () => {
  const { token } = useContext(Store);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    rollno: '',
    collegename: '',
    googledrivelink: '',
    description: '',
    dept: '',
    phoneno: ''
  });

  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Please Login to Sell Products</h2>
          <Link to="/login" className="text-indigo-600 hover:underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit this product?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;
    setLoading(true);
    try {
      const res = await axios.post('https://bas-backend.onrender.com/sellproduct', formData, {
        headers: {
          Authorization: token
        }
      });
      if (res.status === 201) {
        await MySwal.fire({
          icon: 'success',
          title: 'Posted!',
          text: 'Product posted successfully!',
        });
        navigate('/mylistings');
      }
    } catch (err) {
      await MySwal.fire({
        icon: 'error',
        title: 'Oops!',
        text:
          typeof err.response?.data === 'string'
            ? err.response.data
            : err.response?.data?.message || 'Failed to add product',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">Sell Your Product</h2>

        <div>
  <label className="block mb-1 font-medium text-gray-700">Product Name</label>
  <input
    name="name"
    type="text"
    value={formData.name}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter product name"
    required
  />
</div>

<div>
  <label className="block mb-1 font-medium text-gray-700">Price</label>
  <input
    name="price"
    type="number"
    value={formData.price}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter price"
    required
  />
</div>

<div>
  <label className="block mb-1 font-medium text-gray-700">Roll Number</label>
  <input
    name="rollno"
    type="text"
    value={formData.rollno}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter your roll number"
    required
  />
</div>

<div>
  <label className="block mb-1 font-medium text-gray-700">College Name</label>
  <input
    name="collegename"
    type="text"
    value={formData.collegename}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter your college name"
    required
  />
</div>

<div>
  <label className="block mb-1 font-medium text-gray-700">Google Drive Link</label>
  <input
    name="googledrivelink"
    type="url"
    value={formData.googledrivelink}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter drive link of the Product images"
    required
  />
</div>

<div>
  <label className="block mb-1 font-medium text-gray-700">Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 resize-none"
    placeholder="Enter product description"
    rows="4"
    required
  ></textarea>
</div>

<div>
  <label className="block mb-1 font-medium text-gray-700">Department</label>
  <input
    name="dept"
    type="text"
    value={formData.dept}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter your department"
    required
  />
</div>

<div>
  <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
  <input
    name="phoneno"
    type="tel"
    value={formData.phoneno}
    onChange={handleChange}
    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter your phone number"
    required
  />
</div>


        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Product'}
        </button>
      </form>
    </div>
  );
};

export default SellProduct;

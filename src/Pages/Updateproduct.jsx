import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store } from '../App';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const UpdateProduct = () => {
  const MySwal = withReactContent(Swal);
  const { token } = useContext(Store);
  const navigate = useNavigate();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('id');

  const [form, setForm] = useState({
    name: '',
    price: 0,
    rollno: '',
    collegename: '',
    googledrivelink: '',
    description: '',
    dept: '',
    phoneno: ''
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://bas-backend.onrender.com/mylistings/${productId}`,
          { headers: { Authorization: token } }
        );

        const productData = response.data;
        setForm({
          name: productData.name,
          price: productData.price,
          rollno: productData.rollno,
          collegename: productData.collegename,
          googledrivelink: productData.googledrivelink,
          description: productData.description,
          dept: productData.dept,
          phoneno: productData.phoneno
        });

        setError('');
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result =await MySwal.fire({
      title: 'Are you sure?',
      text: "Do you want to update this product?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    })
    if (!result.isConfirmed) return;
    setSubmitting(true);
    setError('');

    try {
      await axios.put(
        `https://bas-backend.onrender.com/mylistings/updateproduct/${productId}`,
        form,
        { headers: { Authorization: token } }
      );
      
      await MySwal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Product updated successfully!',
      });
      navigate('/mylistings');
    } catch (err) {
      await MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to update product',
      });
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-indigo-700 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error && !form.name) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => navigate('/mylistings')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-12"
    >
      <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
        Update Product
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="1"
            placeholder="Enter price"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Roll Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Roll Number</label>
          <input
            type="text"
            name="rollno"
            value={form.rollno}
            onChange={handleChange}
            placeholder="Enter roll number"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* College Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">College Name</label>
          <input
            type="text"
            name="collegename"
            value={form.collegename}
            onChange={handleChange}
            placeholder="Enter college name"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Google Drive Link */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Google Drive Link</label>
          <input
            type="url"
            name="googledrivelink"
            value={form.googledrivelink}
            onChange={handleChange}
            placeholder="Enter Google Drive link"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Department */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Department</label>
          <input
            type="text"
            name="dept"
            value={form.dept}
            onChange={handleChange}
            placeholder="Enter department"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneno"
            value={form.phoneno}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter product description"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <motion.button
            type="button"
            onClick={() => navigate('/mylistings')}
            whileTap={{ scale: 0.97 }}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            Cancel
          </motion.button>

          <motion.button
            type="submit"
            disabled={submitting}
            whileTap={{ scale: 0.97 }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            {submitting ? 'Updating...' : 'Update Product'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UpdateProduct;

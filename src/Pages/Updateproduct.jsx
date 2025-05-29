import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store } from '../App';
import { motion } from 'framer-motion';

const UpdateProduct = () => {
  const { token } = useContext(Store);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id');

  const [form, setForm] = useState({
    name: '',
    price: '',
    rollno: '',
    collgename: '',
    googledrivelink: '',
    description: '',
    dept: '',
    phoneno: ''
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:5000/mylistings/${productId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch product data.');
        setLoading(false);
        navigate('/mylistings');
      });
  }, [productId, token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/mylistings/updateproduct/${productId}`,
        form,
        { headers: { Authorization: token } }
      );
      alert(res.data.message);
      navigate('/mylistings');
    } catch (err) {
      console.error(err);
      alert('Failed to update product.');
    } finally {
      setSubmitting(false);
    }
  };

  // Show buffering animation while loading
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-white">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-indigo-700">Loading product details...</p>
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
      <h2 className="text-4xl font-bold text-indigo-700 mb-8 text-center">Update Your Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "price", "rollno", "collgename", "googledrivelink", "dept", "phoneno"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-700 font-semibold capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field] || ''}
              onChange={handleChange}
              required={["name", "price"].includes(field)}
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            rows={4}
            className="mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            placeholder="Enter description..."
          ></textarea>
        </div>

        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.97 }}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition duration-300 flex justify-center items-center gap-2 ${
            submitting && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Updating...
            </>
          ) : (
            'Update Product'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UpdateProduct;

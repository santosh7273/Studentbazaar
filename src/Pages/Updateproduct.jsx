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
    collegename: '',
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

    axios.get(`https://bas-backend.onrender.com/mylistings/${productId}`, {
      headers: { Authorization: token },
    })
      .then(res => {
        setForm({
          name: res.data.name || '',
          price: res.data.price || '',
          rollno: res.data.rollno || '',
          collegename: res.data.collegename || '', // 👈 Ensure it's captured
          googledrivelink: res.data.googledrivelink || '',
          description: res.data.description || '',
          dept: res.data.dept || '',
          phoneno: res.data.phoneno || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        alert('Failed to fetch product.');
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
        `https://bas-backend.onrender.com/mylistings/updateproduct/${productId}`,
        form,
        { headers: { Authorization: token } }
      );
      alert(res.data.message || 'Product updated!');
      navigate('/mylistings');
    } catch (err) {
      console.error("Update failed:", err);
      alert('Failed to update product.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-500 rounded-full"></div>
        <p className="ml-4 text-indigo-700 font-medium">Loading product...</p>
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
        {/* Fields */}
        {[
          { label: "Name", name: "name", type: "text", required: true },
          { label: "Price", name: "price", type: "number", required: true },
          { label: "Roll Number", name: "rollno", type: "text" },
          { label: "College Name", name: "collegename", type: "text" },
          { label: "Google Drive Link", name: "googledrivelink", type: "url" },
          { label: "Department", name: "dept", type: "text" },
          { label: "Phone Number", name: "phoneno", type: "tel" },
        ].map(({ label, name, type, required }) => (
          <div className="flex flex-col" key={name}>
            <label className="text-gray-700 font-semibold">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name] || ''}
              onChange={handleChange}
              required={required}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description"
            className="mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
        >
          {submitting ? 'Updating...' : 'Update Product'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UpdateProduct;

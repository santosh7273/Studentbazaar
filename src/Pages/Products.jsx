import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { Loader2, ShoppingBag, AlertCircle, ExternalLink, Search } from 'lucide-react';
import { Store } from '../App';
const Products = () => {
  const { usertoken } = useContext(Store);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const authToken = usertoken || localStorage.getItem("usertoken"); // ✅ consistent fallback
  const fetchProducts = async (searchTerm = '') => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://studentbazaar-backend.onrender.com/products${searchTerm ? `?name=${searchTerm}` : ''}`,
        {
          headers: { Authorization: authToken },
        }
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authToken) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [authToken, navigate]);

  const handleSearch = () => {
    fetchProducts(search.trim());
  };

  const truncateDescription = (text, maxLength = 100) =>
    !text ? "No description available" :
      text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <PacmanLoader color="#7c3aed" size={30} speedMultiplier={1.5} loading={true} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans text-gray-800 relative overflow-hidden">
      {/* 💡 You can implement search input here if needed */}
      {/* Example: */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
          >
            <Search size={18} className="inline-block mr-1" />
            Search
          </button>
        </div>
      </div>

      {/* Product list rendering */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <div className="text-center col-span-full mt-10">
            <AlertCircle className="mx-auto text-red-500 mb-2" size={32} />
            <p className="text-lg text-red-600 font-semibold">No products found.</p>
          </div>
        ) : (
          products.map((product) => (
  <motion.div
    key={product._id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition space-y-2"
  >
    <div className="flex items-center justify-between">
      <h3 className="font-bold text-lg text-slate-800 break-words">{product.name}</h3>
      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
        ₹{product.price}
      </span>
    </div>

    <p className="text-sm text-slate-600">{truncateDescription(product.description)}</p>

    {product.googledrivelink && (
      <a
        href={product.googledrivelink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-violet-600 text-sm hover:underline"
      >
        <ExternalLink size={14} className="mr-1" />
        View Images
      </a>
    )}

    <div className="text-sm text-slate-700 space-y-1 pt-2">
      <p><span className="font-medium">Roll No:</span> {product.rollno}</p>
      <p><span className="font-medium">College:</span> {product.collegename}</p>
      <p><span className="font-medium">Department:</span> {product.dept}</p>
      <p><span className="font-medium">Phone No:</span> {product.phoneno}</p>
      <p><span className="font-medium">Seller Email:</span> {product.email}</p>

    </div>
  </motion.div>
))
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => {
  if (!value || value === "N/A") return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-xs">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="font-semibold text-slate-700">{label}:</span>{" "}
        <span className="text-slate-600">{value}</span>
      </div>
    </div>
  );
};

export default Products;

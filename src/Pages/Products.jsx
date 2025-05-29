import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Store } from '../App';
import { motion } from 'framer-motion';
import { Loader2, ShoppingBag, AlertCircle, ExternalLink, Search } from 'lucide-react';

const Products = () => {
  const { token } = useContext(Store);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async (searchTerm = '') => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://bas-backend.onrender.com/products${searchTerm ? `?name=${searchTerm}` : ''}`,
        { headers: { Authorization: token } }
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
    if (!token) return navigate('/login');
    fetchProducts();
  }, [token, navigate]);

  const handleSearch = () => {
    fetchProducts(search.trim());
  };

  const truncateDescription = (text, maxLength = 100) =>
    !text ? "No description available" :
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 text-center p-12 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-xl border border-white/20"
        >
          <div className="relative">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-6" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-indigo-200 rounded-full animate-ping mx-auto"></div>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3"
          >
            Loading Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 font-medium"
          >
            Please wait while we fetch the latest items
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans text-gray-800 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[70%] w-[500px] h-[500px] bg-gradient-to-r from-purple-300/25 to-pink-300/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-5%] left-[-15%] w-[600px] h-[600px] bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] bg-gradient-to-r from-indigo-300/15 to-violet-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.8) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl mb-8 relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-lg opacity-50"></div>
            <ShoppingBag className="text-white w-12 h-12 relative z-10" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Campus
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Marketplace
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Discover amazing products from fellow students. Connect, buy, and sell within your college community.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center mt-8"
          >
            <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-indigo-200/50 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-700">
                {products.length} Products Available
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full sm:w-96 px-6 py-4 rounded-2xl border-2 border-indigo-100 focus:border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 bg-white/80 backdrop-blur-sm shadow-lg text-slate-700 placeholder-slate-400 font-medium transition-all duration-300 hover:shadow-xl"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-100/20 to-purple-100/20 pointer-events-none"></div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="px-8 py-4 flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold group"
          >
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Search</span>
          </motion.button>
        </motion.div>

        {/* Enhanced No Products State */}
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center pt-20"
          >
            <div className="p-12 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl mx-auto border border-white/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <AlertCircle className="w-12 h-12 text-slate-400" />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-3xl font-bold text-slate-800 mb-4"
              >
                No Products Found
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Try adjusting your search terms or be the first to share something amazing with your community!
              </motion.p>
            </div>
          </motion.div>
        ) : (
          /* Enhanced Products Grid */
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {products.map(product => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6 transition-all duration-500 hover:shadow-2xl hover:border-indigo-200/50 relative overflow-hidden"
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors duration-300 leading-tight mb-1">
                        {product.name || "Unnamed Product"}
                      </h3>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg ml-3 shrink-0">
                      ₹{product.price ?? "N/A"}
                    </div>
                  </div>

                  {/* Description */}
                 {product.description && product.description !== "No description available" && (
  <div className="mb-4 bg-violet-50 border border-violet-200 rounded-xl p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16h8M8 12h8M8 8h8M4 6h16v12H4z" />
      </svg>
      <h4 className="text-sm font-semibold text-violet-700 uppercase tracking-wide">Product Description</h4>
    </div>
    <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">
      {product.description}
    </p>
  </div>
)}

                  {/* Product Details */}
                  <div className="space-y-2 mb-6">
                    <DetailRow icon="🎓" label="Roll No" value={product.rollno} />
                    <DetailRow icon="🏛️" label="College" value={product.collgename} />
                    <DetailRow icon="📚" label="Department" value={product.dept} />
                    <DetailRow icon="📞" label="Phone" value={product.phoneno} />
                    {product.email && (
                      <div className="flex items-start gap-2 text-sm">
                        <span className="text-xs">✉️</span>
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold text-slate-700">Email:</span>{" "}
                          <a
                            href={`mailto:${product.email}`}
                            className="text-indigo-600 hover:text-indigo-700 font-medium underline-offset-2 hover:underline transition-colors break-all"
                          >
                            {product.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Drive Link Button */}
                  {product.googledrivelink && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={product.googledrivelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group/button"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/button:rotate-12 transition-transform duration-300" />
                      <span>View Images</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Helper component for product details
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
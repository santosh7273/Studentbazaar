import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Store } from "../App";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MyListings = () => {
  const { token } = useContext(Store);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://bas-backend.onrender.com/mylistings", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          alert("Failed to fetch listings.");
        }
      });
  }, [token, navigate]);

  const handleDelete = async (productId) => {
    const password = prompt("Enter your password to confirm deletion:");
    if (!password) return;

    setDeleteLoading(productId);
    try {
      const res = await axios.delete("https://bas-backend.onrender.com/mylistings/delete", {
        headers: { Authorization: token },
        data: { productId, password },
      });
      alert(res.data.message);
      setListings((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Invalid password. Deletion failed.");
      } else {
        alert("Error deleting product.");
      }
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/updateproduct?id=${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-violet-200 rounded-full animate-spin border-t-violet-600 mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-violet-400"></div>
          </div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold text-slate-700 mb-2"
          >
            Loading Your Listings
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500"
          >
            Please wait while we fetch your products
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Listings
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage your products with ease. Update details, track performance, or remove listings as needed.
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">
                {listings.length} {listings.length === 1 ? 'Product' : 'Products'} Listed
              </span>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7-3-7 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No Products Listed Yet</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Start your selling journey by adding your first product. It's quick and easy!
              </p>
              <button
                onClick={() => navigate('/sellproduct')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Product
              </button>
            </div>
          </motion.div>
        ) : (
          /* Products Grid */
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <AnimatePresence>
              {listings.map((product) => (
                <ListingCard
                  key={product._id}
                  product={product}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  deleteLoading={deleteLoading === product._id}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ListingCard = ({ product, onDelete, onUpdate, deleteLoading }) => {
  const {
    _id,
    name,
    price,
    rollno,
    collegename,
    dept,
    phoneno,
    email,
    description,
    googledrivelink,
  } = product;

  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -4 }}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-violet-100 overflow-hidden hover:shadow-xl hover:border-violet-200 transition-all duration-300"
    >
      {/* Header Section with Price */}
      <div className="relative bg-yellow-100 p-5 border-b border-violet-100">
  <div className="flex items-start justify-between">
    <div className="flex-1">
      <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-2 group-hover:text-violet-700 transition-colors">
        {name || "Unnamed Product"}
      </h3>
    </div>
    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg ml-3 shrink-0">
      ₹{price ?? "N/A"}
    </div>
  </div>
</div>

      {/* Content Section */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-violet-700 transition-colors">
          {name || "Unnamed Product"}
        </h3>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          <InfoRow icon="🎓" label="Roll No" value={rollno} />
          <InfoRow icon="🏛️" label="College" value={collegename} />
          <InfoRow icon="📚" label="Department" value={dept} />
          <InfoRow icon="📞" label="Phone" value={phoneno} />
          {email && email !== "N/A" && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-xs">✉️</span>
              <div className="min-w-0 flex-1">
                <span className="text-slate-600 font-medium">Email:</span>{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-violet-600 hover:text-violet-700 font-medium underline-offset-2 hover:underline transition-colors break-all"
                >
                  {email}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
{description && description !== "No description available" && (
  <div className="mb-4 bg-violet-50 border border-violet-200 rounded-xl p-4 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16h8M8 12h8M8 8h8M4 6h16v12H4z" />
      </svg>
      <h4 className="text-sm font-semibold text-violet-700 uppercase tracking-wide">Product Description</h4>
    </div>
    <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">
      {description}
    </p>
  </div>
)}

        {/* Google Drive Link */}
        {googledrivelink && (
          <a
            href={googledrivelink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 font-medium mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Images
          </a>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => onUpdate(_id)}
            className="flex-1 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-sm"
            aria-label="Update product"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(_id)}
            disabled={deleteLoading}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 disabled:from-red-300 disabled:to-rose-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-md hover:shadow-lg disabled:shadow-sm text-sm disabled:cursor-not-allowed"
            aria-label="Delete product"
          >
            {deleteLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ icon, label, value }) => {
  if (!value || value === "N/A") return null;
  
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="text-xs">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="text-slate-600 font-medium">{label}:</span>{" "}
        <span className="text-slate-800">{value}</span>
      </div>
    </div>
  );
};

// Convert Google Drive share link to direct image link


export default MyListings;
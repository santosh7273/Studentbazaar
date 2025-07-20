import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../App';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { PacmanLoader } from 'react-spinners';
import {
  ShoppingCart,
  Mail,
  Phone,
  Shield,
  User,
  TrendingUp,
  AlertCircle,
  LogOut,
  Settings
} from 'lucide-react';

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const { usertoken, setuserToken } = useContext(Store);
  const authToken = usertoken || localStorage.getItem("usertoken");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) return navigate('/login');

    fetch('https://studentbazaar-backend.onrender.com/profile', {
      headers: { Authorization: authToken }
    })
      .then(async res => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Profile fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [authToken, navigate]);

  const handleLogout = async () => {
    let result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    MySwal.fire({
      icon: 'success',
      title: 'Logged out!',
      text: 'You have successfully logged out.'
    });

    setuserToken(null);
    localStorage.removeItem("usertoken");
    navigate('/login');
  };

  const userGuideSteps = [
    {
      step: 1,
      title: '📝 Register Yourself',
      description: 'Sign up with your name, email, and password to start using the platform.',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      step: 2,
      title: '🔐 Login',
      description: 'Log into your account to access your profile and manage products.',
      icon: Shield,
      color: 'bg-green-500'
    },
    {
      step: 3,
      title: '🛒 Sell Product',
      description: 'Click "Sell a Product" and enter product details like name, description, price, and contact information.',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      step: 4,
      title: '🧾 View, Update, or Delete Your Products',
      description: 'Your products are listed in the profile. You can update product info or delete them at any time.',
      icon: Settings,
      color: 'bg-orange-500'
    },
    {
      step: 5,
      title: "🌍 View Others' Products",
      description: 'Browse all public product listings from other users.',
      icon: TrendingUp,
      color: 'bg-cyan-500'
    },
    {
      step: 6,
      title: '📞 Like a Product? Contact the Seller',
      description: "Each product includes the seller's email or phone number — contact them directly to negotiate or purchase.",
      icon: Phone,
      color: 'bg-indigo-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <PacmanLoader color="#7c3aed" size={30} speedMultiplier={1.5} loading={true} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <style jsx>{`
        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg); }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg); }
          50% { border-radius: 50% 40% 60% 30% / 40% 70% 50% 60%; transform: rotate(180deg); }
          75% { border-radius: 70% 50% 40% 60% / 60% 40% 70% 30%; transform: rotate(270deg); }
        }
        .morph-blob {
          animation: morphBlob 20s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full morph-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/15 to-indigo-300/15 rounded-full morph-blob" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-bl from-cyan-200/10 to-teal-200/10 rounded-full morph-blob" style={{ animationDelay: '10s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-tr from-yellow-200/15 to-orange-200/15 rounded-full morph-blob" style={{ animationDelay: '15s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Student Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted campus community for buying and selling student essentials
          </p>
        </motion.div>

        {error && (
          <motion.div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-center max-w-md mx-auto" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <AlertCircle className="text-red-500 w-5 h-5 mr-2" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{userData?.name || 'Student User'}</h2>
                  <p className="text-gray-600 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {userData?.email || 'student@university.edu'}
                  </p>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">📘 How to Use This Platform</h3>
              <div className="space-y-6">
                {userGuideSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4 p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="flex justify-center mb-8" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button
              onClick={handleLogout}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl font-semibold transform hover:scale-105 transition-all"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </motion.div>

          <motion.div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg shadow-lg" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center mb-3">
              <AlertCircle className="text-yellow-600 w-6 h-6 mr-3" />
              <h4 className="text-lg font-semibold text-yellow-800">⚠️ Important Note</h4>
            </div>
            <p className="text-yellow-700">
              Please delete your product <strong>once someone agrees to buy it</strong> to avoid confusion among other buyers.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

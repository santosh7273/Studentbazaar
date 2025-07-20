import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Store } from '../App';
import { useNavigate } from 'react-router-dom';

const Admin_profile = () => {
  const { admintoken } = useContext(Store);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = admintoken || localStorage.getItem("admintoken");

    if (!token) {
      navigate("/admin_login");
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get('https://studentbazaar-backend.onrender.com/admin_profile', {
          headers: { Authorization: token }, // ✅ No Bearer prefix
        });
        setAdmin(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [admintoken, navigate]);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-medium text-gray-700">Loading admin profile...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 font-semibold">{error}</div>;
  }

  if (!admin) {
    return <div className="text-center mt-10 text-red-500">No admin data available.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700 text-center">Admin Profile</h2>
        <div className="space-y-4 text-gray-800 text-lg">
          <div><strong>Name:</strong> {admin.name || "N/A"}</div>
          <div><strong>Email:</strong> {admin.email || "N/A"}</div>
        </div>
      </div>
    </div>
  );
};

export default Admin_profile;

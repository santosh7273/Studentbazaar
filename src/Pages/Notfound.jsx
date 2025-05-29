import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 mb-6">404</h1>
      <p className="text-2xl font-semibold mb-4 text-gray-700">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 mb-8 max-w-md text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

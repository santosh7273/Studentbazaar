import React from "react";
import { FaUser, FaEnvelope, FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-blue-700 to-indigo-700 text-white py-6 mt-20 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Owner Info */}
        <div className="text-center md:text-left space-y-1 flex flex-col md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <FaUser className="text-indigo-300" aria-hidden="true" />
            <p className="font-extrabold text-xl tracking-wide drop-shadow-lg">
              Santosh Kumar
            </p>
          </div>
          <p className="text-sm text-indigo-200 font-medium md:ml-2">
            Full Stack Developer
          </p>
          <a
            href="mailto:ktsantosh5@gmail.com"
            className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors duration-300 no-underline hover:underline"
            aria-label="Send email to Santosh Kumar"
          >
            <FaEnvelope className="animate-pulse" />
            <span className="text-sm">ktsantosh5@gmail.com</span>
          </a>
        </div>
        
        {/* Copyright */}
        <div className="mt-4 md:mt-0 text-sm text-indigo-300 font-semibold drop-shadow-sm select-none flex items-center gap-1">
          <FaRegCopyright />
          <span>
            {new Date().getFullYear()} Santosh Kumar. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

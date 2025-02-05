import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 w-full text-white py-6">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-4">
          <Link 
            to="/" 
            className="text-lg font-semibold hover:text-gray-300 transition-all">
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-semibold hover:text-gray-300 transition-all">
            About Us
          </Link>
          <Link 
            to="/privacy" 
            className="text-lg font-semibold hover:text-gray-300 transition-all">
            Privacy Policy
          </Link>
          <Link 
            to="/contact" 
            className="text-lg font-semibold hover:text-gray-300 transition-all">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-400 transition-all">
            <FaInstagram />
          </a>
          <a 
            href="https://www.linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-400 transition-all">
            <FaLinkedin />
          </a>
          <a 
            href="https://www.twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-400 transition-all">
            <FaTwitter />
          </a>
        </div>

        {/* Copyright and Creator */}
        <div className="text-sm italic text-gray-300">
          &copy; {new Date().getFullYear()} Quick News Digest. All Rights Reserved.
        </div>
        <div className="text-sm italic mt-1 text-gray-400">
          Created by <span className="font-bold text-white">Chetan Nehra</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

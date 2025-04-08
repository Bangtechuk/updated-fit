import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-2xl font-bold text-indigo-600">FitTribe</span>
              <span className="text-sm text-gray-500 ml-1">.fitness</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/trainers">
              <span className="text-gray-700 hover:text-indigo-600 transition-colors">Find Trainers</span>
            </Link>
            <Link href="/how-it-works">
              <span className="text-gray-700 hover:text-indigo-600 transition-colors">How It Works</span>
            </Link>
            {user && user.role === 'trainer' && (
              <Link href="/trainer/dashboard">
                <span className="text-gray-700 hover:text-indigo-600 transition-colors">Trainer Dashboard</span>
              </Link>
            )}
            <Link href="/pricing">
              <span className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="flex items-center cursor-pointer">
                    <img 
                      src={user.profileImage || '/images/default-profile.jpg'} 
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="ml-2 text-gray-700">{user.firstName}</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link href="/dashboard">
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</span>
                    </Link>
                    <Link href="/profile">
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</span>
                    </Link>
                    <Link href="/bookings">
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Bookings</span>
                    </Link>
                    {user.role === 'admin' && (
                      <Link href="/admin">
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <span className="text-gray-700 hover:text-indigo-600 transition-colors">Login</span>
                </Link>
                <Link href="/register">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

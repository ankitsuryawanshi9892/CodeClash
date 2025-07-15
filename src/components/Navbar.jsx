import React, { useState, useEffect, useRef } from "react";

const Navbar = ({
  platform,
  setPlatform,
  type,
  setType,
  status,
  setStatus,
  searchQuery,
  setSearchQuery,
  applyFilters
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterPopupOpen, setFilterPopupOpen] = useState(false);

  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          {/* 🍔 Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* 🌐 Logo and Nav */}
          <div className="flex flex-1 items-center justify-center sm:justify-start w-full space-x-4">
            <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" />
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Calendar</a>
            </div>
          </div>

          {/* 🔍 Search + Filter + Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center space-x-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Search */}
            <div className="hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="px-3 py-1.5 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filter */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterPopupOpen((prev) => !prev)}
                className="relative group p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-5.414 5.414A1 1 0 0015 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>

              {filterPopupOpen && (
                <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl bg-gray-800 text-white shadow-xl ring-1 ring-gray-700 transition-all duration-300 p-4 space-y-4">
                  <h3 className="text-sm font-semibold text-white">🎯 Filter Events</h3>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Platform</label>
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-sm text-white focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">All Platforms</option>
                      <option value="Codeforces">Codeforces</option>
                      <option value="Devfolio">Devfolio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-sm text-white focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">All Types</option>
                      <option value="Online">Online</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-sm text-white focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">All Status</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      applyFilters();
                      setFilterPopupOpen(false);
                    }}
                    className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-md"
                  >
                    ✅ Apply Filters
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022A24.052 24.052 0 009.143 17.08m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex rounded-full bg-gray-800 text-sm">
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="User" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

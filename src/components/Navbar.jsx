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
  applyFilters,
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

  const handleCheckboxChange = (e, list, setList) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setList([...list, value]);
    } else {
      setList(list.filter((v) => v !== value));
    }
  };

  const removeFilter = (filterType, value) => {
    switch (filterType) {
      case 'platform':
        setPlatform(platform.filter(v => v !== value));
        break;
      case 'type':
        setType(type.filter(v => v !== value));
        break;
      case 'status':
        setStatus(status.filter(v => v !== value));
        break;
      case 'search':
        setSearchQuery('');
        break;
      default:
        break;
    }
  };

  const resetAllFilters = () => {
    setPlatform([]);
    setType([]);
    setStatus([]);
    setSearchQuery('');
    setFilterPopupOpen(false);
    applyFilters();
  };

  return (
    <>
      {/* Applied Filters Bar - Dark theme version */}
      {(platform.length > 0 || type.length > 0 || status.length > 0 || searchQuery) && (
        <div className="bg-gray-800 border-b border-gray-700 py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Active filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-100">
                Search: "{searchQuery}"
                <button 
                  onClick={() => removeFilter('search')}
                  className="ml-1.5 inline-flex text-blue-300 hover:text-blue-100"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {platform.map(p => (
              <span key={p} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900 text-indigo-100">
                Platform: {p}
                <button 
                  onClick={() => removeFilter('platform', p)}
                  className="ml-1.5 inline-flex text-indigo-300 hover:text-indigo-100"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            
            {type.map(t => (
              <span key={t} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-green-100">
                Type: {t}
                <button 
                  onClick={() => removeFilter('type', t)}
                  className="ml-1.5 inline-flex text-green-300 hover:text-green-100"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            
            {status.map(s => (
              <span key={s} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-100">
                Status: {s}
                <button 
                  onClick={() => removeFilter('status', s)}
                  className="ml-1.5 inline-flex text-purple-300 hover:text-purple-100"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            
            <button
              onClick={resetAllFilters}
              className="ml-2 text-xs text-gray-400 hover:text-gray-200 flex items-center"
            >
              Clear all
              <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>

            {/* Logo + Links */}
            <div className="flex flex-1 items-center justify-center sm:justify-start w-full space-x-4">
              <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" />
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <a href="#" className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="#" className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
                <a href="#" className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Projects</a>
              </div>
            </div>

            {/* Right Side */}
            <div className="absolute inset-y-0 right-0 flex items-center space-x-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Search */}
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                  placeholder="Search events..."
                  className="px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => removeFilter('search')}
                    className="absolute right-2 top-2 text-gray-400 hover:text-white"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Filter Popup */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterPopupOpen((prev) => !prev)}
                  className="flex items-center gap-1 px-3 py-2 rounded-md bg-indigo-700 hover:bg-indigo-600 text-sm font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-5.414 5.414A1 1 0 0015 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>

                {filterPopupOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-80 rounded-lg bg-gray-800 text-white shadow-xl ring-1 ring-gray-700 transition-all duration-300 p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-indigo-400">Filter Events</h3>
                      <button
                        onClick={resetAllFilters}
                        className="text-sm text-indigo-400 hover:text-indigo-300"
                      >
                        Reset All
                      </button>
                    </div>

                    {/* Platform */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Codeforces", "Devfolio", "LeetCode", "HackerEarth"].map((plat) => (
                          <label key={plat} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={plat}
                              checked={platform.includes(plat)}
                              onChange={(e) => handleCheckboxChange(e, platform, setPlatform)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                            />
                            <span className="text-sm text-gray-300">{plat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Type */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Online", "Onsite"].map((t) => (
                          <label key={t} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={t}
                              checked={type.includes(t)}
                              onChange={(e) => handleCheckboxChange(e, type, setType)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                            />
                            <span className="text-sm text-gray-300">{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Upcoming", "Ongoing", "Closed"].map((s) => (
                          <label key={s} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={s}
                              checked={status.includes(s)}
                              onChange={(e) => handleCheckboxChange(e, status, setStatus)}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                            />
                            <span className="text-sm text-gray-300">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        applyFilters();
                        setFilterPopupOpen(false);
                      }}
                      className="w-full mt-2 bg-indigo-600 text-white text-sm py-2 rounded-md hover:bg-indigo-500 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex rounded-full bg-gray-800 text-sm">
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="User" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-gray-700">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-gray-800 pb-3 px-2">
            <div className="mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                placeholder="Search events..."
                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="space-y-1">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Dashboard</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Team</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Projects</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

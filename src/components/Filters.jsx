import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full sm:w-64 p-4 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>

      {/* Platform Filter */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Platform</label>
      <select
        name="platform"
        value={filters.platform}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded-md"
      >
        <option value="">All</option>
        <option value="Codeforces">Codeforces</option>
        <option value="HackerRank">HackerRank</option>
        <option value="Devfolio">Devfolio</option>
      </select>

      {/* Type Filter */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Type</label>
      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded-md"
      >
        <option value="">All</option>
        <option value="Online">Online</option>
        <option value="Onsite">Onsite</option>
      </select>

      {/* Status Filter */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded-md"
      >
        <option value="">All</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Past">Past</option>
      </select>
    </div>
  );
};

export default Filters;

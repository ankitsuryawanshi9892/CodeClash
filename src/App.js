import React, { useEffect, useState } from 'react';
import eventsData from './data/events.json';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { fetchCodeforcesContests, fetchHackerEarthEvents } from './services/eventsService';

function App() {
  const [liveEvents, setLiveEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Filter values
  const [platform, setPlatform] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoFilter, setAutoFilter] = useState(true); // Toggle for auto/manual filtering

  useEffect(() => {
    const loadEvents = async () => {
      const cf = await fetchCodeforcesContests();
      // const he = await fetchHackerEarthEvents();

      const mapped = [
        ...cf.map(c => ({
          title: c.name,
          platform: "Codeforces",
          type: "Online",
          status: "Upcoming",
          start: new Date(c.startTimeSeconds * 1000).toISOString().split("T")[0],
          description: `Codeforces Round (${c.id})`,
          link: `https://codeforces.com/contest/${c.id}`
        })),
        // ...he.map(c => ({
        //   title: c.title,
        //   platform: "HackerEarth",
        //   type: "Online",
        //   status: c.status === 'UPCOMING' ? "Upcoming" : "Ongoing",
        //   start: c.start_timestamp.split("T")[0],
        //   description: c.description || "Hackathon on HackerEarth",
        //   link: c.url
        // }))
      ];

      setLiveEvents(mapped);
      const allEvents = [...eventsData, ...mapped];
      setEvents(allEvents);
      setFilteredEvents(allEvents);
    };

    loadEvents();
  }, []);

  // Apply filters automatically when filter states change
  useEffect(() => {
    if (autoFilter) {
      applyFilters();
    }
  }, [platform, type, status, searchQuery, autoFilter]);

  const applyFilters = () => {
    const filtered = events.filter((event) => {
      return (
        (platform.length === 0 || platform.includes(event.platform)) &&
        (type.length === 0 || type.includes(event.type)) &&
        (status.length === 0 || status.includes(event.status)) &&
        (searchQuery === '' || 
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
    setFilteredEvents(filtered);
  };

  const toggleFilterMode = () => {
    setAutoFilter(!autoFilter);
    if (!autoFilter) {
      applyFilters(); // Apply filters immediately when switching to auto mode
    }
  };

  return (
    <div>
      <Navbar
        platform={platform}
        setPlatform={setPlatform}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        applyFilters={applyFilters}
        autoFilter={autoFilter}
        toggleFilterMode={toggleFilterMode}
      />
      <Home events={filteredEvents} />
    </div>
  );
}

export default App;

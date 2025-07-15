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
  const [platform, setPlatform] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
      setEvents([...eventsData, ...mapped]);
      setFilteredEvents([...eventsData, ...mapped]); // optional: preload
    };

    loadEvents();
  }, []);

  const applyFilters = () => {
    const filtered = events.filter((event) => {
      return (
        (platform === '' || event.platform === platform) &&
        (type === '' || event.type === type) &&
        (status === '' || event.status === status) &&
        (searchQuery === '' || event.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
    setFilteredEvents(filtered);
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
      />
      <Home events={filteredEvents.length > 0 ? filteredEvents : liveEvents} />
    </div>
  );
}

export default App;

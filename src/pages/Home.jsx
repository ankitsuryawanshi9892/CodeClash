import React from 'react';
import EventCard from '../components/EventCard';

const Home = ({ events }) => {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        🚀 Upcoming Hackathons
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-400">No matching events found.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {events.map((event, i) => (
            <EventCard key={i} event={event} dark />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

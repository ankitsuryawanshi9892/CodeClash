import React from 'react';

const EventCard = ({ event, dark = false }) => {
  return (
    <div
      className={`rounded-2xl shadow-md p-4 hover:shadow-xl transition w-full md:w-[48%] lg:w-[32%] ${
        dark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-gray-800'}`}>
          {event.title}
        </h2>
        <button className={`text-red-500 hover:text-red-700 text-lg`}>❤️</button>
      </div>

      <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        {event.platform} • {event.type}
      </p>

      <p className={`mt-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
        {event.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-400'}`}>
          Starts: {event.start}
        </span>
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm hover:underline ${
            dark ? 'text-indigo-400' : 'text-blue-600'
          }`}
        >
          Register →
        </a>
      </div>
    </div>
  );
};

export default EventCard;

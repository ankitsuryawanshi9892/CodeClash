export const fetchCodeforcesContests = async () => {
  const res = await fetch('https://codeforces.com/api/contest.list');
  const data = await res.json();
  return data.result.filter(c => c.phase === 'BEFORE'); // Only upcoming
};

export const fetchHackerEarthEvents = async () => {
  const res = await fetch('https://www.hackerearth.com/chrome-extension/events/');
  const data = await res.json();
  return [...data.response.hackathons, ...data.response.hiring_challenges];
};

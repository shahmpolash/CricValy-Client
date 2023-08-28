import React, { useEffect, useState } from 'react';

const LiveScore = () => {
  const [liveScores, setLiveScores] = useState([]);
  const API_KEY = '2ccb531d-731d-4d81-b005-39e871fceff5'; // Replace with your CricAPI key

  useEffect(() => {
    const fetchLiveScores = async () => {
      try {
        const response = await fetch(
          `https://cricapi.com/api/matches?apikey=${API_KEY}`
        );
        const data = await response.json();
        setLiveScores(data.matches);
      } catch (error) {
        console.error('Error fetching live scores:', error);
      }
    };

    fetchLiveScores();
  }, []);

  return (
    <div>
      <h1>Live Cricket Scores</h1>
      <ul>
        {liveScores.map((match) => (
          <li key={match.unique_id}>
            {match.team1} vs {match.team2} - {match.matchStarted ? 'Live' : 'Upcoming'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveScore;

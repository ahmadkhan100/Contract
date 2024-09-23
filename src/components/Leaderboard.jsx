import React from 'react';

const Leaderboard = ({ leaderboard, startNewGame }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <table className="w-full mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">Player</th>
            <th className="px-4 py-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard[leaderboard.length - 1]
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <tr key={player.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button 
        onClick={startNewGame}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Start New Game
      </button>
    </div>
  );
};

export default Leaderboard;

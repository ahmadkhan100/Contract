import React from 'react';

const Leaderboard = ({ leaderboard, startNewGame }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Leaderboard</h1>
      <table className="w-full mb-4 bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-white">Rank</th>
            <th className="px-4 py-2 text-left text-white">Player</th>
            <th className="px-4 py-2 text-left text-white">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard[leaderboard.length - 1]
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <tr key={player.name} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                <td className="px-4 py-2 text-white">{index + 1}</td>
                <td className="px-4 py-2 text-white">{player.name}</td>
                <td className="px-4 py-2 text-white">{player.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button 
        onClick={startNewGame}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Start New Game
      </button>
    </div>
  );
};

export default Leaderboard;

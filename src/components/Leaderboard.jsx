import React from 'react';

const Leaderboard = ({ leaderboard, startNewGame }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Game</th>
            <th className="p-2 text-left">Winner</th>
            <th className="p-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((game, index) => {
            const winner = game.reduce((prev, current) => (prev.score > current.score) ? prev : current);
            return (
              <tr key={index} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{winner.name}</td>
                <td className="p-2">{winner.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={startNewGame} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        New Game
      </button>
    </div>
  );
};

export default Leaderboard;

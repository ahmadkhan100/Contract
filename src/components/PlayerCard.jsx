import React from 'react';
import { Trash2 } from 'lucide-react';

const PlayerCard = ({ player, bid, handleBid, handleWinLose, removePlayer, isWinLoseDisabled, cardsInRound, hasWon }) => {
  return (
    <div className="mb-4 p-4 bg-gray-800 shadow rounded">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">{player.name}</h3>
        <button onClick={() => removePlayer(player.name)} className="text-red-500 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <span className="font-semibold text-gray-300">Score:</span>
          <div className="text-2xl font-bold text-white">{player.score}</div>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Bid:</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleBid(player.name, 0)}
              className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              0
            </button>
            <input 
              type="number" 
              min="0" 
              max={cardsInRound}
              value={bid || ''}
              onChange={(e) => handleBid(player.name, parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 bg-gray-700 text-white border border-gray-600 rounded"
            />
          </div>
        </div>
        <button 
          onClick={() => handleWinLose(player.name, true)}
          disabled={isWinLoseDisabled || hasWon}
          className={`px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 ${hasWon ? 'bg-green-800' : ''}`}
        >
          Win
        </button>
        <button 
          onClick={() => handleWinLose(player.name, false)}
          disabled={isWinLoseDisabled}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Lose
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;

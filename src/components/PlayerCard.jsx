import React from 'react';
import { Trash2 } from 'lucide-react';

const PlayerCard = ({ player, bid, handleBid, handleWinLose, removePlayer, isWinLoseDisabled, cardsInRound, hasWon }) => {
  return (
    <div className="mb-4 p-4 bg-white border border-gray-200 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{player.name}</h3>
        <button onClick={() => removePlayer(player.name)} className="text-red-500 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <span className="font-semibold">Score:</span>
          <div className="text-2xl font-bold">{player.score}</div>
        </div>
        <div>
          <span className="font-semibold">Bid:</span>
          <div className="flex space-x-2">
            <input 
              type="number" 
              min="0" 
              max={cardsInRound}
              value={bid || ''}
              onChange={(e) => handleBid(player.name, parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border border-gray-300 rounded"
            />
          </div>
        </div>
        <button 
          onClick={() => handleWinLose(player.name, true)}
          disabled={isWinLoseDisabled || hasWon}
          className={`px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 ${hasWon ? 'bg-green-700' : ''}`}
        >
          Win
        </button>
        <button 
          onClick={() => handleWinLose(player.name, false)}
          disabled={isWinLoseDisabled || hasWon === false}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Lose
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;

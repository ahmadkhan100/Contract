import React from 'react';

const getSuit = (round, phase) => {
  if (phase === 1) {
    switch (round) {
      case 1: return 'Spades';
      case 2: return 'Hearts';
      case 3: return 'Clubs';
      case 4: return 'Diamonds';
      case 5: return 'High Card';
      case 6: return 'Spades';
      case 7: return 'Hearts';
      default: return '';
    }
  } else {
    switch (round) {
      case 1: return 'Clubs';
      case 2: return 'Diamonds';
      case 3: return 'High Card';
      case 4: return 'Spades';
      case 5: return 'Hearts';
      case 6: return 'Clubs';
      case 7: return 'Diamonds';
      default: return '';
    }
  }
};

const GameInfo = ({ currentRound, currentPhase, cardsInRound }) => {
  return (
    <div className="mb-6 p-4 bg-gray-800 shadow rounded">
      <h2 className="text-xl font-bold mb-2 text-white">Game Info</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="font-semibold text-gray-300">Round:</span>
          <div className="text-2xl font-bold text-white">{currentRound}</div>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Phase:</span>
          <div className="text-2xl font-bold text-white">{currentPhase}</div>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Cards:</span>
          <div className="text-2xl font-bold text-white">{cardsInRound}</div>
        </div>
        <div>
          <span className="font-semibold text-gray-300">Suit:</span>
          <div className="text-2xl font-bold text-white">{getSuit(currentRound, currentPhase)}</div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;

import React from 'react';

const getSuit = (round, phase) => {
  if (phase === 1) {
    switch (round) {
      case 7: return 'Spades';
      case 6: return 'Hearts';
      case 5: return 'Clubs';
      case 4: return 'Diamonds';
      case 3: return 'High Card';
      case 2: return 'Spades';
      case 1: return 'Hearts';
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
    <div className="mb-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Game Info</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="font-semibold">Round:</span>
          <div className="text-2xl font-bold">{currentRound}</div>
        </div>
        <div>
          <span className="font-semibold">Phase:</span>
          <div className="text-2xl font-bold">{currentPhase}</div>
        </div>
        <div>
          <span className="font-semibold">Cards:</span>
          <div className="text-2xl font-bold">{cardsInRound}</div>
        </div>
        <div>
          <span className="font-semibold">Suit:</span>
          <div className="text-2xl font-bold">{getSuit(currentRound, currentPhase)}</div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;

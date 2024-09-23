import React from 'react';

const getSuit = (round) => {
  if (round % 5 === 3) return 'High Card';
  const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
  return suits[(round - 1) % 4];
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
          <div className="text-2xl font-bold">{getSuit(currentRound)}</div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;

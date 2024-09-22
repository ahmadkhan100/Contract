import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';

const getSuit = (round) => {
  if (round % 5 === 3) return 'High Card';
  const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
  return suits[(round - 1) % 4];
};

const GameInfo = ({ currentRound, currentPhase, cardsInRound }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Game Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Round</Label>
            <div className="text-2xl font-bold">{currentRound}</div>
          </div>
          <div>
            <Label>Phase</Label>
            <div className="text-2xl font-bold">{currentPhase}</div>
          </div>
          <div>
            <Label>Cards</Label>
            <div className="text-2xl font-bold">{cardsInRound}</div>
          </div>
          <div>
            <Label>Suit</Label>
            <div className="text-2xl font-bold">{getSuit(currentRound)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameInfo;

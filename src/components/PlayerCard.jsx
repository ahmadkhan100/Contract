import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const PlayerCard = ({ player, bid, handleBid, handleWinLose, removePlayer, isWinLoseDisabled, cardsInRound }) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {player.name}
          <Button variant="destructive" size="sm" onClick={() => removePlayer(player.name)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div>
            <Label>Score</Label>
            <div className="text-2xl font-bold">{player.score}</div>
          </div>
          <div>
            <Label>Bid</Label>
            <Input 
              type="number" 
              min="0" 
              max={cardsInRound}
              value={bid || ''}
              onChange={(e) => handleBid(player.name, parseInt(e.target.value))}
              className="w-20"
            />
          </div>
          <Button 
            onClick={() => handleWinLose(player.name, true)}
            disabled={isWinLoseDisabled}
            className="bg-green-500 hover:bg-green-600"
          >
            Win
          </Button>
          <Button 
            onClick={() => handleWinLose(player.name, false)}
            disabled={isWinLoseDisabled}
            className="bg-red-500 hover:bg-red-600"
          >
            Lose
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;

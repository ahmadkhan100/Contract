import React, { useState, useEffect } from 'react';
import { AlertCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

const getSuit = (round) => {
  if (round % 5 === 3) return 'High Card';
  const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
  return suits[(round - 1) % 4];
};

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [cardsInRound, setCardsInRound] = useState(7);
  const [bids, setBids] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameMode, setGameMode] = useState('new'); // 'new', 'continue', 'leaderboard'

  useEffect(() => {
    const cards = currentPhase === 1 
      ? 8 - currentRound 
      : currentRound;
    setCardsInRound(cards);
  }, [currentRound, currentPhase]);

  const addPlayer = () => {
    if (newPlayerName && !players.find(p => p.name === newPlayerName)) {
      setPlayers([...players, { name: newPlayerName, score: 0 }]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerName) => {
    setPlayers(players.filter(p => p.name !== playerName));
    setBids(prevBids => {
      const { [playerName]: removed, ...rest } = prevBids;
      return rest;
    });
  };

  const handleBid = (playerName, bid) => {
    setBids(prev => ({ ...prev, [playerName]: bid }));
    validateBids({ ...bids, [playerName]: bid });
  };

  const handleWinLose = (playerName, won) => {
    const bid = bids[playerName] || 0;
    let score = 0;
    if (won) {
      if (bid === 0) {
        score = 10;
      } else {
        score = bid * 11 + 10;
      }
    }
    setPlayers(players.map(player =>
      player.name === playerName
        ? { ...player, score: player.score + score }
        : player
    ));
  };

  const nextRound = () => {
    if (currentRound === 7 && currentPhase === 2) {
      endGame();
      return;
    }
    
    if (currentRound === 7) {
      setCurrentRound(1);
      setCurrentPhase(2);
    } else {
      setCurrentRound(currentRound + 1);
    }

    setBids({});
    setPlayers(prevPlayers => {
      const rotatedPlayers = [...prevPlayers.slice(1), prevPlayers[0]];
      return rotatedPlayers;
    });
    setErrorMessage('');
  };

  const validateBids = (newBids) => {
    const totalBids = Object.values(newBids).reduce((sum, bid) => sum + (bid || 0), 0);
    if (totalBids === cardsInRound) {
      setErrorMessage('Error: Total bids cannot equal the number of cards in the round.');
    } else {
      setErrorMessage('');
    }
  };

  const isWinLoseDisabled = () => {
    return Object.keys(bids).length !== players.length || 
           Object.values(bids).reduce((sum, bid) => sum + (bid || 0), 0) === cardsInRound;
  };

  const endGame = () => {
    const gameResult = players.map(player => ({ name: player.name, score: player.score }));
    setLeaderboard(prevLeaderboard => [...prevLeaderboard, gameResult]);
    setGameMode('leaderboard');
  };

  const startNewGame = () => {
    setPlayers([]);
    setCurrentRound(1);
    setCurrentPhase(1);
    setBids({});
    setGameMode('new');
  };

  if (gameMode === 'leaderboard') {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Game</TableHead>
              <TableHead>Winner</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((game, index) => {
              const winner = game.reduce((prev, current) => (prev.score > current.score) ? prev : current);
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{winner.name}</TableCell>
                  <TableCell>{winner.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button onClick={startNewGame} className="mt-4 w-full">New Game</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Contract Card Game</h1>

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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Player</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name"
            />
            <Button onClick={addPlayer}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {players.map((player, index) => (
        <Card key={player.name} className="mb-4">
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
                  value={bids[player.name] || ''}
                  onChange={(e) => handleBid(player.name, parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
              <Button 
                onClick={() => handleWinLose(player.name, true)}
                disabled={isWinLoseDisabled()}
                className="bg-green-500 hover:bg-green-600"
              >
                Win
              </Button>
              <Button 
                onClick={() => handleWinLose(player.name, false)}
                disabled={isWinLoseDisabled()}
                className="bg-red-500 hover:bg-red-600"
              >
                Lose
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button 
        onClick={nextRound}
        className="mt-4 w-full"
      >
        Next Round
      </Button>

      {errorMessage && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default App;

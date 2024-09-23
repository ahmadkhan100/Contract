import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import AddPlayer from './components/AddPlayer';
import GameInfo from './components/GameInfo';
import PlayerCard from './components/PlayerCard';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [cardsInRound, setCardsInRound] = useState(7);
  const [bids, setBids] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameMode, setGameMode] = useState('new');
  const [roundHistory, setRoundHistory] = useState([]);
  const [winningPlayers, setWinningPlayers] = useState(new Set());

  useEffect(() => {
    const cards = currentPhase === 1 ? 8 - currentRound : currentRound;
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
    if (winningPlayers.has(playerName)) return;

    const bid = bids[playerName] || 0;
    let score = 0;
    if (won) {
      if (bid === 0) {
        score = 10;
      } else {
        score = bid * 11 + 10;
      }
      setWinningPlayers(new Set(winningPlayers.add(playerName)));
    }
    setPlayers(players.map(player =>
      player.name === playerName
        ? { ...player, score: player.score + score }
        : player
    ));
  };

  const nextRound = () => {
    setRoundHistory([...roundHistory, { round: currentRound, phase: currentPhase, players: [...players], bids: {...bids} }]);
    
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
    setWinningPlayers(new Set());
  };

  const goBack = () => {
    if (roundHistory.length > 0) {
      const lastRound = roundHistory.pop();
      setCurrentRound(lastRound.round);
      setCurrentPhase(lastRound.phase);
      setPlayers(lastRound.players);
      setBids(lastRound.bids);
      setRoundHistory([...roundHistory]);
      setWinningPlayers(new Set());
    }
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
    setGameMode('playing');
    setErrorMessage('');
    setRoundHistory([]);
    setWinningPlayers(new Set());
  };

  if (gameMode === 'leaderboard') {
    return (
      <div className="p-4 max-w-4xl mx-auto bg-gray-900 text-white min-h-screen">
        <Leaderboard leaderboard={leaderboard} startNewGame={startNewGame} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Contract Card Game</h1>

      {gameMode === 'new' && (
        <button 
          onClick={startNewGame}
          className="mb-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Start New Game
        </button>
      )}

      {gameMode === 'playing' && (
        <>
          <GameInfo
            currentRound={currentRound}
            currentPhase={currentPhase}
            cardsInRound={cardsInRound}
          />

          <AddPlayer
            newPlayerName={newPlayerName}
            setNewPlayerName={setNewPlayerName}
            addPlayer={addPlayer}
          />

          {players.map((player) => (
            <PlayerCard
              key={player.name}
              player={player}
              bid={bids[player.name]}
              handleBid={handleBid}
              handleWinLose={handleWinLose}
              removePlayer={removePlayer}
              isWinLoseDisabled={isWinLoseDisabled()}
              cardsInRound={cardsInRound}
              hasWon={winningPlayers.has(player.name)}
            />
          ))}

          <div className="flex justify-between mt-4">
            <button 
              onClick={goBack}
              className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
              disabled={roundHistory.length === 0}
            >
              Back
            </button>
            <button 
              onClick={nextRound}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Next Round
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-900 text-red-100 rounded">
              <AlertCircle className="inline-block mr-2 h-4 w-4" />
              <span>{errorMessage}</span>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default App;

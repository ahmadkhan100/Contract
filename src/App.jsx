import React, { useState, useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
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
  const [wins, setWins] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameMode, setGameMode] = useState('new');
  const [roundHistory, setRoundHistory] = useState([]);
  const [previousGameState, setPreviousGameState] = useState(null);

  useEffect(() => {
    loadGameState();
  }, []);

  useEffect(() => {
    const cards = currentPhase === 1 ? 8 - currentRound : currentRound;
    setCardsInRound(cards);
  }, [currentRound, currentPhase]);

  useEffect(() => {
    saveGameState();
  }, [players, currentRound, currentPhase, bids, wins, leaderboard, gameMode, roundHistory]);

  const saveGameState = () => {
    const gameState = {
      players,
      currentRound,
      currentPhase,
      bids,
      wins,
      leaderboard,
      gameMode,
      roundHistory
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  };

  const loadGameState = () => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const gameState = JSON.parse(savedState);
      setPlayers(gameState.players);
      setCurrentRound(gameState.currentRound);
      setCurrentPhase(gameState.currentPhase);
      setBids(gameState.bids);
      setWins(gameState.wins);
      setLeaderboard(gameState.leaderboard);
      setGameMode(gameState.gameMode);
      setRoundHistory(gameState.roundHistory);
    }
  };

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
    setWins(prevWins => {
      const { [playerName]: removed, ...rest } = prevWins;
      return rest;
    });
  };

  const handleBid = (playerName, bid) => {
    setBids(prev => ({
      ...prev,
      [playerName]: bid
    }));
    validateBids({ ...bids, [playerName]: bid });
  };

  const handleWinLose = (playerName, won) => {
    setWins(prev => ({ ...prev, [playerName]: won }));
    updateScores(playerName, bids[playerName], won);
  };

  const resetWinLose = (playerName) => {
    setWins(prev => {
      const { [playerName]: removed, ...rest } = prev;
      return rest;
    });
    
    if (roundHistory.length > 0) {
      const lastRound = roundHistory[roundHistory.length - 1];
      const playerLastRound = lastRound.players.find(p => p.name === playerName);
      if (playerLastRound) {
        setPlayers(prevPlayers => prevPlayers.map(player => 
          player.name === playerName ? { ...player, score: playerLastRound.score } : player
        ));
      }
    } else {
      setPlayers(prevPlayers => prevPlayers.map(player => 
        player.name === playerName ? { ...player, score: 0 } : player
      ));
    }
  };

  const updateScores = (playerName, bid, won) => {
    setPlayers(prevPlayers => prevPlayers.map(player => {
      if (player.name === playerName) {
        const scoreChange = won ? bid : -bid;
        return { ...player, score: player.score + scoreChange };
      }
      return player;
    }));
  };

  const validateBids = (bids) => {
    const totalBids = Object.values(bids).reduce((sum, bid) => sum + bid, 0);
    if (totalBids > cardsInRound) {
      setErrorMessage('Total bids cannot exceed the number of cards in the round.');
    } else {
      setErrorMessage('');
    }
  };

  const nextRound = () => {
    setRoundHistory([...roundHistory, { 
      round: currentRound, 
      phase: currentPhase, 
      players: [...players], 
      bids: {...bids}, 
      wins: {...wins}
    }]);
    
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
    setWins({});
    setPlayers(prevPlayers => {
      const rotatedPlayers = [...prevPlayers.slice(1), prevPlayers[0]];
      return rotatedPlayers; // Scores are not reset
    });
    setErrorMessage('');
  };

  const goBack = () => {
    if (roundHistory.length > 0) {
      const lastRound = roundHistory.pop();
      setCurrentRound(lastRound.round);
      setCurrentPhase(lastRound.phase);
      setPlayers(lastRound.players);
      setBids(lastRound.bids);
      setWins(lastRound.wins);
      setRoundHistory(roundHistory);
    }
  };

  const endGame = () => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setLeaderboard(sortedPlayers);
    setGameMode('leaderboard');
  };

  const startNewGame = () => {
    setPreviousGameState({
      players,
      currentRound,
      currentPhase,
      bids,
      wins,
      leaderboard,
      gameMode,
      roundHistory
    });
    setPlayers([]);
    setCurrentRound(1);
    setCurrentPhase(1);
    setBids({});
    setWins({});
    setGameMode('playing');
    setErrorMessage('');
    setRoundHistory([]);
    localStorage.removeItem('gameState');
  };

  const undoNewGame = () => {
    if (previousGameState) {
      setPlayers(previousGameState.players);
      setCurrentRound(previousGameState.currentRound);
      setCurrentPhase(previousGameState.currentPhase);
      setBids(previousGameState.bids);
      setWins(previousGameState.wins);
      setLeaderboard(previousGameState.leaderboard);
      setGameMode(previousGameState.gameMode);
      setRoundHistory(previousGameState.roundHistory);
      setPreviousGameState(null);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Contract Card Game</h1>

      <div className="mb-4 flex justify-between">
        <button 
          onClick={startNewGame}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          New Game
        </button>
        {previousGameState && (
          <button 
            onClick={undoNewGame}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 flex items-center"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Undo New Game
          </button>
        )}
      </div>

      {gameMode === 'leaderboard' && (
        <Leaderboard leaderboard={leaderboard} startNewGame={startNewGame} />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map((player) => (
              <PlayerCard
                key={player.name}
                player={player}
                bid={bids[player.name]}
                handleBid={handleBid}
                handleWinLose={handleWinLose}
                resetWinLose={resetWinLose}
                removePlayer={removePlayer}
                isWinLoseDisabled={isWinLoseDisabled()}
                cardsInRound={cardsInRound}
                hasWon={wins[player.name]}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button 
              onClick={goBack}
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              disabled={roundHistory.length === 0}
            >
              Back
            </button>
            <button 
              onClick={nextRound}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Next Round
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
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

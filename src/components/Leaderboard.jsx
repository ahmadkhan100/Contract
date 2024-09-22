import React from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const Leaderboard = ({ leaderboard, startNewGame }) => {
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
};

export default Leaderboard;

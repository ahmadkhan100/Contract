import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const AddPlayer = ({ newPlayerName, setNewPlayerName, addPlayer }) => {
  return (
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
  );
};

export default AddPlayer;

import React from 'react';
import { PlusCircle } from 'lucide-react';

const AddPlayer = ({ newPlayerName, setNewPlayerName, addPlayer }) => {
  return (
    <div className="mb-6 p-4 bg-white border border-gray-200 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Add Player</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player name"
          className="flex-grow px-3 py-2 border border-gray-300 rounded"
        />
        <button 
          onClick={addPlayer} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
        >
          <PlusCircle className="inline-block mr-2 h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddPlayer;

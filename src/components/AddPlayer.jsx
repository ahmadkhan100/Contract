import React from 'react';

const AddPlayer = ({ newPlayerName, setNewPlayerName, addPlayer }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
        placeholder="Enter player name"
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={addPlayer}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Player
      </button>
    </div>
  );
};

export default AddPlayer;

import React from 'react';

function LevelInstanceSelector({ title, selectedLevelInstance, setSelectedLevelInstance, instances }) {
//   if (!instances || instances.length === 0) return null;

  return (
    <div>
      <label className="block mb-1 font-medium">{title}</label>
      <select
        value={selectedLevelInstance}
        onChange={(e) => setSelectedLevelInstance(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select an instance</option>
        {instances.map((instance, index) => (
          <option key={index} value={instance}>
            {instance}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LevelInstanceSelector;

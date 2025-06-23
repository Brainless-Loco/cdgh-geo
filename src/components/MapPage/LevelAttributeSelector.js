import React from 'react';

function LevelAttributeSelector({ title, selectedLevel, levels, selectedLevelAttribute, setSelectedLevelAttribute }) {
  const attrs = selectedLevel && levels[selectedLevel]?.attributes;

  if (!attrs || attrs.length === 0) return null;

  return (
    <div>
      <label className="block mb-1 font-medium">{title}</label>
      <select
        value={selectedLevelAttribute}
        onChange={(e) => setSelectedLevelAttribute(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select an attribute</option>
        {attrs.map(attr => (
          <option key={attr.fullURI} value={attr.fullURI}>
            {attr.prefix}:{attr.shortName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LevelAttributeSelector;

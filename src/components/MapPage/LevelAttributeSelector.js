// src/components/LevelAttributeSelector.js
import React from 'react';

function LevelAttributeSelector({ title,selectedGeographicLevel, levels, selectedGeographicLevelAttribute, setSelectedGeographicLevelAttribute }) {
  const attrs = selectedGeographicLevel && levels[selectedGeographicLevel]?.attributes;

  if (!attrs || attrs.length === 0) return null;

  return (
    <div>
      <label className="block mb-1 font-medium">{title}</label>
      <select
        value={selectedGeographicLevelAttribute}
        onChange={(e) => setSelectedGeographicLevelAttribute(e.target.value)}
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

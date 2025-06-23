import React from 'react';
import LevelAttributeSelector from './LevelAttributeSelector';

function GeographicLevelSelector({  levels,selectedGeographicLevel, setSelectedGeographicLevel,selectedGeographicLevelAttribute,setSelectedGeographicLevelAttribute  }) {
  

  return (
    <div>
      <label className="block mb-1 font-medium">Geography Level</label>
      <select
        value={selectedGeographicLevel}
        onChange={(e) => setSelectedGeographicLevel(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">Select the Geography level</option>
        {Object.entries(levels).map(([uri, data]) => (
          <option key={uri} value={uri}>
            {data.prefix}:{data.shortName}
          </option>
        ))}
      </select>

      {
        selectedGeographicLevel &&
        <LevelAttributeSelector
          title={"Attribute for Geographic Level"}
          selectedLevel={selectedGeographicLevel}
          levels={levels}
          selectedLevelAttribute={selectedGeographicLevelAttribute}
          setSelectedLevelAttribute={setSelectedGeographicLevelAttribute}
          />
      }
    </div>
  );
}

export default GeographicLevelSelector;

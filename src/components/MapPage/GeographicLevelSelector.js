import React, { useEffect, useState } from 'react';
import LevelAttributeSelector from './LevelAttributeSelector';

function GeographicLevelSelector({ levels, selectedGeographicLevel, setSelectedGeographicLevel, selectedGeographicLevelAttribute, setSelectedGeographicLevelAttribute }) {



  const [filteredGrographicLevels, setFilteredGrographicLevels] = useState([]);

  useEffect(() => {
    if (levels) {
      const targetKeywords = ['adm1', 'adm2', 'adm3', 'country', 'cityCorporation', 'ward'];
      const filtered = Object.fromEntries(
        Object.entries(levels).filter(([key, value]) =>
          targetKeywords.some(keyword =>
            value.fullURI?.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      );
      setFilteredGrographicLevels(filtered);
    }
  }, [levels]);


  return (
    <div>
      <label className="block mb-1 font-medium">Geography Level</label>
      <select
        value={selectedGeographicLevel}
        onChange={(e) => setSelectedGeographicLevel(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="">Select the Geography level</option>
        {Object.entries(filteredGrographicLevels).map(([uri, data]) => (
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

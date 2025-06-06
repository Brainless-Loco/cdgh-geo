import React from 'react';
import { useLevels } from '../useHooks/useLevels';
import LevelAttributeSelector from './LevelAttributeSelector';

function GeographicLevelSelector({  prefixMap, setPrefixMap, selectedGrographicLevel, setSelectedGrographicLevel, selectedDataset,selectedGrographicLevelAttribute,setSelectedGrographicLevelAttribute  }) {
  

  const { levels } = useLevels(selectedDataset, prefixMap, setPrefixMap);

  return (
    <div>
      <label className="block mb-1 font-medium">Geography Level</label>
      <select
        value={selectedGrographicLevel}
        onChange={(e) => setSelectedGrographicLevel(e.target.value)}
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
        selectedGrographicLevel &&
        <LevelAttributeSelector
          title={"Attribute for Geographic Level"}
          selectedGrographicLevel={selectedGrographicLevel}
          levels={levels}
          selectedGrographicLevelAttribute={selectedGrographicLevelAttribute}
          setSelectedGrographicLevelAttribute={setSelectedGrographicLevelAttribute}
          />
      }
    </div>
  );
}

export default GeographicLevelSelector;

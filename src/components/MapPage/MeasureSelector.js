import React, { useEffect } from 'react';
import { extractMeasures } from '../useHooks/extractMeasures';

function MeasureSelector({
  measures,
  setMeasures,
  prefixMap,
  setPrefixMap,
  selectedMeasure,
  setSelectedMeasure,
  selectedDataset
}) {

  useEffect(() => {
    const fetch = async () => {
      try {
        const { measures, updatedPrefixMap } = await extractMeasures(prefixMap, selectedDataset);
        setMeasures(measures);
        setPrefixMap(updatedPrefixMap);
      } catch (e) {
        console.error("Failed to fetch measures:", e);
      }
    };

    fetch();
    // eslint-disable-next-line
  }, []); // only on mount

  const handleChange = (e) => {
    setSelectedMeasure(e.target.value);
  };


  return (
    <div>
      <label className="block mb-1 font-medium">Measure</label>
      <select
        value={selectedMeasure}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select a measure</option>
        {Object.entries(measures).map(([uri, data]) => (
          <option key={uri} value={uri}>
            {data.prefix}:{uri.split(/[#/]/).pop()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MeasureSelector;

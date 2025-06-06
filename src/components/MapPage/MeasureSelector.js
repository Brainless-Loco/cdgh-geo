import React, { useEffect } from 'react';
import { useMeasures } from '../useHooks/useMeasures';

function MeasureSelector({
  measures,
  setMeasures,
  prefixMap,
  setPrefixMap,
  selectedMeasure,
  setSelectedMeasure,
  setSelectedAggFunc,
  selectedDataset
}) {

  const { measures:fetchedMeasures } = useMeasures(prefixMap, setPrefixMap,selectedDataset);

  useEffect(() => {
    if (Object.keys(fetchedMeasures).length > 0) {
      setMeasures(fetchedMeasures);
    }
  }, [fetchedMeasures, setMeasures]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedMeasure(value);
    setSelectedAggFunc('sum');
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

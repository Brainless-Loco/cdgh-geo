import React, { useEffect, useState } from 'react';
import { useMeasures } from '../useHooks/useMeasures';

function MeasureSelector({
  measures,
  setMeasures,
  prefixMap,
  setPrefixMap,
  selectedMeasure,
  setSelectedMeasure,
  selectedDataset
}) {

  const [shouldFetch, setShouldFetch] = useState(true);
  const [localPrefixMap, setLocalPrefixMap] = useState(prefixMap);

  // eslint-disable-next-line 
  const { measures: fetchedMeasures, loading } = useMeasures(
    localPrefixMap,
    setLocalPrefixMap,
    selectedDataset
  );

  useEffect(() => {
    if (shouldFetch && Object.keys(fetchedMeasures).length > 0) {
      setMeasures(fetchedMeasures);
      setPrefixMap(localPrefixMap); // update the global one once
      setShouldFetch(false); // ensure it doesn't repeat
    }
  }, [shouldFetch, fetchedMeasures, localPrefixMap, setMeasures, setPrefixMap]);

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

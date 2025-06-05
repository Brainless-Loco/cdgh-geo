import React from 'react';

function AggregationSelector({
  measures,
  selectedMeasure,
  selectedAggFunc,
  setSelectedAggFunc,
}) {
  if (!selectedMeasure || !measures[selectedMeasure]) {
    return null; // Or show a placeholder if preferred
  }

  const aggregatedFunctions = measures[selectedMeasure].aggregatedFunctions;

  return (
    <div>
      <label className="block mb-1 font-medium">Aggregation</label>
      <select
        value={selectedAggFunc || ''}
        onChange={(e) => setSelectedAggFunc(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select aggregation</option>
        {aggregatedFunctions.map((func) => (
          <option key={func.fullURI} value={func.fullURI}>
            {`${func.prefix}:${func.name}`}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AggregationSelector;

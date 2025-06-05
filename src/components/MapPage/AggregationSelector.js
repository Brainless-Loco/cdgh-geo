import React, { useState } from 'react';

const functions = ['Sum', 'Average', 'Max', 'Min'];

function AggregationSelector() {
  const [agg, setAgg] = useState('Sum');

  return (
    <div>
      <label className="block mb-1 font-medium">Aggregation</label>
      <select
        value={agg}
        onChange={(e) => setAgg(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        {functions.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
    </div>
  );
}

export default AggregationSelector;

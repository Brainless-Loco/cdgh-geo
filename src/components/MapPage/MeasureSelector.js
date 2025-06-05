import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MeasureSelector() {
  const [measures, setMeasures] = useState([]);
  const [selected, setSelected] = useState('');

  // useEffect(() => {
  //   axios.get('/your-measure-sparql-endpoint').then((res) => {
  //     const options = res.data.results.bindings.map((b) => b.measure.value);
  //     setMeasures(options);
  //   });
  // }, []);

  return (
    <div>
      <label className="block mb-1 font-medium">Measure</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select a measure</option>
        {measures.map((measure) => (
          <option key={measure} value={measure}>{measure}</option>
        ))}
      </select>
    </div>
  );
}

export default MeasureSelector;

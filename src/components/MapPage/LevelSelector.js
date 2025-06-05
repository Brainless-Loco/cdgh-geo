import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LevelSelector() {
  const [levels, setLevels] = useState([]);
  const [selected, setSelected] = useState('');

  // useEffect(() => {
  //   axios.get('/your-sparql-endpoint').then((res) => {
  //     const options = res.data.results.bindings.map((b) => b.level.value);
  //     setLevels(options);
  //   });
  // }, []);

  return (
    <div>
      <label className="block mb-1 font-medium">Level</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select a level</option>
        {levels.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>
  );
}

export default LevelSelector;

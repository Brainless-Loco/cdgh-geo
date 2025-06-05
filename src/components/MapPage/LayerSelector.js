import React, { useState } from 'react';

function LayerSelector({ onChange }) {
  const [layer, setLayer] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setLayer(value);
    onChange?.(value); // Notify parent
  };

  return (
    <div>
      <label className="block mb-1 font-medium">Select Layer</label>
      <select
        value={layer}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">-- Choose --</option>
        <option value="adm1">ADM1</option>
        <option value="adm2">ADM2</option>
        <option value="adm3">ADM3</option>
      </select>
    </div>
  );
}

export default LayerSelector;

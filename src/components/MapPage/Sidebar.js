import React from 'react';
import LevelSelector from './LevelSelector';
import MeasureSelector from './MeasureSelector';
import AggregationSelector from './AggregationSelector';
import LayerSelector from './LayerSelector';

function Sidebar({ onLayerChange }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Map Controls</h2>
      <LayerSelector onChange={onLayerChange} />
      <LevelSelector />
      <MeasureSelector />
      <AggregationSelector />
    </div>
  );
}

export default Sidebar;

import React from 'react';
import LevelSelector from './LevelSelector';
import MeasureSelector from './MeasureSelector';
import AggregationSelector from './AggregationSelector';
import LayerSelector from './LayerSelector';

function Sidebar({
  onLayerChange,
  measures,
  setMeasures,
  prefixMap,
  setPrefixMap,
  selectedMeasure,
  setSelectedMeasure,
  selectedAggFunc,
  setSelectedAggFunc,
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Map Controls</h2>
      <LayerSelector onChange={onLayerChange} />
      <LevelSelector
        prefixMap={prefixMap}
        setPrefixMap={setPrefixMap}
        onLayerChange={onLayerChange}
      />
      <MeasureSelector
        measures={measures}
        setMeasures={setMeasures}
        prefixMap={prefixMap}
        setPrefixMap={setPrefixMap}
        selectedMeasure={selectedMeasure}
        setSelectedMeasure={setSelectedMeasure}
        setSelectedAggFunc={setSelectedAggFunc}
      />
      <AggregationSelector
        measures={measures}
        selectedMeasure={selectedMeasure}
        selectedAggFunc={selectedAggFunc}
        setSelectedAggFunc={setSelectedAggFunc}
      />
    </div>
  );
}

export default Sidebar;

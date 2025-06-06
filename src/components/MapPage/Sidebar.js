import React from 'react';
import DatasetSelector from './DatasetSelector';
import GeographicLevelSelector from './GeographicLevelSelector';
import MeasureSelector from './MeasureSelector';
import AggregationSelector from './AggregationSelector';
import LayerSelector from './LayerSelector';

function Sidebar({
  onLayerChange,
  prefixMap,
  setPrefixMap,
  
  measures,
  setMeasures,

  selectedDataset,
  setSelectedDataset,

  selectedGrographicLevel,
  setSelectedGrographicLevel,

  selectedGrographicLevelAttribute,
  setSelectedGrographicLevelAttribute,

  selectedMeasure,
  setSelectedMeasure,
  selectedAggFunc,
  setSelectedAggFunc,
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Map Controls</h2>
      <LayerSelector onChange={onLayerChange} />
      <DatasetSelector
        selectedDataset={selectedDataset}
        setSelectedDataset={setSelectedDataset}
        prefixMap={prefixMap}
        setPrefixMap={setPrefixMap}
      />
      {selectedDataset && (
        <>
          <GeographicLevelSelector
            prefixMap={prefixMap}
            setPrefixMap={setPrefixMap}
            onLayerChange={onLayerChange}
            selectedDataset={selectedDataset}
            selectedGrographicLevel={selectedGrographicLevel}
            setSelectedGrographicLevel={setSelectedGrographicLevel}
            selectedGrographicLevelAttribute={selectedGrographicLevelAttribute}
            setSelectedGrographicLevelAttribute={setSelectedGrographicLevelAttribute}
          />
          <MeasureSelector
            selectedDataset={selectedDataset}
            prefixMap={prefixMap}
            setPrefixMap={setPrefixMap}
            measures={measures}
            setMeasures={setMeasures}
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
        </>
      )}
    </div>
  );
}

export default Sidebar;

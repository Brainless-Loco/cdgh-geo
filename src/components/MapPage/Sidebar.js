import DatasetSelector from './DatasetSelector';
import GeographicLevelSelector from './GeographicLevelSelector';
import MeasureSelector from './MeasureSelector';
import AggregationSelector from './AggregationSelector';
import LayerSelector from './LayerSelector';
import TypeOfAnalysis from './TypeOfAnalysis';
import { useLevels } from '../useHooks/useLevels';
import HealthLevelSelector from './HealthLevelSelector';

function Sidebar({
  onLayerChange,
  prefixMap,
  setPrefixMap,

  measures,
  setMeasures,

  selectedDataset,
  setSelectedDataset,

  selectedGeographicLevel,
  setSelectedGeographicLevel,

  selectedGeographicLevelAttribute,
  setSelectedGeographicLevelAttribute,

  selectedTypeOfAnalysis,
  handleTypeOfAnalysisChange,

  selectedHealthLevel,
  setSelectedHealthLevel,

  selectedHealthLevelAttribute,
  setSelectedHealthLevelAttribute,

  selectedAggFunctionForHealthLevel,
  setSelectedAggFunctionForHealthLevel,

  selectedMeasure,
  setSelectedMeasure,

  selectedAggFunc,
  setSelectedAggFunc,
}) {

  const { levels } = useLevels(selectedDataset, prefixMap, setPrefixMap);


  return (
    <div className="flex flex-col gap-6 overflow-y-auto pb-5 h-[100vh]">
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
            levels={levels}
            onLayerChange={onLayerChange}
            selectedGeographicLevel={selectedGeographicLevel}
            setSelectedGeographicLevel={setSelectedGeographicLevel}
            selectedGeographicLevelAttribute={selectedGeographicLevelAttribute}
            setSelectedGeographicLevelAttribute={setSelectedGeographicLevelAttribute}
          />
          <TypeOfAnalysis selectedTypeOfAnalysis={selectedTypeOfAnalysis} handleTypeOfAnalysisChange={handleTypeOfAnalysisChange} />
          {
            selectedTypeOfAnalysis === 'Measure' &&
              <>
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
          }
          {
            selectedTypeOfAnalysis === 'Health Level' &&
              <>
                <HealthLevelSelector levels={levels}
                  onLayerChange={onLayerChange}
                  selectedHealthLevel={selectedHealthLevel}
                  setSelectedHealthLevel={setSelectedHealthLevel}
                  selectedHealthLevelAttribute={selectedHealthLevelAttribute}
                  setSelectedHealthLevelAttribute={setSelectedHealthLevelAttribute}
                  selectedAggFunctionForHealthLevel={selectedAggFunctionForHealthLevel}
                  setSelectedAggFunctionForHealthLevel={setSelectedAggFunctionForHealthLevel} 
                />
              </>
          }

        </>
      )}
    </div>
  );
}

export default Sidebar;

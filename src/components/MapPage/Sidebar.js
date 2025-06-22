import DatasetSelector from './DatasetSelector';
import GeographicLevelSelector from './GeographicLevelSelector';
import MeasureSelector from './MeasureSelector';
import LayerSelector from './LayerSelector';
import TypeOfAnalysis from './TypeOfAnalysis';
import { extractLevels } from '../useHooks/extractLevels';
import HealthLevelSelector from './HealthLevelSelector';
import { useEffect, useState } from 'react';

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

}) {

  // const { levels } = useLevels(selectedDataset, prefixMap, setPrefixMap);

  const [levels, setLevels] = useState([])

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDataset) return;
      try {
        const { levels, updatedPrefixMap } = await extractLevels(selectedDataset, prefixMap);
        setLevels(levels);
        setPrefixMap(updatedPrefixMap);
      } catch (e) {
        console.error('Failed to fetch levels:', e);
      }
    };

    fetch();
    // eslint-disable-next-line
  }, [selectedDataset]);


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
            <MeasureSelector
              selectedDataset={selectedDataset}
              prefixMap={prefixMap}
              setPrefixMap={setPrefixMap}
              measures={measures}
              setMeasures={setMeasures}
              selectedMeasure={selectedMeasure}
              setSelectedMeasure={setSelectedMeasure}
            />
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

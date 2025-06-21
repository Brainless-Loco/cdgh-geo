import DatasetSelector from './DatasetSelector';
import GeographicLevelSelector from './GeographicLevelSelector';
import MeasureSelector from './MeasureSelector';
import LayerSelector from './LayerSelector';
import TypeOfAnalysis from './TypeOfAnalysis';
import { useLevels } from '../useHooks/useLevels';
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

  const [shouldFetch, setShouldFetch] = useState(true);
  const [localPrefixMap, setLocalPrefixMap] = useState(prefixMap);

  // eslint-disable-next-line 
  const { levels: fetchedLevels, loading } =  useLevels(selectedDataset, localPrefixMap, setLocalPrefixMap);

  useEffect(() => {
    if (shouldFetch && Object.keys(fetchedLevels).length > 0) {
      setLevels(fetchedLevels);
      setPrefixMap(localPrefixMap); // update the global one once
      setShouldFetch(false); // ensure it doesn't repeat
    }
  }, [shouldFetch, fetchedLevels, localPrefixMap, setLevels, setPrefixMap]);


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

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
  selectedHealthLevelInstance,
  setSelectedHealthLevelInstance,

  selectedMeasure,
  setSelectedMeasure,

}) {

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
    <div className="flex flex-col overflow-y-hidden h-[100vh]">
      <div className='h-[95vh] px-2 overflow-auto py-2'>
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
                <MeasureSelector
                  selectedDataset={selectedDataset}
                  prefixMap={prefixMap}
                  setPrefixMap={setPrefixMap}
                  measures={measures}
                  setMeasures={setMeasures}
                  selectedMeasure={selectedMeasure}
                  setSelectedMeasure={setSelectedMeasure}
                />
                <HealthLevelSelector levels={levels}
                  onLayerChange={onLayerChange}
                  selectedHealthLevel={selectedHealthLevel}
                  setSelectedHealthLevel={setSelectedHealthLevel}
                  selectedHealthLevelAttribute={selectedHealthLevelAttribute}
                  setSelectedHealthLevelAttribute={setSelectedHealthLevelAttribute}
                  selectedHealthLevelInstance={selectedHealthLevelInstance}
                  setSelectedHealthLevelInstance={setSelectedHealthLevelInstance}
                />
              </>
            }

          </>
        )}

      </div>
      <div className="text-xs text-center px-3 bg-slate-200 h-[5vh] flex items-center justify-center">
        Developed by{" "}
        <a
          href="https://github.com/Brainless-Loco/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary transition ml-1"
        >
          Brainless-Loco
        </a>
      </div>



    </div>
  );
}

export default Sidebar;

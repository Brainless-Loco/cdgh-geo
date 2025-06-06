import React, { useState } from 'react';
import MapContainer from '../components/MapPage/MapContainer';
import Sidebar from '../components/MapPage/Sidebar';

function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState('');
  const [prefixMap, setPrefixMap] = useState({});

  const [selectedDataset, setSelectedDataset] = useState('');

  const [selectedGrographicLevel, setSelectedGrographicLevel] = useState('')
  const [selectedGrographicLevelAttribute, setSelectedGrographicLevelAttribute] = useState('')

  const [measures, setMeasures] = useState([])

  const [selectedMeasure, setSelectedMeasure] = useState('');

  const [selectedAggFunc, setSelectedAggFunc] = useState('');



  return (
    <div className="flex h-screen">
      <div className="w-4/5">
        <MapContainer
          selectedLayer={selectedLayer}
          selectedDataset={selectedDataset}
          selectedGrographicLevel={selectedGrographicLevel}
          selectedGrographicLevelAttribute={selectedGrographicLevelAttribute}
          selectedMeasure={selectedMeasure}
          selectedAggFunc={selectedAggFunc}
        />
      </div>
      <div className="w-1/5 bg-gray-100 p-4">
        <Sidebar
          onLayerChange={setSelectedLayer}

          prefixMap={prefixMap}
          setPrefixMap={setPrefixMap}

          selectedDataset={selectedDataset}
          setSelectedDataset={setSelectedDataset}

          selectedGrographicLevel={selectedGrographicLevel}
          setSelectedGrographicLevel={setSelectedGrographicLevel}

          selectedGrographicLevelAttribute={selectedGrographicLevelAttribute}
          setSelectedGrographicLevelAttribute={setSelectedGrographicLevelAttribute}

          measures={measures}
          setMeasures={setMeasures}

          selectedMeasure={selectedMeasure}
          setSelectedMeasure={setSelectedMeasure}

          selectedAggFunc={selectedAggFunc}
          setSelectedAggFunc={setSelectedAggFunc}
        />
      </div>
    </div>
  );
}

export default MapPage;

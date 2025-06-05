import React, { useState } from 'react';
import MapContainer from '../components/MapPage/MapContainer';
import Sidebar from '../components/MapPage/Sidebar';

function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState('');
  const [measures, setMeasures] = useState({});
  const [prefixMap, setPrefixMap] = useState({});
  const [selectedMeasure, setSelectedMeasure] = useState(''); // selected measure URI
  const [selectedAggFunc, setSelectedAggFunc] = useState(''); // selected aggregation function URI

  return (
    <div className="flex h-screen">
      <div className="w-4/5">
        <MapContainer selectedLayer={selectedLayer} />
      </div>
      <div className="w-1/5 bg-gray-100 p-4">
        <Sidebar
          onLayerChange={setSelectedLayer}
          prefixMap={prefixMap}
          setPrefixMap={setPrefixMap}
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

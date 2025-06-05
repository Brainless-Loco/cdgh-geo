import React, { useState } from 'react';
import MapContainer from '../components/MapPage/MapContainer';
import Sidebar from '../components/MapPage/Sidebar';

function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState('');

  return (
    <div className="flex h-screen">
      <div className="w-4/5">
        <MapContainer selectedLayer={selectedLayer} />
      </div>
      <div className="w-1/5 bg-gray-100 p-4">
        <Sidebar onLayerChange={setSelectedLayer} />
      </div>
    </div>
  );
}

export default MapPage;
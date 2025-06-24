import React, { useState, useEffect } from 'react';
import MapContainer from '../components/MapPage/MapContainer';
import Sidebar from '../components/MapPage/Sidebar';

function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState('');
  const [prefixMap, setPrefixMap] = useState({});

  const [selectedDataset, setSelectedDataset] = useState('');

  const [selectedGeographicLevel, setSelectedGeographicLevel] = useState('')
  const [selectedGeographicLevelAttribute, setSelectedGeographicLevelAttribute] = useState('')


  const [selectedTypeOfAnalysis, setSelectedTypeOfAnalysis] = useState('')
  const handleTypeOfAnalysisChange = (e) => {
    const value = e.target.value;
    setSelectedTypeOfAnalysis(value);
    if (value === 'Measure') {
      setSelectedHealthLevel('')
      setSelectedHealthLevelAttribute('')
    }
    else {
      setSelectedMeasure('')
    }
  };

  const [selectedHealthLevel, setSelectedHealthLevel] = useState('')
  const [selectedHealthLevelAttribute, setSelectedHealthLevelAttribute] = useState('')
  const [selectedHealthLevelInstance, setSelectedHealthLevelInstance] = useState('')

  const [measures, setMeasures] = useState([])

  const [selectedMeasure, setSelectedMeasure] = useState('');

  useEffect(() => {
    setSelectedDataset('');
    setSelectedGeographicLevel('');
    setSelectedGeographicLevelAttribute('');
    setSelectedTypeOfAnalysis('');
    setSelectedHealthLevel('');
    setSelectedHealthLevelAttribute('');
    setSelectedHealthLevelInstance('')
    setSelectedMeasure('');
  }, [selectedLayer]);

  useEffect(() => {
    setSelectedGeographicLevel('')
    setSelectedGeographicLevelAttribute('')
    setSelectedTypeOfAnalysis('')
    setSelectedHealthLevelAttribute('')
    setSelectedMeasure('')
  }, [selectedDataset])

  useEffect(() => {
    setSelectedGeographicLevelAttribute('');
    setSelectedMeasure('');
    setSelectedTypeOfAnalysis('')
    setSelectedHealthLevel('')
    setSelectedHealthLevelAttribute('')
    setSelectedHealthLevelInstance('')
  }, [selectedGeographicLevel]);

  useEffect(() => {
    setSelectedMeasure('');
    setSelectedHealthLevel('');
    setSelectedHealthLevelAttribute('');
    setSelectedHealthLevelInstance('')
  }, [selectedTypeOfAnalysis]);

  useEffect(()=>{
    setSelectedHealthLevelAttribute('')
    setSelectedHealthLevelInstance('')
  },[selectedHealthLevel])


  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className="w-4/5 overflow-x-hidden">
        <MapContainer
          selectedLayer={selectedLayer}
          selectedDataset={selectedDataset}
          selectedGeographicLevel={selectedGeographicLevel}
          selectedGeographicLevelAttribute={selectedGeographicLevelAttribute}
          selectedTypeOfAnalysis={selectedTypeOfAnalysis}
          selectedMeasure={selectedMeasure}
          selectedHealthLevel={selectedHealthLevel}
          selectedHealthLevelAttribute={selectedHealthLevelAttribute}
          selectedHealthLevelInstance={selectedHealthLevelInstance}
        />
      </div>
      <div className="w-1/5 py-0 bg-gray-100">
        <Sidebar
          onLayerChange={setSelectedLayer}

          prefixMap={prefixMap}
          setPrefixMap={setPrefixMap}

          selectedDataset={selectedDataset}
          setSelectedDataset={setSelectedDataset}

          selectedGeographicLevel={selectedGeographicLevel}
          setSelectedGeographicLevel={setSelectedGeographicLevel}

          selectedGeographicLevelAttribute={selectedGeographicLevelAttribute}
          setSelectedGeographicLevelAttribute={setSelectedGeographicLevelAttribute}

          selectedTypeOfAnalysis={selectedTypeOfAnalysis}
          handleTypeOfAnalysisChange={handleTypeOfAnalysisChange}

          selectedHealthLevel={selectedHealthLevel}
          setSelectedHealthLevel={setSelectedHealthLevel}

          selectedHealthLevelAttribute={selectedHealthLevelAttribute}
          setSelectedHealthLevelAttribute={setSelectedHealthLevelAttribute}
          selectedHealthLevelInstance={selectedHealthLevelInstance}
          setSelectedHealthLevelInstance={setSelectedHealthLevelInstance}

          measures={measures}
          setMeasures={setMeasures}

          selectedMeasure={selectedMeasure}
          setSelectedMeasure={setSelectedMeasure}
        />
      </div>
    </div>
  );
}

export default MapPage;

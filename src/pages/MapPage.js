import React, { useState, useEffect } from 'react';
import MapContainer from '../components/MapPage/MapContainer';
import Sidebar from '../components/MapPage/Sidebar';

function MapPage() {
  const [selectedLayer, setSelectedLayer] = useState('');
  const [prefixMap, setPrefixMap] = useState({});

  const [selectedDataset, setSelectedDataset] = useState('');

  const [selectedGeographicLevel, setSelectedGeographicLevel] = useState('')
  const [selectedGeographicLevelAttribute, setSelectedGeographicLevelAttribute] = useState('')


  const [selectedTypeOfAnalysis, setselectedTypeOfAnalysis] = useState('')
  const handleTypeOfAnalysisChange = (e) => {
    const value = e.target.value;
    setselectedTypeOfAnalysis(value);
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
  const [selectedAggFunctionForHealthLevel, setSelectedAggFunctionForHealthLevel] = useState('')

  const [measures, setMeasures] = useState([])

  const [selectedMeasure, setSelectedMeasure] = useState('');

  
  useEffect(() => {
    setSelectedGeographicLevel('')
    setSelectedGeographicLevelAttribute('')
    setselectedTypeOfAnalysis('')
    setSelectedHealthLevelAttribute('')
    setSelectedAggFunctionForHealthLevel('')
    setSelectedMeasure('')
  }, [selectedDataset])


  return (
    <div className="flex h-screen">
      <div className="w-4/5">
        <MapContainer
          selectedLayer={selectedLayer}
          selectedDataset={selectedDataset}
          selectedGeographicLevel={selectedGeographicLevel}
          selectedGeographicLevelAttribute={selectedGeographicLevelAttribute}
          selectedTypeOfAnalysis={selectedTypeOfAnalysis}
          selectedMeasure={selectedMeasure}
          selectedHealthLevel={selectedHealthLevel}
          selectedHealthLevelAttribute={selectedHealthLevelAttribute}
          selectedAggFunctionForHealthLevel={selectedAggFunctionForHealthLevel}
        />
      </div>
      <div className="w-1/5 bg-gray-100 p-4">
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

          selectedAggFunctionForHealthLevel={selectedAggFunctionForHealthLevel}
          setSelectedAggFunctionForHealthLevel={setSelectedAggFunctionForHealthLevel}

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

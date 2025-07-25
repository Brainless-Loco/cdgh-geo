import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import stringSimilarity from 'string-similarity';
import { queryVirtuoso } from '../useHooks/queryVirtuoso';
// eslint-disable-next-line
import BasicMap from './BasicMap';
// import { getLocalName } from './../utils/getLocalName';
import { QUERY_TO_GET_HEALTH_LEVEL_ANALYSIS, QUERY_TO_GET_MEASURE_FOR_GEOGRAPHIC_LEVEL } from '../utils/queries';

function MapContainer({
  selectedLayer,
  selectedDataset,
  selectedGeographicLevel,
  selectedGeographicLevelAttribute,
  selectedMeasure,
  selectedTypeOfAnalysis,
  selectedHealthLevel,
  selectedHealthLevelAttribute,
  selectedHealthLevelInstance
}) {
  const [geoJson, setGeoJson] = useState(null);
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    if (selectedLayer) {
      fetch(`/geojson/${selectedLayer}.geojson`)
        .then((res) => res.json())
        .then((data) => setGeoJson(data));
    }
  }, [selectedLayer]);



  // Call for Measures
  useEffect(() => {
    const ready = selectedLayer && selectedDataset && selectedGeographicLevel && selectedGeographicLevelAttribute && selectedMeasure

    if (!ready || selectedTypeOfAnalysis !== 'Measure') return;

    const QUERY = QUERY_TO_GET_MEASURE_FOR_GEOGRAPHIC_LEVEL(selectedDataset, selectedMeasure, selectedGeographicLevel, selectedGeographicLevelAttribute)

    const fetchData = async () => {
      try {
        const bindings = await queryVirtuoso(QUERY);
        const regionStats = bindings.map(b => ({
          name: b.regionName.value,
          value: parseFloat(b.value.value),
        }));

        // Map fuzzy names to geojson shape IDs
        const matched = geoJson?.features.map(feature => {
          const shapeName = feature.properties.shapeName;
          const { bestMatch } = stringSimilarity.findBestMatch(
            shapeName,
            regionStats.map(r => r.name)
          );

          const stat = regionStats.find(r => r.name === bestMatch.target);
          return {
            id: feature.properties.shapeID,
            value: bestMatch.rating > 0.4 ? stat?.value ?? 0 : 0,
          };
        })

        setMappedData(matched || []);
      } catch (e) {
        console.error('Query/map fetch failed:', e);
      }
    };

    fetchData();
  },
    [selectedDataset, selectedGeographicLevel, selectedGeographicLevelAttribute, selectedMeasure, geoJson, selectedLayer, selectedTypeOfAnalysis]);

  useEffect(() => {
    const ready =
      selectedLayer &&
      selectedDataset &&
      selectedGeographicLevel &&
      selectedGeographicLevelAttribute &&
      selectedHealthLevel &&
      selectedHealthLevelAttribute &&
      selectedHealthLevelInstance &&
      selectedMeasure;

    if (!ready || selectedTypeOfAnalysis === 'Measure') return;

    const QUERY = QUERY_TO_GET_HEALTH_LEVEL_ANALYSIS(
      selectedDataset,
      selectedMeasure,
      selectedGeographicLevel,
      selectedGeographicLevelAttribute,
      selectedHealthLevel,
      selectedHealthLevelAttribute,
      selectedHealthLevelInstance
    );

    // console.log(QUERY)

    const fetchData = async () => {
      try {
        const bindings = await queryVirtuoso(QUERY);

        const regionStats = bindings.map((b) => ({
          name: b.geographyDim_adm1Name.value,
          category: b.BMICategory_BMICategoryName.value,
          value: parseFloat(b.numOfPatient_sum.value),
        }));

        // Optional: do something with regionStats or visualize it
        // console.log('Fetched regionStats with health & geo hierarchy:', regionStats);

        // If mapping to geoJson needed:
        const matched = geoJson?.features.map((feature) => {
          const shapeName = feature.properties.shapeName;
          const { bestMatch } = stringSimilarity.findBestMatch(
            shapeName,
            regionStats.map((r) => r.name)
          );

          const stat = regionStats.find((r) => r.name === bestMatch.target);
          return {
            id: feature.properties.shapeID,
            value: bestMatch.rating > 0.6 ? stat?.value ?? 0 : 0,
          };
        });

        setMappedData(matched || []);
      } catch (e) {
        console.error('Query/map fetch failed:', e);
      }
    };

    fetchData();
  }, 
  [
    selectedDataset, selectedGeographicLevel, selectedGeographicLevelAttribute,
    selectedHealthLevel, selectedHealthLevelAttribute, selectedHealthLevelInstance,
    geoJson, selectedLayer, selectedTypeOfAnalysis, selectedMeasure
  ]);




  return (
    <div className="w-full h-[100vh] overflow-y-hidden">
      {/* {geoJson && mappedData.length ==0 &&
        <BasicMap geoJson={geoJson}/>
      } */}
      {geoJson && mappedData.length > 0 && (
        <Plot
          data={[
            {
              type: 'choroplethmap',
              geojson: geoJson,
              locations: mappedData.map(m => m.id) ?? geoJson.features.map(f => f.properties.shapeID),
              z: mappedData.map(m => m.value) ?? geoJson.features.map(() => 0),
              featureidkey: 'properties.shapeID',
              colorscale: 'RdOrYl',
              colorbar: { title: 'Sum' },
              text: geoJson.features.map(f => f.properties.shapeName),
            },
          ]}
          layout={{
            map: {
              style: 'white-bg',
              // 'open-street-map', or 'white-bg', 'carto-positron'
              center: { lat: 23.685, lon: 90.3563 },
              zoom: 6.1,
            },
            margin: { t: 0, b: 0, r: 0, l: 0 },
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}

export default MapContainer;

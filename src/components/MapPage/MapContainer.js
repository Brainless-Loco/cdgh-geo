import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import stringSimilarity from 'string-similarity';
import { queryVirtuoso } from '../useHooks/queryVirtuoso';
import BasicMap from './BasicMap';

function MapContainer({
  selectedLayer,
  selectedDataset,
  selectedGrographicLevel,
  selectedGrographicLevelAttribute,
  selectedMeasure,
  selectedAggFunc,
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

  useEffect(() => {
    const ready =
      selectedLayer &&
      selectedDataset &&
      selectedGrographicLevel &&
      selectedGrographicLevelAttribute &&
      selectedMeasure &&
      selectedAggFunc;

    if (!ready) return;

    const getLocalName = (uri) => {
      const match = uri.match(/[#\/]([^#\/]+)$/);
      return match ? match[1].toUpperCase() : uri;
    };

    const aggFuncShort = getLocalName(selectedAggFunc);

    const QUERY = `
      PREFIX qb: <http://purl.org/linked-data/cube#>
      PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      SELECT ?regionName (${aggFuncShort}(xsd:integer(?m)) as ?value)
      WHERE {
        ?o a qb:Observation ;
           qb:dataSet <${selectedDataset}> ;
           <${selectedMeasure}> ?m ;
           <${selectedGrographicLevel}> ?geoEntity .

        ?geoEntity qb4o:memberOf <${selectedGrographicLevel}> ;
                   <${selectedGrographicLevelAttribute}> ?regionName .
      }
      GROUP BY ?regionName
      ORDER BY ?regionName
    `;
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
          const match = stringSimilarity.findBestMatch(
            shapeName,
            regionStats.map(r => r.name)
          ).bestMatch;

          const stat = regionStats.find(r => r.name === match.target);
          return {
            id: feature.properties.shapeID,
            value: stat?.value ?? 0,
          };
        });

        setMappedData(matched || []);
      } catch (e) {
        console.error('Query/map fetch failed:', e);
      }
    };

    fetchData();
  }, 
  [ selectedDataset, selectedGrographicLevel, selectedGrographicLevelAttribute, selectedMeasure, selectedAggFunc, geoJson, selectedLayer]);

  return (
    <div className="w-full h-[100vh]">
      {/* {geoJson!=null &&
        <BasicMap geoJson={geoJson}/>
      } */}
      {geoJson && mappedData.length > 0 && (
        <Plot
          data={[
            {
              type: 'choroplethmapbox',
              geojson: geoJson,
              locations: mappedData.map(m => m.id),
              z: mappedData.map(m => m.value),
              featureidkey: 'properties.shapeID',
              colorscale: 'RdOrYl',
              colorbar: { title: selectedAggFunc },
              text: geoJson.features.map(f => f.properties.shapeName),
            },
          ]}
          layout={{
            mapbox: {
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

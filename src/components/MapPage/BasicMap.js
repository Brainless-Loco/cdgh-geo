import Plot from 'react-plotly.js';

export default function BasicMap({geoJson}) {
    return (
        <div className='w-full h-full'>
            <Plot
                data={[
                    {
                        type: 'choroplethmap',
                        geojson: geoJson,
                        locations: geoJson.features.map(f => f.properties.shapeID),
                        z: geoJson.features.map(() => 1), // dummy values
                        text: geoJson.features.map(f => f.properties.shapeName),
                        featureidkey: 'properties.shapeID',
                        colorscale: 'Viridis',
                        showscale: false,
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

        </div>
    )
}

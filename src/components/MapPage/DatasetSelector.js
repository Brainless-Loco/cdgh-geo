import React, { useEffect, useState } from 'react';
import { extractDatasets } from './../useHooks/extractDatasets';

function DatasetSelector({ selectedDataset, setSelectedDataset, prefixMap, setPrefixMap }) {

    const [datasets, setDatasets] = useState([])
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { datasets, updatedPrefixMap } = await extractDatasets(prefixMap);
                setDatasets(datasets);
                setPrefixMap(updatedPrefixMap);
            } catch (e) {
                console.error('Failed to fetch datasets:', e);
            } finally {
                setLoading(false);
            }
        };

        fetch();
        // eslint-disable-next-line
    }, []); // only once on mount



    return (
        <div>
            <label className="block mb-1 font-medium">Dataset</label>
            <select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
            >
                <option value="">Select a dataset</option>
                {datasets.map((ds) => (
                    <option key={ds.uri} value={ds.uri}>
                        {ds.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DatasetSelector;

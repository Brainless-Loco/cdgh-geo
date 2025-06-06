import React from 'react';
import { useDatasets } from './../useHooks/useDatasets';

function DatasetSelector({ selectedDataset, setSelectedDataset, prefixMap, setPrefixMap }) {

    const { datasets } = useDatasets(prefixMap, setPrefixMap);

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

import React from 'react';
import LevelAttributeSelector from './LevelAttributeSelector';

function HealthLevelSelector({ levels, selectedHealthLevel, setSelectedHealthLevel, selectedHealthLevelAttribute, setSelectedHealthLevelAttribute, selectedAggFunctionForHealthLevel, setSelectedAggFunctionForHealthLevel }) {


    return (
        <div>
            <label className="block mb-1 font-medium">Health Level</label>
            <select
                value={selectedHealthLevel}
                onChange={(e) => setSelectedHealthLevel(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
                <option value="">Select the Health level</option>
                {Object.entries(levels).map(([uri, data]) => (
                    <option key={uri} value={uri}>
                        {data.prefix}:{data.shortName}
                    </option>
                ))}
            </select>

            {
                selectedHealthLevel &&
                <>
                    <LevelAttributeSelector
                        title={"Attribute for Health Level"}
                        selectedHealthLevel={selectedHealthLevel}
                        levels={levels}
                        selectedHealthLevelAttribute={selectedHealthLevelAttribute}
                        setSelectedHealthLevelAttribute={setSelectedHealthLevelAttribute}
                    />
                    <label className="block mb-1 font-medium">Aggregation</label>
                    <select
                        value={selectedAggFunctionForHealthLevel}
                        onChange={(e) => setSelectedAggFunctionForHealthLevel(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    >
                        <option value="">-- Choose --</option>
                        <option value="avg">Average</option>
                    </select>
                </>

            }

        </div>
    );
}

export default HealthLevelSelector;

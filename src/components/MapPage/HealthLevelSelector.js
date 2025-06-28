import React, { useState, useEffect } from 'react';
import LevelAttributeSelector from './LevelAttributeSelector';
import LevelInstanceSelector from './LevelInstanceSelector';
import { extractLevelInstances } from './../useHooks/extractLevelInstances';

function HealthLevelSelector({ levels, selectedHealthLevel, setSelectedHealthLevel, selectedHealthLevelAttribute, setSelectedHealthLevelAttribute, selectedHealthLevelInstance, setSelectedHealthLevelInstance }) {

    const [levelInstances, setLevelInstances] = useState([])

    const [filteredHealthLevels, setFilteredHealthLevels] = useState([])

    useEffect(() => {
        if (levels) {
            const targetKeywords = ['category', 'group', 'sex'];
            const filtered = Object.fromEntries(
                Object.entries(levels).filter(([key, value]) =>
                    targetKeywords.some(keyword =>
                        value.fullURI?.toLowerCase().includes(keyword.toLowerCase())
                    )
                )
            );
            setFilteredHealthLevels(filtered);
        }
    }, [levels]);

    useEffect(() => {

        const fetchInstances = async () => {
            if (!selectedHealthLevel || !selectedHealthLevelAttribute) return;

            try {
                const instances = await extractLevelInstances(selectedHealthLevel, selectedHealthLevelAttribute);
                setLevelInstances(instances);
            } catch (e) {
                console.error('Failed to fetch level instances:', e);
            }
        };

        fetchInstances();
        // eslint-disable-next-line
    }, [selectedHealthLevel, selectedHealthLevelAttribute]);

    return (
        <div>
            <label className="block mb-1 font-medium">Health Level</label>
            <select
                value={selectedHealthLevel}
                onChange={(e) => setSelectedHealthLevel(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
                <option value="">Select the Health level</option>
                {Object.entries(filteredHealthLevels).map(([uri, data]) => (
                    <option key={uri} value={uri}>
                        {data.prefix}:{data.shortName}
                    </option>
                ))}
            </select>

            {
                selectedHealthLevel &&
                <>
                    <LevelAttributeSelector
                        title={"Attribute to show instances as"}
                        selectedLevel={selectedHealthLevel}
                        levels={levels}
                        selectedAttribute={selectedHealthLevelAttribute}
                        setSelectedLevelAttribute={setSelectedHealthLevelAttribute}
                    />
                    <LevelInstanceSelector
                        title={"Level Instance"}
                        selectedLevelInstance={selectedHealthLevelInstance}
                        setSelectedLevelInstance={setSelectedHealthLevelInstance}
                        instances={levelInstances}
                    />
                </>

            }

        </div>
    );
}

export default HealthLevelSelector;

import React from 'react'

export default function TypeOfAnalysis({ selectedTypeOfAnalysis, handleTypeOfAnalysisChange }) {
    return (
        <div>
            <label className="block mb-1 font-medium">Select Type of Analysis</label>
            <select
                value={selectedTypeOfAnalysis}
                onChange={handleTypeOfAnalysisChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
            >
                <option value="">-- Choose --</option>
                <option value="Measure">Measure</option>
                <option value="Health Level">Health Level</option>
            </select>
        </div>
    )
}

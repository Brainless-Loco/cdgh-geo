import { useEffect, useState } from 'react';
import { queryVirtuoso } from './queryVirtuoso';


const GRAPH_URI = process.env.REACT_APP_SPARQL_GRAPH;



export const useMeasures = (prefixMap, setPrefixMap, selectedDataset) => {
    const [measures, setMeasures] = useState({});
    const [loading, setLoading] = useState(true);

    const MEASURE_QUERY = `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
SELECT DISTINCT ?measure ?aggFunc
FROM <${GRAPH_URI}>
WHERE {
  <${selectedDataset}> a qb:DataSet ;
           qb:structure ?cuboid .
  ?cuboid qb:component ?bnode .
  ?bnode qb:measure ?measure ;
         qb4o:aggregateFunction ?aggFunc .
}
ORDER BY ?measure ?aggFunc
`;

console.log(MEASURE_QUERY)

    useEffect(() => {
        const fetchMeasures = async () => {
            try {
                const bindings = await queryVirtuoso(MEASURE_QUERY);
                const parsed = {};
                let prefixIndex = Object.keys(prefixMap).length + 1;
                const updatedPrefixMap = { ...prefixMap };

                const getPrefixedName = (uri) => {
                    // eslint-disable-next-line
                    const match = uri.match(/^(.*[\/#])([^\/#]+)$/);
                    if (!match) return { prefix: '', value: uri };
                    
                    // eslint-disable-next-line
                    const [_, base, local] = match;

                    let existingPrefix = Object.entries(updatedPrefixMap).find(
                        ([, existingBase]) => existingBase === base
                    );

                    let prefix;
                    if (existingPrefix) {
                        prefix = existingPrefix[0];
                    } else {
                        prefix = `prefix${prefixIndex++}`;
                        updatedPrefixMap[prefix] = base;
                    }

                    return { prefix, value: local };
                };

                bindings.forEach(({ measure, aggFunc }) => {
                    const measureUri = measure.value;
                    const aggFuncUri = aggFunc.value;

                    const m = getPrefixedName(measureUri);
                    const a = getPrefixedName(aggFuncUri);

                    if (!parsed[measureUri]) {
                        parsed[measureUri] = {
                            prefix: m.prefix,
                            shortName: m.value,
                            aggregatedFunctions: [],
                        };
                    }

                    const alreadyAdded = parsed[measureUri].aggregatedFunctions.some(
                        (f) => f.fullURI === aggFuncUri
                    );

                    if (!alreadyAdded) {
                        parsed[measureUri].aggregatedFunctions.push({
                            name: a.value,
                            prefix: a.prefix,
                            fullURI: aggFuncUri,
                        });
                    }
                });

                setPrefixMap(updatedPrefixMap);
                setMeasures(parsed);
            } catch (e) {
                console.error('Failed to fetch measures:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchMeasures();
    }, [prefixMap,setPrefixMap, MEASURE_QUERY]);



    return { measures, loading };
};

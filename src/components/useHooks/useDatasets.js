import { useEffect, useState } from 'react';
import { queryVirtuoso } from '../useHooks/queryVirtuoso';

const DATASET_QUERY = `
  PREFIX qb: <http://purl.org/linked-data/cube#>
  PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
  PREFIX cdw: <http://bike-csecu.com/datasets/covid/cdw#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

  SELECT DISTINCT ?dataset
  FROM <http://bike-csecu.com/datasets/diabatic/tbox>
  WHERE {
    ?dataset rdf:type qb:DataSet ;
             qb:structure ?cuboid .
    ?cuboid qb:component ?BNodeForCuboidLevel ;
            qb4o:isCuboidOf ?cube .
  }
  ORDER BY ?dataset
`;

function extractPrefixAndLocalName(uri) {
  const splitByHash = uri.split('#');
  const splitBySlash = uri.split('/');
  if (splitByHash.length > 1) {
    return {
      prefixURI: splitByHash[0] + '#',
      localName: splitByHash[1],
    };
  }
  return {
    prefixURI: splitBySlash.slice(0, -1).join('/') + '/',
    localName: splitBySlash[splitBySlash.length - 1],
  };
}

function getOrAssignPrefix(prefixURI, prefixMap, setPrefixMap) {
  const existing = Object.entries(prefixMap).find(([_, uri]) => uri === prefixURI);
  if (existing) return existing[0];

  const newPrefix = `prefix${Object.keys(prefixMap).length + 1}`;
  setPrefixMap((prev) => ({ ...prev, [newPrefix]: prefixURI }));
  return newPrefix;
}

export function useDatasets(prefixMap, setPrefixMap) {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const bindings = await queryVirtuoso(DATASET_QUERY);
        const parsed = bindings.map(({ dataset }) => {
          const { prefixURI, localName } = extractPrefixAndLocalName(dataset.value);
          const prefix = getOrAssignPrefix(prefixURI, prefixMap, setPrefixMap);

          return {
            uri: dataset.value,
            label: `${prefix}:${localName}`,
          };
        });

        setDatasets(parsed);
      } catch (err) {
        console.error('Failed to fetch datasets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, [prefixMap, setPrefixMap]);

  return { datasets, loading };
}

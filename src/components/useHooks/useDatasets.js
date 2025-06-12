import { useEffect, useState } from 'react';
import { queryVirtuoso } from '../useHooks/queryVirtuoso';
import { QUERY_TO_GET_DATASETS } from '../utils/queries';

const QUERY = QUERY_TO_GET_DATASETS();

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

  const newPrefix = `diabatic${Object.keys(prefixMap).length + 1}`;
  setPrefixMap((prev) => ({ ...prev, [newPrefix]: prefixURI }));
  return newPrefix;
}

export function useDatasets(prefixMap, setPrefixMap) {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const bindings = await queryVirtuoso(QUERY);
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

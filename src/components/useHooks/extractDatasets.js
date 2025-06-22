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

export async function extractDatasets(prefixMap) {
  const bindings = await queryVirtuoso(QUERY);
  const updatedPrefixMap = { ...prefixMap };

  const getOrAssignPrefix = (prefixURI) => {
    const existing = Object.entries(updatedPrefixMap).find(([_, uri]) => uri === prefixURI);
    if (existing) return existing[0];

    const newPrefix = `diabatic${Object.keys(updatedPrefixMap).length + 1}`;
    updatedPrefixMap[newPrefix] = prefixURI;
    return newPrefix;
  };

  const parsed = bindings.map(({ dataset }) => {
    const { prefixURI, localName } = extractPrefixAndLocalName(dataset.value);
    const prefix = getOrAssignPrefix(prefixURI);

    return {
      uri: dataset.value,
      label: `${prefix}:${localName}`,
    };
  });

  return { datasets: parsed, updatedPrefixMap };
}

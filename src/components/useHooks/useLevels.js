import { useEffect, useState } from 'react';
import { queryVirtuoso } from './queryVirtuoso';
import { getPrefixFromUri } from './getPrefixFromUri';

const GRAPH_URI = process.env.REACT_APP_SPARQL_GRAPH;

const LEVEL_QUERY = `
PREFIX qb: <http://purl.org/linked-data/cube#>
SELECT DISTINCT ?level
FROM <${GRAPH_URI}>
WHERE {
  ?ds a qb:DataSet ;
      qb:structure ?structure .
  ?structure qb:component ?comp .
  ?comp qb:dimension ?level .
}
ORDER BY ?level
`;

export const useLevels = (prefixMap, setPrefixMap) => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queryVirtuoso(LEVEL_QUERY)
      .then((bindings) => {
        const parsed = bindings.map(({ level }) =>
          getPrefixFromUri(level.value, prefixMap, setPrefixMap)
        );
        setLevels(parsed);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [prefixMap, setPrefixMap]);

  return { levels, loading };
};

import { useEffect, useState } from 'react';
import { queryVirtuoso } from './queryVirtuoso';

const TBOX = process.env.REACT_APP_TBOX_GRAPH;
const ABOX = process.env.REACT_APP_ABOX_GRAPH;

export const useLevels = (selectedDataset, prefixMap, setPrefixMap) => {
  const [levels, setLevels] = useState({});

  useEffect(() => {
    if (!selectedDataset) return;

    const LEVEL_QUERY = `
PREFIX qb: <http://purl.org/linked-data/cube#>
PREFIX qb4o: <http://purl.org/qb4olap/cubes#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?level ?levelAtrribute
FROM <${TBOX}>
FROM <${ABOX}>
WHERE {
  <${selectedDataset}> rdf:type qb:DataSet ; 
    qb:structure ?cuboid.

  ?cuboid qb:component ?BNodeForCuboidLevel ;
          qb4o:isCuboidOf ?cube.

  ?BNodeForCuboidLevel qb4o:level ?cuboidLevel.

  ?cuboidHierarchy qb4o:hasLevel ?cuboidLevel ;
                   qb4o:inDimension ?dimension.

  ?cube rdf:type qb:DataStructureDefinition ;
        qb:component ?BNodeForDimension.

  ?BNodeForDimension qb4o:dimension ?dimension.

  ?dimension qb4o:hasHierarchy ?hierarchy.

  FILTER EXISTS {
    ?hierarchy qb4o:hasLevel ?hl .
    FILTER(?hl = ?cuboidLevel)
  }

  ?hierarchy qb4o:hasLevel ?level.
  ?level qb4o:hasAttribute ?levelAtrribute.
}
ORDER BY ?level ?levelAtrribute`;

    const fetch = async () => {
      try {
        const bindings = await queryVirtuoso(LEVEL_QUERY);
        const parsed = {};
        let prefixIndex = Object.keys(prefixMap).length + 1;
        const updatedPrefixMap = { ...prefixMap };

        const getPrefixedName = (uri) => {
          // eslint-disable-next-line
          const match = uri.match(/^(.*[\/#])([^\/#]+)$/);
          if (!match) return { prefix: '', value: uri };
          // eslint-disable-next-line
          const [_, base, local] = match;

          const existing = Object.entries(updatedPrefixMap).find(
            ([, existingBase]) => existingBase === base
          );

          let prefix;
          if (existing) {
            prefix = existing[0];
          } else {
            prefix = `prefix${prefixIndex++}`;
            updatedPrefixMap[prefix] = base;
          }

          return { prefix, value: local };
        };

        bindings.forEach(({ level, levelAtrribute }) => {
          const l = getPrefixedName(level.value);
          const a = getPrefixedName(levelAtrribute.value);

          if (!parsed[level.value]) {
            parsed[level.value] = {
              prefix: l.prefix,
              shortName: l.value,
              fullURI: level.value,
              attributes: [],
            };
          }

          const alreadyHas = parsed[level.value].attributes.find(att => att.fullURI === levelAtrribute.value);
          if (!alreadyHas) {
            parsed[level.value].attributes.push({
              prefix: a.prefix,
              shortName: a.value,
              fullURI: levelAtrribute.value,
            });
          }
        });

        setPrefixMap(updatedPrefixMap);
        setLevels(parsed);
      } catch (e) {
        console.error('Level fetch failed', e);
      }
    };

    fetch();
    // eslint-disable-next-line
  }, [selectedDataset]);

  return { levels };
};

import { useEffect, useState } from 'react';
import { queryVirtuoso } from './queryVirtuoso';
import { QUERY_TO_GET_LEVELS } from '../utils/queries';

export const useLevels = (selectedDataset, prefixMap, setPrefixMap) => {
  const [levels, setLevels] = useState({});

  useEffect(() => {
    if (!selectedDataset) return;

    const QUERY = QUERY_TO_GET_LEVELS(selectedDataset)

    const fetch = async () => {
      try {
        const bindings = await queryVirtuoso(QUERY);
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
            prefix = `diabatic${prefixIndex++}`;
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

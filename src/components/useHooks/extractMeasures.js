import { queryVirtuoso } from './queryVirtuoso';
import { QUERY_TO_GET_MEASURES } from '../utils/queries';

export const extractMeasures = async (prefixMap, selectedDataset) => {
    const QUERY = QUERY_TO_GET_MEASURES(selectedDataset);
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

        let existingPrefix = Object.entries(updatedPrefixMap).find(
            ([, existingBase]) => existingBase === base
        );

        let prefix;
        if (existingPrefix) {
            prefix = existingPrefix[0];
        } else {
            prefix = `diabatic${prefixIndex++}`;
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

    return { measures: parsed, updatedPrefixMap };
};

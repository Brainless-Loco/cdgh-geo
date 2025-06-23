import { queryVirtuoso } from '../useHooks/queryVirtuoso';
import { QUERY_TO_GET_LEVEL_INSTANCES } from '../utils/queries';

export async function extractLevelInstances(selectedLevel, selectedLevelAttribute) {
  const query = QUERY_TO_GET_LEVEL_INSTANCES(selectedLevel, selectedLevelAttribute);
  console.log(query)
  const bindings = await queryVirtuoso(query);

  const instances = bindings.map(({ attributes }) => attributes.value);

  return instances;
}

const knownPrefixes = {
  'http://purl.org/qb4olap/cubes#': 'qb4o',
  'http://purl.org/linked-data/cube#': 'qb',
  'http://bike-csecu.com/datasets/diabatic/abox/': 'onto',
  'http://bike-csecu.com/datasets/diabatic/tbox/': 'diabatic',
};

const getPrefix = (uri) => {
  for (const [base, prefix] of Object.entries(knownPrefixes)) {
    if (uri.startsWith(base)) {
      return { prefix, value: uri.replace(base, '') };
    }
  }

  // Default: split by last / or #
  const match = uri.match(/(.+[\/#])([^\/#]+)$/);
  return match ? { prefix: match[1], value: match[2] } : { prefix: '', value: uri };
};

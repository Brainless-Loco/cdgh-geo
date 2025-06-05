export const getPrefixFromUri = (uri, prefixMap, setPrefixMap) => {
  const [base, local] = uri.includes('#')
    ? uri.split(/[#](?=[^#]*$)/)
    : uri.split(/[/](?=[^/]*$)/);

  if (!prefixMap[base]) {
    const prefixName = `prefix${Object.keys(prefixMap).length + 1}`;
    setPrefixMap((prev) => ({ ...prev, [base]: prefixName }));
    return { prefix: prefixName, value: uri };
  }

  return { prefix: prefixMap[base], value: uri };
};

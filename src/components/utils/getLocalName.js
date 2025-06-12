export const getLocalName = (uri) => {
    // eslint-disable-next-line
    const match = uri.match(/[#\/]([^#\/]+)$/);
    return match ? match[1].toUpperCase() : uri;
};
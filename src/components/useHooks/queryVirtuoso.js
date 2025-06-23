const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT

export const queryVirtuoso = async (sparqlQuery, options = {}) => {
  const url = new URL(BACKEND_ENDPOINT);

  // console.log(sparqlQuery)

  // Append default + custom params
  url.searchParams.set('query', encodeURIComponent(sparqlQuery));

  // url.searchParams.set('query', sparqlQuery);
  url.searchParams.set('format', 'application/sparql-results+json');

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  try {
    // console.log('Sending request to:', url.toString()); // Debug URL
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/sparql-results+json',
        ...(options.headers || {}),
      },
      mode: 'cors', // Explicitly set CORS mode
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    // console.log('Response data:', data); // Debug response
    return data?.results?.bindings || [];
  } catch (error) {
    console.error('Virtuoso SPARQL fetch failed:', error.message);
    throw error;
  }
};
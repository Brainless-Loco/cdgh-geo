// const SPARQL_ENDPOINT = 'http://localhost:5001/sparql';
const SPARQL_ENDPOINT = 'https://cdgh-geo-proxy-server.vercel.app/sparql';
// const SPARQL_ENDPOINT = 'http://localhost:3000/sparql'; // Use /api/sparql for Vercel

export const queryVirtuoso = async (sparqlQuery, options = {}) => {
  const url = new URL(SPARQL_ENDPOINT);

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
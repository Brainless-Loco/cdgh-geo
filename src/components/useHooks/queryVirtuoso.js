import axios from 'axios';

const SPARQL_ENDPOINT = 'http://localhost:5001/sparql';

export const queryVirtuoso = async (sparqlQuery, options = {}) => {
  const url = new URL(SPARQL_ENDPOINT);

  // Append default + custom params
  url.searchParams.set('query', sparqlQuery);
  url.searchParams.set('format', 'application/sparql-results+json');

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/sparql-results+json',
        ...(options.headers || {}),
      },
      mode: 'cors', // This is required for CORS
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data?.results?.bindings || [];
  } catch (error) {
    console.error('Virtuoso SPARQL fetch failed:', error);
    throw error;
  }
};

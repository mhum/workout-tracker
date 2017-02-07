export default function requestEndpoint(endpoint, authenticated = true, method = 'GET', body) {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method
  };

  if (authenticated) {
    const token = localStorage.getItem('id_token') || null;
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
  }

  if (body) {
    options.body = body;
  }

  return fetch(`/api/${endpoint}`, options);
}

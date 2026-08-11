import client from '../api/client';

// Downloads a file from an authenticated API endpoint and saves it in the
// browser. Uses `client` (not a plain <a href>) so the request carries the
// Bearer token from localStorage — a normal link navigation can't attach
// custom headers, and this endpoint requires auth.
export async function downloadFile(url, params = {}, filename = 'download') {
  const res = await client.get(url, { params, responseType: 'blob' });

  const blob = new Blob([res.data]);
  const objectUrl = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(objectUrl);
}

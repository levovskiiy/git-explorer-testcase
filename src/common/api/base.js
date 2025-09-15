export async function request(url, options = {}) {
  const { params } = options;
  if (params) {
    url += url.includes("?") ? "&" : "?";
    url += new URLSearchParams(params);
  }

  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}

export function createRequest(base) {
  return (url, ...args) => request(base + url, ...args);
}

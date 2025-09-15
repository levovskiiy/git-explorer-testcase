import { showSimpleErrorToast } from "../components/simpleErrorToast";

export async function request(url, options = {}) {
  const { params, method = "GET", body } = options;
  if (params) {
    url += url.includes("?") ? "&" : "?";
    url += new URLSearchParams(params);
  }

  try {
    const resp = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: body ? { "Content-Type": "application/json" } : undefined,
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(`Ошибка ${resp.status}: ${errorText}`);
    }

    const data = await resp.json();
    return data;
  } catch (err) {
    showSimpleErrorToast(err.message || "Неизвестная ошибка");
    throw err;
  }
}

export function createRequest(base) {
  return (url, ...args) => request(base + url, ...args);
}

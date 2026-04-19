function withParams(url, params = {}) {
  try {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://media.base44.com';
    const u = new URL(url, base);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
    });
    return u.toString();
  } catch {
    // Fallback: naive query param appending
    const q = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    if (!q) return url;
    return url.includes('?') ? `${url}&${q}` : `${url}?${q}`;
  }
}

function canParam(url) {
  return /media\.base44\.com\/images\//.test(url) || /base44\.app\/api\/apps\//.test(url);
}

export function buildSrcSet(url, widths = [480, 768, 1024, 1280, 1600, 2048], { q = 80 } = {}) {
  if (!url || !canParam(url)) return undefined;
  return widths.map((w) => `${withParams(url, { w, q })} ${w}w`).join(', ');
}

export function buildFormatSrcSet(url, format, widths = [480, 768, 1024, 1280, 1600, 2048], { q = 70 } = {}) {
  if (!url || !canParam(url)) return undefined;
  return widths.map((w) => `${withParams(url, { w, q, format })} ${w}w`).join(', ');
}
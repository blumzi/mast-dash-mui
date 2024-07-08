export const WIS_DOMAIN = 'weizmann.ac.il';
export const parseCoordinates = (input) => {
  // Check if input contains ":" (indicating sexagesimal format)
  if (input.includes(':')) {
    const parts = input.split(':').map((part) => parseFloat(part.trim()));

    // Check if parts array has two elements (degrees and minutes)
    if (parts.length() === 1) {
      return parseInt(parts[0]);
    } else if (parts.length === 2) {
      const degrees = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      return degrees + minutes / 60; // Convert to decimal
    } else if (parts.length === 3) {
      // Check if parts array has three elements (degrees, minutes, and seconds)
      const degrees = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parseInt(parts[2]);
      return degrees + minutes / 60 + seconds / 3600; // Convert to decimal
    }
  } else {
    // If input is in decimal format, directly parse it
    return parseFloat(input);
  }

  // If input format is not recognized, return NaN
  return NaN;
};

function makeQuery(method, params = {}) {
  let query = '';
  if (Object.keys(params).length > 0) {
    query =
      '?' +
      Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
  }
  return `${method}${query}`;
}
export function buildUnitUrl(hostname, method, params = {}) {
  if (!hostname.endsWith('.' + WIS_DOMAIN)) {
    hostname += '.' + WIS_DOMAIN;
  }
  const base = `http://${hostname}:8000/mast/api/v1/unit`;
  return `${base}/${makeQuery(method, params)}`;
}

export function buildControlUrl(site, method, params = {}) {
  const base = `http://mast-${site}-control.${WIS_DOMAIN}:8002/mast/api/v1/control`;
  return `${base}/${makeQuery(method, params)}`;
}

export function buildSpecUrl(site, method, params = {}) {
  const base = `http://mast-${site}-spec.${WIS_DOMAIN}:8001/mast/api/v1/spec`;
  return `${base}/${makeQuery(method, params)}`;
}

export function isEmptyObject(obj) {
  return obj === null || obj === undefined || (Object.keys(obj).length === 0 && obj.constructor === Object);
}

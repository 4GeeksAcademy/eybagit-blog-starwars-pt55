const API_BASE = "https://www.swapi.tech/api";

function obtenerRecurso(url) {
  return fetch(url)
    .then(respuesta => {
      if (!respuesta.ok) return null;
      return respuesta.json();
    });
}

export function obtenerPersonas(pagina = 1, limite = 10) {
  const url = `${API_BASE}/people?page=${pagina}&limit=${limite}`;
  return obtenerRecurso(url)
    .then(json => json?.results?.map(({ uid, name }) => ({ id: uid, nombre: name })) || [])
    .catch(() => []);
}

export function obtenerPlanetas(pagina = 1, limite = 10) {
  const url = `${API_BASE}/planets?page=${pagina}&limit=${limite}`;
  return obtenerRecurso(url)
    .then(json => json?.results?.map(({ uid, name }) => ({ id: uid, nombre: name })) || [])
    .catch(() => []);
}

export function obtenerVehiculos(pagina = 1, limite = 10) {
  const url = `${API_BASE}/vehicles?page=${pagina}&limit=${limite}`;
  return obtenerRecurso(url)
    .then(json => json?.results?.map(({ uid, name }) => ({ id: uid, nombre: name })) || [])
    .catch(() => []);
}

export function obtenerDetalleEntidad(tipo, id) {
  const url = `${API_BASE}/${tipo}/${id}`;
  return obtenerRecurso(url)
    .then(json => json?.result ? {
      id: json.result.uid,
      tipoDeEntidad: tipo,
      properties: json.result.properties
    } : null)
    .catch(() => null);
}

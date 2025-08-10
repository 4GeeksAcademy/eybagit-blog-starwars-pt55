const IMG_BASE = "https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images";

export function getImageUrl(tipo, id) {
  return `${IMG_BASE}/${tipo}/${id}.jpg`;
}

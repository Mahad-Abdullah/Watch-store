// src/utils/routes.js
export function routeForProduct(p) {
  const base = p && p.section === 'women' ? '/womenPage' : '/menPage';
  return `${base}?pid=${encodeURIComponent(p.id)}&modal=1`;
}

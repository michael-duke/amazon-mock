export function getCachedProducts() {
  const data = sessionStorage.getItem("products-cache");
  return data ? JSON.parse(data) : null;
}

export function saveProductsToCache(products) {
  try {
    sessionStorage.setItem("products-cache", JSON.stringify(products));
  } catch (e) {
    console.warn("Cache full, skipping save");
  }
}

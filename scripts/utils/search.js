export function attachSearchListeners(onSearch) {
  const searchButton = document.querySelector(".search-button");
  const searchBar = document.querySelector(".search-bar");
  const isHomePage = document.querySelector(".products-grid");

  if (!searchButton || !searchBar) return;

  // 2. Commit Action (Click/Enter)
  const commit = () => {
    onSearch(searchBar.value);
  };

  // Click search
  searchButton.addEventListener("click", commit);

  // Enter key search
  searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") commit();
  });

  // Real-time debounced search
  let searchTimeout;
  searchBar.addEventListener("input", () => {
    // Debounce if we are already on the amazon.html page
    if (isHomePage) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => onSearch(searchBar.value), 300);
    }
  });
}

// This helper handles the "Redirect vs Filter" logic
export function processSearch(query, products, renderCallback) {
  const normalizedQuery = query.trim().toLowerCase();
  const productsGrid = document.querySelector(".products-grid");

  if (!productsGrid) {
    // We are on Orders or Tracking -> Redirect
    window.location.href = `amazon.html?search=${encodeURIComponent(query)}`;
    return;
  }

  // We are on Home -> Update URL silently and Filter
  const newUrl = new URL(window.location);
  if (normalizedQuery) {
    newUrl.searchParams.set("search", normalizedQuery);
  } else {
    newUrl.searchParams.delete("search");
  }
  window.history.replaceState({}, "", newUrl);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.keywords.some((k) => k.toLowerCase().includes(normalizedQuery))
    );
  });

  productsGrid.innerHTML = "";
  renderCallback(filteredProducts);
}

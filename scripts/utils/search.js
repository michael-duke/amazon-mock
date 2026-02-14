import { getFilteredProducts } from "../../data/products.js";

// export function attachSearchListeners(onSearch) {
//   const searchButton = document.querySelector(".search-button");
//   const searchBar = document.querySelector(".search-bar");
//   const isHomePage = document.querySelector(".products-grid");

//   if (!searchButton || !searchBar) return;

//   // Commit Action (Click/Enter)
//   const commit = () => {
//     onSearch(searchBar.value);
//   };

//   // Click search
//   searchButton.addEventListener("click", commit);

//   // Enter key search
//   searchBar.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") commit();
//   });

//   // Real-time debounced search
//   let searchTimeout;
//   searchBar.addEventListener("input", () => {
//     if (isHomePage) {
//       clearTimeout(searchTimeout);
//       searchTimeout = setTimeout(() => onSearch(searchBar.value), 300);
//     }
//   });
// }

export function toggleClearButton(query) {
  const clearButton = document.querySelector(".clear-search-button");
  if (clearButton) {
    clearButton.style.display = query.trim() ? "block" : "none";
  }
}

export function setupSearch(onSearch, products) {
  const searchBar = document.querySelector(".search-bar");
  const searchButton = document.querySelector(".search-button");
  const clearButton = document.querySelector(".clear-search-button");
  const dropdown = document.querySelector(".search-results-dropdown");
  const productsGrid = document.querySelector(".products-grid");

  if (!searchButton || !searchBar) return;

  const hideDropdown = () => {
    dropdown.style.display = "none";
  };

  const toggleClearButton = (query) => {
    if (clearButton) clearButton.style.display = query ? "block" : "none";
  };

  // 2. Commit Action (Click/Enter)
  const commit = () => {
    onSearch(searchBar.value);
    hideDropdown();
  };

  // Click & Enter Search
  searchButton.addEventListener("click", commit);
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") commit();
  });

  // Real-time debounced search
  let searchTimeout;
  searchBar.addEventListener("input", () => {
    const normalizedQuery = searchBar.value.trim().toLowerCase();

    // Toggle Clear Button visibility
    toggleClearButton(normalizedQuery);

    // Debounce if we are already on the amazon.html page
    if (productsGrid) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        onSearch(normalizedQuery);
      }, 300);
    }

    // Other Pages (Show Dropdown)
    else if (normalizedQuery) {
      const matches = getFilteredProducts(normalizedQuery, products);
      if (matches.length > 0) {
        renderDropdown(matches, dropdown, searchBar, commit, toggleClearButton);
      } else {
        hideDropdown();
      }
    } else {
      hideDropdown();
    }
  });

  // Clear Button
  clearButton.addEventListener("click", () => {
    searchBar.value = "";
    toggleClearButton("");
    hideDropdown();
    if (productsGrid) onSearch(""); // Reset home grid
    searchBar.focus();
  });

  // Click Outsite then close
  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) && !dropdown.contains(e.target)) {
      hideDropdown();
    }
  });
}

function renderDropdown(
  matches,
  dropdown,
  searchBar,
  performSeach,
  toggleClearButton,
) {
  if (matches.length === 0) {
    dropdown.style.display = "none";
    return;
  }

  dropdown.style.display = "block";
  dropdown.innerHTML = matches
    .slice(0, 6)
    .map(
      (p) => `
    <div class="dropdown-item" data-id="${p.id}">
      <img src="${p.image}">
      <div class="dropdown-item-name">${p.name}</div>
    </div>
  `,
    )
    .join("");

  dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      const selectedName = item.querySelector(".dropdown-item-name").innerText;
      searchBar.value = selectedName;
      toggleClearButton(selectedName);
      performSeach();
    });
  });
}

// This helper handles the "Redirect vs Filter" logic
export function processSearch(query, renderCallback) {
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

  const filteredProducts = getFilteredProducts(normalizedQuery);

  productsGrid.innerHTML = "";
  renderCallback(filteredProducts);
}

import { products, loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "./utils/cart.js";
import { attachSearchListeners, processSearch } from "./utils/search.js";

/*
loadProducts(() => {
  // Load the cart before rendering the products grid
  renderProductsGrid();
  loadFromStorage();
  updateCartQuantity();
});
*/

async function loadPage() {
  try {
    await loadProductsFetch();

    // Setup Search
    attachSearchListeners((query) => {
      processSearch(query, products, renderProductsGrid);
    });

    // Update the Cart notification on load
    updateCartQuantity();

    // Check URL on load for initial search
    const url = new URL(window.location.href);
    const initialSearch = url.searchParams.get("search");
    if (initialSearch) {
      // Use the same processSearch logic for the initial load
      processSearch(initialSearch, products, renderProductsGrid);
      const searchBar = document.querySelector(".search-bar");
      searchBar.value = initialSearch;
      // Put the cursor at the end of the text automatically
      searchBar.focus();
      searchBar.setSelectionRange(
        searchBar.value.length,
        searchBar.value.length,
      );
    } else {
      renderProductsGrid(products);
    }
  } catch (error) {
    console.log("Unexpected error. Please try again later.", error);
  }
}

loadPage();

function renderProductsGrid(products) {
  const productsGrid = document.querySelector(".products-grid");
  products.forEach((product) => {
    productsGrid.innerHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src=${product.getStarsURL()}>
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select name="quantity-selector-${product.id}" class="quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      ${product.renderExtraInfo()}
      <div class="product-spacer"></div>

      <div class="added-to-cart added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
    </div>
      `;
  });

  document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      const selectedQuantity = +document.querySelector(
        `.quantity-selector-${productId}`,
      ).value;

      // Add to cart object
      addToCart(productId, selectedQuantity);

      // Recalculate the cart total
      updateCartQuantity();

      const addedMessageTimeouts = {};

      const messageElement = document.querySelector(
        `.added-to-cart-${productId}`,
      );

      messageElement.classList.add("make-visible");

      if (addedMessageTimeouts[productId])
        clearTimeout(addedMessageTimeouts[productId]);

      addedMessageTimeouts[productId] = setTimeout(() => {
        messageElement.classList.remove("make-visible");
      }, 2000);
    });
  });
}

function handleSearch() {
  const searchQuery = document.querySelector(".search-bar").value;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const productsGrid = document.querySelector(".products-grid");
  // IF WE ARE NOT ON THE HOME PAGE (no products-grid)
  if (!productsGrid) {
    // Redirect to home page with the search query in the URL
    window.location.href = `amazon.html?search=${encodeURIComponent(searchQuery)}`;
    return;
  }

  // Sync URL with the Search (without refresh)
  const newUrl = new URL(window.location);
  if (normalizedQuery) {
    newUrl.searchParams.set("search", normalizedQuery);
  } else {
    newUrl.searchParams.delete("search");
  }
  window.history.replaceState({}, "", newUrl);

  // Filter the data and Render
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.keywords.some((k) => k.toLowerCase().includes(normalizedQuery))
    );
  });

  productsGrid.innerHTML = "";
  renderProductsGrid(filteredProducts);
}

// Attach the unified function to both listeners
document
  .querySelector(".search-button")
  .addEventListener("click", handleSearch);

document.querySelector(".search-bar").addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleSearch();
});

let searchTimeout;

// Trigger search as the user types
// THE DEBOUNCE: Triggered on every input, but delays the execution
document.querySelector(".search-bar").addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => handleSearch(), 300); // Wait 300ms after the last keystroke.
});

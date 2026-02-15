import { products, loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "./utils/cart.js";
import {
  setupSearch,
  processSearch,
  toggleClearButton,
} from "./utils/search.js";

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
    setupSearch((query) => {
      processSearch(query, renderProductsGrid);
    });

    // Update the Cart notification on load
    updateCartQuantity();

    // Check URL on load for initial search
    const url = new URL(window.location.href);
    const initialSearch = url.searchParams.get("search");
    if (initialSearch) {
      // Use the same processSearch logic for the initial load
      processSearch(initialSearch, renderProductsGrid);
      const searchBar = document.querySelector(".search-bar");
      searchBar.value = initialSearch;
      // Put the cursor at the end of the text automatically
      toggleClearButton(initialSearch);
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
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `
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
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
          .map(
            (n) =>
              `<option value="${n}" ${n === 1 ? "selected" : ""}>${n}</option>`,
          )
          .join("")}
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

  productsGrid.innerHTML = productsHTML;
}

const addedMessageTimeouts = {};

document.querySelector(".products-grid").addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart-button");
  if (button) {
    const { productId } = button.dataset;
    const selectedQuantity = +document.querySelector(
      `.quantity-selector-${productId}`,
    ).value;

    // Add to cart object
    addToCart(productId, selectedQuantity);

    // Recalculate the cart total
    updateCartQuantity();

    const messageElement = document.querySelector(
      `.added-to-cart-${productId}`,
    );

    messageElement.classList.add("make-visible");

    if (addedMessageTimeouts[productId])
      clearTimeout(addedMessageTimeouts[productId]);

    addedMessageTimeouts[productId] = setTimeout(() => {
      messageElement.classList.remove("make-visible");
    }, 2000);
  }
});

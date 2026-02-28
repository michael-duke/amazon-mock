import { products, loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "./utils/cart.js";
import { intializeApp } from "./utils/init.js";
import { renderCartLoader, renderProductsSkeleton } from "./utils/loader.js";
import { handleError } from "./utils/errors.js";
import { getCachedProducts } from "./utils/cache.js";

/*
loadProducts(() => {
  // Load the cart before rendering the products grid
  renderProductsGrid();
  loadFromStorage();
  updateCartQuantity();
});
*/

// Check if we have data in the cache
loadPage();

async function loadPage() {
  const cachedData = getCachedProducts();
  const controller = new AbortController();
  const controllerTimeout = setTimeout(() => controller.abort(), 8000);
  
  // ONLY show the skeleton if we don't have cache
  if (!cachedData) {
    renderProductsSkeleton();
    renderCartLoader();

    // Create a 2.3-second delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2300);
    });
  }

  try {
    await loadProductsFetch({ signal: controller.signal });
    clearTimeout(controllerTimeout);

    // Update the Cart notification on load
    updateCartQuantity();
    intializeApp(products, renderProductsGrid);
  } catch (error) {
    console.error("Critical Load Error:", error);
    clearTimeout(controllerTimeout);
    
   if (products.length === 0) {
      handleError(".products-grid", error.name === "AbortError" 
        ? "Connection timed out." 
        : "Failed to load products list.");
    }
    updateCartQuantity("!");
  }
}

function renderProductsGrid(products) {
  const productsGrid = document.querySelector(".products-grid");
  productsGrid.classList.remove("is-visible");
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `
    <div class="product-container image-not-loaded">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}"
          loading="eager"
          onLoad="this.closest('.product-container').classList.remove('image-not-loaded')">
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

  requestAnimationFrame(() => {
    productsGrid.innerHTML = productsHTML;
    productsGrid.classList.add("is-visible");
  });
}

const addedMessageTimeouts = {};

document.querySelector(".products-grid")?.addEventListener("click", (event) => {
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

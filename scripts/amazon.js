import { products, loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { updateCartQuantity } from "./utils/cart.js";
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
    updateCartQuantity();
    renderProductsGrid();
  } catch (error) {
    console.log("Unexpected error. Please try again later.", error);
  }
}

loadPage();

function renderProductsGrid() {
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

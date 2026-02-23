import { addToCart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import {
  products,
  getProduct,
  setProducts,
  loadProductsFetch,
  rehydrateProducts,
} from "../data/products.js";
import { updateCartQuantity } from "./utils/cart.js";
import { formatOrderDate } from "./utils/date.js";
import { handleError } from "./utils/errors.js";
import formatCurrency from "./utils/money.js";
import { renderOrdersSkeleton, renderCartLoader } from "./utils/loader.js";
import { setupSearchRedirect } from "./utils/search.js";

// Check if we have data in the cache
const cachedProducts = JSON.parse(sessionStorage.getItem("products-cache"));
if (cachedProducts) {
  const rehydrated = rehydrateProducts(cachedProducts);
  // Now we can use getProduct in renderOrderDetails.
  setProducts(rehydrated);
  
  renderOrdersGrid();
  updateCartQuantity();
  setupSearchRedirect();
} else loadPage();

async function loadPage() {
  renderOrdersSkeleton();
  renderCartLoader();

  try {
    // Create a 3-second delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2300);
    });

    await loadProductsFetch();

    sessionStorage.setItem("products-cache", JSON.stringify(products));

    renderOrdersGrid();
    updateCartQuantity();
    setupSearchRedirect();
  } catch (error) {
    console.error("Critical Load Error:", error);
    handleError(".orders-grid");
    updateCartQuantity("!");
  }
}

//loadPage();

function renderOrdersGrid() {
  const ordersGrid = document.querySelector(".orders-grid");
  ordersGrid.classList.remove("is-visible");
  let ordersHTML = "";
  orders.forEach((order) => {
    ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formatOrderDate(order.orderTime)}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>
  
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
  
      ${renderOrderDetailsGrid(order)}
    </div>
      `;
  });
  requestAnimationFrame(() => {
    ordersGrid.innerHTML = ordersHTML;
    ordersGrid.classList.add("is-visible");
  });

  function renderOrderDetailsGrid(order) {
    let orderDetailsGrid = "";

    order.products.forEach((detail) => {
      const product = getProduct(detail.productId);
      orderDetailsGrid += `
      <div class="order-details-grid image-not-loaded">
        <div class="product-image-container">
          <img src="${product.image}"
          loading="eager"
          onLoad="this.closest('.order-details-grid').classList.remove('image-not-loaded')">
        </div>
  
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatOrderDate(detail.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${detail.quantity}
          </div>
          <div class="added-to-cart added-to-cart-${order.id}-${detail.productId}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="buy-again-button button-primary" data-product-id="${detail.productId}"
          data-order-id="${order.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
  
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${detail.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
      `;
    });
    return orderDetailsGrid;
  }
}

const buyAgainTimeouts = {};

document.querySelector(".orders-grid")?.addEventListener("click", (event) => {
  const button = event.target.closest(".buy-again-button");
  if (button) {
    const { productId, orderId } = button.dataset;
    const uniqueKey = `${orderId}-${productId}`;
    addToCart(productId);
    updateCartQuantity();

    // Find the specific container for the product in this order
    const container = button.closest(".product-details");

    // Search only that container for the message
    const messageElement = container.querySelector(
      `.added-to-cart-${uniqueKey}`,
    );

    if (messageElement) {
      messageElement.classList.add("make-visible");

      // Use a unique ID for the timeout so different buttons don't fight
      if (buyAgainTimeouts[uniqueKey])
        clearTimeout(buyAgainTimeouts[uniqueKey]);

      buyAgainTimeouts[uniqueKey] = setTimeout(() => {
        messageElement.classList.remove("make-visible");
      }, 2000);
    }
  }
});

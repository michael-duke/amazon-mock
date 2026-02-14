import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { updateCartQuantity } from "./utils/cart.js";
import { formatDeliveryDate } from "./utils/date.js";
import { calculateDeliveryProgress } from "./utils/progress.js";
import { attachSearchListeners } from "./utils/search.js";

async function loadPage() {
  try {
    await loadProductsFetch();
    renderOrderTracking();
    updateCartQuantity();
    attachSearchListeners((query) => {
      // On the orders page, we always want to redirect to home
      window.location.href = `amazon.html?search=${encodeURIComponent(query)}`;
    });
  } catch (error) {
    console.log("Unexpected error. Please try again later.", error);
  }
}

loadPage();

function renderOrderTracking() {
  const url = new URL(window.location.href);
  const order = getOrder(url.searchParams.get("orderId"));
  const productDetails = getProduct(url.searchParams.get("productId"));
  const orderProduct = order.products.find(
    (p) => p.productId === productDetails.id,
  );
  const progress = calculateDeliveryProgress(
    order.orderTime,
    orderProduct.estimatedDeliveryTime,
  );
  const orderTracking = document.querySelector(".order-tracking");
  orderTracking.innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">Arriving on ${formatDeliveryDate(orderProduct.estimatedDeliveryTime)}</div>

      <div class="product-info">
        ${productDetails.name}
      </div>

      <div class="product-info">Quantity: ${orderProduct.quantity}</div>

      <img
        class="product-image"
        src="${productDetails.image}"
      />

      <div class="progress-labels-container">
        <div class="progress-label">Preparing</div>
        <div class="progress-label current-status">Shipped</div>
        <div class="progress-label">Delivered</div>
      </div>

      <div class="progress-bar-container">
        <div style="width:${progress}%" class="progress-bar"></div>
      </div>
  `;
}

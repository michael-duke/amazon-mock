import { addToCart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch, products } from "../data/products.js";
import { updateCartQuantity } from "./amazon.js";
import { formatOrderDate } from "./utils/date.js";
import formatCurrency from "./utils/money.js";

async function loadPage() {
  try {
    await loadProductsFetch();
    renderOrdersGrid();
    updateCartQuantity();
  } catch (error) {
    console.log(error);
  }
}

loadPage();

function renderOrdersGrid() {
  const ordersGrid = document.querySelector(".orders-grid");

  orders.forEach((order) => {
    ordersGrid.innerHTML += `
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
      `;
  });

  document.querySelectorAll(".buy-again-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      addToCart(productId);
      updateCartQuantity();
    });
  });

  function renderOrderDetailsGrid(order) {
    let orderDetailsGrid = "";

    order.products.forEach((detail) => {
      const product = getProduct(detail.productId);
      orderDetailsGrid += `
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src="${product.image}">
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
          <button class="buy-again-button button-primary" data-product-id="${detail.productId}">
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

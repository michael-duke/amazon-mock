import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import deliveryOptions, {
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import formatDeliveryDate from "../utils/date.js";
import renderPaymentSummary from "./paymentSummary.js";
import renderCheckoutHeader from "./checkoutHeader.js";

function renderOrderSummary() {
  const orderSummary = document.querySelector(".order-summary");

  let orderSummaryHTML = "";

  cart.items.forEach((item) => {
    const cartItem = getProduct(item.productId);

    const deliveryDate = formatDeliveryDate(
      getDeliveryOption(item.deliveryOptionId).deliveryDays,
    );

    orderSummaryHTML += `
    <div class="cart-item-container cart-item-container-${item.productId}">
      <div class="delivery-date">
        Delivery date: ${deliveryDate}
      </div>

      <div class="cart-item-details-grid">
        <img
        class="product-image"
        src="${cartItem.image}"
        />

        <div class="cart-item-details">
          <div class="product-name product-name-${item.productId}">
              ${cartItem.name}
          </div>
          <div class="product-price product-price-${item.productId}">
          ${cartItem.getPrice()}
          </div>
          <div class="product-quantity product-quantity-${item.productId}">
              <span> Quantity: <span class="quantity-label">${item.quantity}</span> </span>
              <span class="update-quantity-link link-primary" data-product-id="${item.productId}">
              Update
              </span>
              <input name="quantity-input-${item.productId}" 
              type="number" min="1" class="quantity-input quantity-input-${item.productId}"
              data-product-id="${item.productId}"/>
              <span class="save-quantity-link link-primary" data-product-id="${item.productId}">
              Save
              </span>
              <span class="delete-quantity-link delete-quantity-link-${item.productId} 
              link-primary" data-product-id="${item.productId}">
              Delete
              </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
              Choose a delivery option:
          </div>
          ${generateDeliveryOptions(item)}     
        </div>
      </div>  
    </div>     
    `;
  });
  orderSummary.innerHTML = orderSummaryHTML;

  function generateDeliveryOptions(item) {
    let deliveryOptionsHTML = "";

    deliveryOptions.forEach((option) => {
      const isChecked = item.deliveryOptionId === option.id;
      deliveryOptionsHTML += `
         <div class="delivery-option delivery-option-${item.productId}-${option.id}" data-product-id="${item.productId}"
              data-delivery-option-id="${option.id}">
              <input
              type="radio"
              class="delivery-option-input delivery-option-input-${item.productId}-${option.id}"
              name="delivery-option-${item.productId}"
              ${isChecked ? "checked" : ""}
              />
              <div>
              <div class="delivery-option-date">${formatDeliveryDate(option.deliveryDays)}</div>
              <div class="delivery-option-price">${option.priceCents === 0 ? "FREE" : "$" + formatCurrency(option.priceCents)} - Shipping</div>
              </div>
          </div>
      `;
    });

    return deliveryOptionsHTML;
  }
}

function refreshAllSummaries() {
  // Re-render the list
  renderOrderSummary();

  // Sync the payment box
  renderPaymentSummary();

  // Sync the header count
  renderCheckoutHeader();
}

document.querySelector(".order-summary")?.addEventListener("click", (event) => {
  const { target } = event;
  // Handle Delete
  if (target.classList.contains("delete-quantity-link")) {
    const { productId } = target.dataset;

    // Filter the cart object
    removeFromCart(productId);
    refreshAllSummaries();
  }

  // Handle Update
  if (target.classList.contains("update-quantity-link")) {
    const { productId } = target.dataset;

    // Put the cart item in editing mode
    const container = document.querySelector(
      `.cart-item-container-${productId}`,
    );
    container.classList.add("is-editing-quantity");

    // Focus the input automatically
    const input = document.querySelector(`.quantity-input-${productId}`);
    input.value = cart.items.find((i) => i.productId === productId).quantity;
    input.focus();
  }

  // Handle Save
  if (target.classList.contains("save-quantity-link")) {
    const { productId } = target.dataset;
    const input = document.querySelector(`.quantity-input-${productId}`);
    const newQuantity = +input.value;

    if (newQuantity > 0 && newQuantity < 1000) {
      updateQuantity(productId, newQuantity);
      refreshAllSummaries();
    } else {
      alert("Quantity must be at least 1 and less than 1000");
    }
  }

  // Delivery Option
  const deliveryOption = target.closest(".delivery-option");
  if (deliveryOption) {
    const { productId, deliveryOptionId } = deliveryOption.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    refreshAllSummaries();
  }
});

document
  .querySelector(".order-summary")
  ?.addEventListener("keydown", (event) => {
    const { target, key } = event;
    if (key === "Enter" && target.classList.contains("quantity-input")) {
      const { productId } = target.dataset;
      const newQuantity = +target.value;

      if (newQuantity > 0 && newQuantity < 1000) {
        updateQuantity(productId, newQuantity);
        refreshAllSummaries();
      }
    }
  });

export default renderOrderSummary;

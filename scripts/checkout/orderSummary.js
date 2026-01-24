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

console.log(cart);

function renderOrderSummary() {
  // Inital render with correct quantity
  //renderCheckoutHeader();

  const orderSummary = document.querySelector(".order-summary");

  //Refresh the orderSummary for re-renders
  orderSummary.innerHTML = "";

  cart.items.forEach((item) => {
    const cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add("cart-item-container");
    cartItemContainer.classList.add(`cart-item-container-${item.productId}`);

    const cartItem = getProduct(item.productId);

    const deliveryDate = formatDeliveryDate(
      getDeliveryOption(item.deliveryOptionId).deliveryDays,
    );

    cartItemContainer.innerHTML = `
      <div class="delivery-date">
          Delivery date: ${deliveryDate}
      </div>

      <div class="cart-item-details-grid">
          <img
          class="product-image"
          src="${cartItem.image}"
          />

          <div class="cart-item-details">
          <div class="product-name">
              ${cartItem.name}
          </div>
          <div class="product-price">$${formatCurrency(cartItem.priceCents)}</div>
          <div class="product-quantity product-quantity-${item.productId}">
              <span> Quantity: <span class="quantity-label">${item.quantity}</span> </span>
              <span class="update-quantity-link link-primary" data-product-id="${item.productId}">
              Update
              </span>
              <input type="number" class="quantity-input quantity-input-${item.productId}">
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
    orderSummary.appendChild(cartItemContainer);
  });

  function generateDeliveryOptions(item) {
    let deliveryOptionsHTML = "";

    deliveryOptions.forEach((option) => {
      const isChecked = item.deliveryOptionId === option.id;
      deliveryOptionsHTML += `
         <div class="delivery-option" data-product-id="${item.productId}"
              data-delivery-option-id="${option.id}">
              <input
              type="radio"
              class="delivery-option-input"
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

  document.querySelectorAll(".delete-quantity-link").forEach((link) =>
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      // Filter the cart object
      removeFromCart(productId);

      // Repaint the Chekout header
      renderCheckoutHeader();

      // Re-render the order summary instead of .delete()
      renderOrderSummary();

      // Re-render Payment summary
      renderPaymentSummary();
    }),
  );

  document.querySelectorAll(".update-quantity-link").forEach((link) =>
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      // Put the cart item in editing mode
      document
        .querySelector(`.cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");

      // Set the value of the quantity input
      document.querySelector(`.quantity-input-${productId}`).value =
        cart.items.find((i) => i.productId === productId).quantity;
    }),
  );

  document.querySelectorAll(".save-quantity-link").forEach((link) =>
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      // Update the quantity of the focused item
      const newQuantity = +document.querySelector(
        `.quantity-input-${productId}`,
      ).value;

      updateQuantity(productId, newQuantity);

      // Update the cartQuantity.
      renderCheckoutHeader();

      // Reset the UI as it was and update the quantity label.
      renderOrderSummary();

      // Re-render Payment summary
      renderPaymentSummary();
    }),
  );

  document.querySelectorAll(".delivery-option").forEach((option) => {
    const { productId, deliveryOptionId } = option.dataset;

    option.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

export default renderOrderSummary;

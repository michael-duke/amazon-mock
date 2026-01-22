import cart, {
  removeFromCart,
  calculateTotalQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import deliverOptions from "../data/deliveryOptions.js";
import products from "../data/products.js";
import formatCurrency from "./utils/money.js";
import formatDate from "./utils/date.js";

console.log(cart);

export function renderOrderSummary() {
  updateCartQuantity();
  document.querySelector(".order-summary").innerHTML = "";

  cart.items.forEach((item) => {
    const cartItemContainer = document.createElement("div");
    cartItemContainer.classList.add("cart-item-container");
    cartItemContainer.classList.add(`cart-item-container-${item.productId}`);

    const cartItem = products.find((product) => product.id === item.productId);

    const deliveryDate = formatDate(
      deliverOptions.find((option) => option.id === item.deliveryOptionId)
        .deliveryDays,
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
          <div class="product-quantity">
              <span> Quantity: <span class="quantity-label">${item.quantity}</span> </span>
              <span class="update-quantity-link link-primary" data-product-id="${item.productId}">
              Update
              </span>
              <input class="quantity-input quantity-input-${item.productId}">
              <span class="save-quantity-link link-primary" data-product-id="${item.productId}">
              Save
              </span>
              <span class="delete-quantity-link link-primary" data-product-id="${item.productId}">
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
    document.querySelector(".order-summary").appendChild(cartItemContainer);
  });

  function generateDeliveryOptions(item) {
    let deliveryOptionsHTML = "";

    deliverOptions.forEach((option) => {
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
              <div class="delivery-option-date">${formatDate(option.deliveryDays)}</div>
              <div class="delivery-option-price">${option.priceCents === 0 ? "FREE" : "$" + formatCurrency(option.priceCents)} - Shipping</div>
              </div>
          </div>
      `;
    });

    return deliveryOptionsHTML;
  }

  function updateCartQuantity() {
    // Calculate the Cart quantity
    const total = calculateTotalQuantity();

    // Update the Checkout Header
    document.querySelector(".return-to-home-link").innerHTML = `${total} items`;
  }

  document.querySelectorAll(".delete-quantity-link").forEach((link) =>
    link.addEventListener("click", () => {
      const { productId } = link.dataset;

      // Filter the cart object
      removeFromCart(productId);

      // Repaint the Chekout header
      updateCartQuantity();

      document.querySelector(`.cart-item-container-${productId}`).remove();
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
      updateCartQuantity();

      // Reset the UI as it was and update the quantity label.
      document
        .querySelector(`.cart-item-container-${productId}`)
        .classList.remove("is-editing-quantity");

      document.querySelector(
        `.cart-item-container-${productId} .product-quantity span.quantity-label`,
      ).innerText = newQuantity;
    }),
  );

  document.querySelectorAll(".delivery-option").forEach((option) => {
    const { productId, deliveryOptionId } = option.dataset;

    option.addEventListener("click", () => {
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();

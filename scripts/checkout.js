import cart, {
  removeFromCart,
  calculateTotalQuantity,
  saveToStorage,
  updateQuantity,
} from "../data/cart.js";
import products from "../data/products.js";
import formatCurrency from "./utils/money.js";

updateCartQuantity();
console.log(cart);

cart.items.forEach(({ productId, quantity }) => {
  const cartItemContainer = document.createElement("div");
  cartItemContainer.classList.add("cart-item-container");
  cartItemContainer.classList.add(`cart-item-container-${productId}`);

  const cartItem = products.find((product) => product.id === productId);

  cartItemContainer.innerHTML = `
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
            <span> Quantity: <span class="quantity-label">${quantity}</span> </span>
            <span class="update-quantity-link link-primary" data-product-id="${productId}">
            Update
            </span>
            <input class="quantity-input quantity-input-${productId}">
            <span class="save-quantity-link link-primary" data-product-id="${productId}">
            Save
            </span>
            <span class="delete-quantity-link link-primary" data-product-id="${productId}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}"
            />
            <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
            </div>
        </div>
        <div class="delivery-option">
            <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}"
            />
            <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
        </div>
        <div class="delivery-option">
            <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${cartItem.id}"
            />
            <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
        </div>
        </div>
    </div>       
    `;

  document.querySelector(".order-summary").appendChild(cartItemContainer);
});

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

    // Recalculate the cart total
    updateCartQuantity();

    // Save cart object to localStorage
    saveToStorage();
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
    const newQuantity = +document.querySelector(`.quantity-input-${productId}`)
      .value;

    updateQuantity(productId, newQuantity);

    // Update the cartQuantity and Save the new data.
    updateCartQuantity();
    saveToStorage();

    // Reset the UI as it was and update the quantity label.
    document
      .querySelector(`.cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");

    document.querySelector(
      `.cart-item-container-${productId} .product-quantity span.quantity-label`,
    ).innerText = newQuantity;
  }),
);

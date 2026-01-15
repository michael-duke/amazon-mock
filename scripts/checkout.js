import cart, { removeFromCart, updateCartQuantity } from "../data/cart.js";
import products from "../data/products.js";
import formatCurrency from "./utils/money.js";

updateCartQuantity();

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

document.querySelectorAll(".delete-quantity-link").forEach((link) =>
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    removeFromCart(productId);
    document.querySelector(`.cart-item-container-${productId}`).remove();
  })
);

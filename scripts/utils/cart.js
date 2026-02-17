import { calculateTotalQuantity } from "../../data/cart.js";

export function updateCartQuantity(overrideValue) {
  const cartQty = document.querySelector(".cart-quantity");
  if (!cartQty) return;
  cartQty.classList.remove("cart-quantity-loading");

  const total = overrideValue ?? calculateTotalQuantity();
  // Update cart quantiy notification based on overrideValue
  cartQty.innerHTML = total || "";
}

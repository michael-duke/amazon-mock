import { calculateTotalQuantity } from "../../data/cart.js";

export function updateCartQuantity() {
  // Calculate the Cart quantity
  const total = calculateTotalQuantity();

  // Update cart quantiy notification
  document.querySelector(".cart-quantity").innerHTML = total || "";
}

import { calculateTotalQuantity } from "../../data/cart.js";

function renderCheckoutHeader() {
  const total = calculateTotalQuantity();
  const middleSection = document.querySelector(
    ".checkout-header-middle-section",
  );
  middleSection.innerHTML = `
  Checkout (<a class="return-to-home-link" href="index.html">${total === 0 ? "" : total}</a>)    
 `;
}

export default renderCheckoutHeader;

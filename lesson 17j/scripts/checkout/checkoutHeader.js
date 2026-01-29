import { calculateTotalQuantity } from "../../data/cart.js";

function renderCheckoutHeader() {
  const total = calculateTotalQuantity();
  const checkoutHeader = document.querySelector(".checkout-header");
  checkoutHeader.innerHTML = `
   <div class="checkout-header">
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png" />
            <img
              class="amazon-mobile-logo"
              src="images/amazon-mobile-logo.png"
            />
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link" href="amazon.html">${total === 0 ? "" : total}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>
 `;
}

export default renderCheckoutHeader;

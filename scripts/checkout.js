import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

/*Async Await Version*/
async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log("Unexpected error. Please try again later.", error);
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/* Promise Version 
Promise.all([loadProductsFetch(), loadCartFetch()]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* Callback Version
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

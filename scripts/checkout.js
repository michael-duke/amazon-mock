import { refreshAllSummaries } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { cart, loadCartFetch } from "../data/cart.js";
import { handleError } from "./utils/errors.js";

/*Async Await Version*/
async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log("Unexpected error. Please try again later.", error);
    handleError(".checkout-grid");
  }
  refreshAllSummaries();
}

loadPage();
console.log(cart);

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

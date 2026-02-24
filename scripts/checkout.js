import { refreshAllSummaries } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { cart, loadCartFetch } from "../data/cart.js";
import { handleError } from "./utils/errors.js";
import { refreshAllSummariesSkeleton } from "./utils/loader.js";

/*Async Await Version*/
async function loadPage() {
  refreshAllSummariesSkeleton();

  const controller = new AbortController();
  const controllerTimeout = setTimeout(() => controller.abort(), 8000);

  try {
    // Create a 2.3-second delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2300);
    });

    await Promise.all([
      loadProductsFetch({ signal: controller.signal }),
      loadCartFetch({ signal: controller.signal }),
    ]);
    clearTimeout(controllerTimeout);
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

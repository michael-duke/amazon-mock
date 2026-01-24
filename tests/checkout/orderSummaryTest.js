import renderOrderSummary from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";

describe("Test Suite: Render order summaray", () => {
  const productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".test-container").innerHTML = `
     <div class="checkout-header"></div>
     <div class="order-summary"></div>
     <div class="payment-summary"></div>
    `;
    spyOn(localStorage, "getItem").and.callFake(() =>
      JSON.stringify({
        items: [
          {
            productId: productId1,
            quantity: 3,
            deliveryOptionId: "2",
          },
          {
            productId: productId2,
            quantity: 2,
            deliveryOptionId: "1",
          },
        ],
      }),
    );
    loadFromStorage();
    renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector(".test-container").innerHTML = "";
  });
  it("Displays the cart", () => {
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(2);
    expect(
      document.querySelector(`.product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 3");
    expect(
      document.querySelector(`.product-quantity-${productId2}`).innerText,
    ).toContain("Quantity: 2");
  });
  it("Removes a product from the page", () => {
    const productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // Simulate Delete button click
    document.querySelector(`.delete-quantity-link-${productId1}`).click();
    expect(document.querySelectorAll(".cart-item-container").length).toEqual(1);
    expect(
      document.querySelector(`.cart-item-container-${productId1}`),
    ).toEqual(null);
    expect(
      document.querySelector(`.cart-item-container-${productId2}`),
    ).not.toEqual(null);
    expect(cart.items.length).toEqual(1);
    expect(cart.items[0].productId).toEqual(productId2);
  });
});

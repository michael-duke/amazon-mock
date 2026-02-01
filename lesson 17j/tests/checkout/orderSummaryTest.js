import renderOrderSummary from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../../scripts/utils/money.js";

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
    cart.items = [
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
    ];

    renderOrderSummary();
  });
  console.log(cart);
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
    expect(
      document.querySelector(`.product-name-${productId1}`).innerText,
    ).toContain(getProduct(productId1).name);
    expect(
      document.querySelector(`.product-name-${productId2}`).innerText,
    ).toContain(getProduct(productId2).name);
    expect(
      document.querySelector(`.product-price-${productId1}`).innerText,
    ).toContain(`$${formatCurrency(getProduct(productId1).priceCents)}`);
    expect(
      document.querySelector(`.product-price-${productId2}`).innerText,
    ).toContain(`$${formatCurrency(getProduct(productId2).priceCents)}`);
  });

  it("Removes a product from the page", () => {
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

  it("Updates the delivery option", () => {
    document.querySelector(`.delivery-option-${productId1}-3`).click();
    expect(
      document.querySelector(`.delivery-option-input-${productId1}-3`).checked,
    ).toBeTrue();
    expect(cart.items.length).toEqual(2);
    expect(cart.items[0].deliveryOptionId).toEqual("3");
    expect(document.querySelector(".shipping-price").innerText).toContain(
      `$${formatCurrency(cart.calculateTotalShipping())}`,
    );
    expect(
      document.querySelector(".total-before-tax-price").innerText,
    ).toContain(
      `$${formatCurrency(cart.calculateTotalPrice() + cart.calculateTotalShipping())}`,
    );
  });
});

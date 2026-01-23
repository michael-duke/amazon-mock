import cart, { addToCart } from "../../data/cart.js";

describe("Test Suite: Add to Cart", () => {
  it("Adds an existing product to the Cart", () => {});
  it("Adds a new product to the Cart", () => {
    addToCart("a82c6bac-3067-4e68-a5ba-d827ac0be010", 3);
    expect(cart.lenght).toEqual(1);
  });
});

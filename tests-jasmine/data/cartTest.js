import { cart, loadFromStorage, addToCart } from "../../data/cart.js";

describe("Test Suite: Add to Cart", () => {
  it("Adds an existing product to the Cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify({
        items: [
          {
            productId: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
            quantity: 1,
            deliverOptionId: "2",
          },
        ],
      });
    });

    addToCart("a82c6bac-3067-4e68-a5ba-d827ac0be010");
    expect(cart.items.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.items[0].productId).toEqual(
      "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    );
    expect(cart.items[0].quantity).toEqual(2);
  });
  it("Adds a new product to the Cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify({ items: [], total: 0 });
    });

    //Load the cart that has been mocked
    loadFromStorage();

    addToCart("a82c6bac-3067-4e68-a5ba-d827ac0be010");
    expect(cart.items.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.items[0].productId).toEqual(
      "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    );
    expect(cart.items[0].quantity).toEqual(1);
  });
});

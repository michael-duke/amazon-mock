import {
  cart,
  loadFromStorage,
  addToCart,
  calculateTotalQuantity,
  calculateTotalPrice,
  calculateTotalShipping,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("Automated tests for Cart", () => {
  const mockCart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
  describe("Test Suite: Add to Cart", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem");
      Object.assign(cart, mockCart);
    });
    it("Adds an existing product to the Cart", () => {
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify({
          items: [
            {
              productId: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
              quantity: 1,
              deliveryOptionId: "2",
            },
          ],
        });
      });
      //Load the cart that has been mocked
      loadFromStorage();

      addToCart("a82c6bac-3067-4e68-a5ba-d827ac0be010");
      expect(cart.items.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify({
          items: [
            {
              productId: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
              quantity: 2,
              deliveryOptionId: "2",
            },
          ],
          // Since when adding the keys totalQuantity
          // and totalPrice are changed we add them here
          totalQuantity: calculateTotalQuantity(),
          totalPrice: calculateTotalPrice(),
        }),
      );
      expect(cart.items[0].productId).toEqual(
        "a82c6bac-3067-4e68-a5ba-d827ac0be010",
      );
      expect(cart.items[0].quantity).toEqual(2);
    });
    it("Adds a new product to the Cart", () => {
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify({ items: [] });
      });

      //Load the cart that has been mocked
      loadFromStorage();

      addToCart("a82c6bac-3067-4e68-a5ba-d827ac0be010");
      expect(cart.items.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify({
          items: [
            {
              productId: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
              quantity: 1,
              deliveryOptionId: "1",
            },
          ],
          // Since when adding the keys totalQuantity
          // and totalPrice are changed we add them here
          totalQuantity: calculateTotalQuantity(),
          totalPrice: calculateTotalPrice(),
        }),
      );
      expect(cart.items[0].productId).toEqual(
        "a82c6bac-3067-4e68-a5ba-d827ac0be010",
      );
      expect(cart.items[0].quantity).toEqual(1);
    });
  });

  describe("Test Suite: Calculates the totals", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem");
      Object.assign(cart, mockCart);
    });
    it("Calculates the total quantity/items", () => {
      console.log(cart);
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 2,
            },
          ],
        });
      });

      //Load the cart that has been mocked
      loadFromStorage();

      expect(calculateTotalQuantity()).toEqual(5);
    });
    it("Calculates the total price", () => {
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 2,
            },
          ],
        });
      });
      loadFromStorage();
      expect(calculateTotalPrice()).toEqual(6587);
    });
    it("Calculates the total shipping and handling", () => {
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
              deliveryOptionId: "2",
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 2,
              deliveryOptionId: "3",
            },
          ],
        });
      });
      loadFromStorage();
      expect(calculateTotalShipping()).toEqual(1498);
    });
  });

  describe("Test Suite: Remove from Cart", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem");
      Object.assign(cart, mockCart);
    });
    it("Removes item that is in the cart", () => {
      spyOn(localStorage, "getItem").and.callFake(() =>
        JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
              deliveryOptionId: "2",
            },
          ],
        }),
      );
      loadFromStorage();
      removeFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
      expect(cart.items.length).toEqual(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify({
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        }),
      );
    });
    it("Removes item that is not in the cart", () => {
      spyOn(localStorage, "getItem").and.callFake(() =>
        JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
              deliveryOptionId: "2",
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 2,
              deliveryOptionId: "3",
            },
          ],
        }),
      );
      loadFromStorage();
      removeFromCart("73d4ca15-0f35-48f5-b7a3-1ea210004f2e");
      expect(cart.items.length).toEqual(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
              deliveryOptionId: "2",
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 2,
              deliveryOptionId: "3",
            },
          ],
          totalQuantity: calculateTotalQuantity(),
          totalPrice: calculateTotalPrice(),
        }),
      );
    });
  });

  describe("Test Suite: Update Delivery Option", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem");
      Object.assign(cart, mockCart);
      spyOn(localStorage, "getItem").and.callFake(() =>
        JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
              deliveryOptionId: "2",
            },
          ],
        }),
      );
    });
    it("Updates the delivery option of an existing item", () => {
      loadFromStorage();
      updateDeliveryOption("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", "1");

      expect(cart.items[0].deliveryOptionId).toEqual("1");
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify({
          items: [
            {
              productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              quantity: 3,
              deliveryOptionId: "1",
            },
          ],
          totalQuantity: 0,
          totalPrice: 0,
        }),
      );
    });

    it("Updates the delivery option of an item that is not in the cart", () => {
      
      loadFromStorage();
      updateDeliveryOption("15b6fc6f-327a-4ec4-896f-486349e85a3d", "1");

      expect(cart.items[0].deliveryOptionId).toEqual("2");
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
  });
});

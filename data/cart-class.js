import deliveryOptions, { getDeliveryOption } from "./deliveryOptions.js";
import { getProduct } from "./products.js";

class Cart {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.items = undefined;
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.loadFromStorage();
  }
  loadFromStorage() {
    const storedData = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (storedData) {
      this.items = storedData;
      this.calculateTotalQuantity();
      this.calculateTotalPrice();
    } else {
      this.items = [
        {
          productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "2",
        },
      ];
      this.calculateTotalQuantity();
      this.calculateTotalPrice();
    }
  }
  addToCart(productId, selectedQuantity = 1) {
    let matchingItem;

    this.items.forEach((cartItem) => {
      if (cartItem.productId === productId) matchingItem = cartItem;
    });

    if (matchingItem) matchingItem.quantity += selectedQuantity;
    else
      this.items.push({
        productId,
        quantity: selectedQuantity,
        deliveryOptionId: "1",
      });

    this.calculateTotalQuantity();
    this.calculateTotalPrice();
    this.saveToStorage();
  }
  calculateTotalQuantity() {
    this.totalQuantity = this.items.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    return this.totalQuantity;
  }
  calculateTotalPrice() {
    this.totalPrice = this.items.reduce(
      (total, cartItem) =>
        total + getProduct(cartItem.productId).priceCents * cartItem.quantity,
      0,
    );

    return this.totalPrice;
  }
  calculateTotalShipping() {
    return this.items.reduce(
      (totalShipping, cartItem) =>
        totalShipping + getDeliveryOption(cartItem.deliveryOptionId).priceCents,
      0,
    );
  }
  updateQuantity(productId, newQuantity) {
    const matchingItem = this.items.find((i) => i.productId === productId);
    matchingItem.quantity = newQuantity;
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
    this.saveToStorage();
  }
  removeFromCart(productId) {
    this.items = this.items.filter((item) => item.productId !== productId);
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
    this.saveToStorage();
  }
  updateDeliveryOption(productId, newDeliveryOptionId) {
    const validOption = deliveryOptions.find(
      (option) => option.id === newDeliveryOptionId,
    );
    if (!validOption) return;

    const cartItem = this.items.find((item) => item.productId === productId);

    if (!cartItem) return;

    cartItem.deliveryOptionId = newDeliveryOptionId;
    this.saveToStorage();
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.items));
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

businessCart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

console.log(cart);
console.log(businessCart);

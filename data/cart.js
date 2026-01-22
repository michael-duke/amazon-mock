import { getProduct } from "./products.js";

let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart)
  cart = {
    items: [
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
    ],
    totalQuantity: 0,
    totalPrice: 0,
  };

export function addToCart(productId, selectedQuantity) {
  let matchingItem;

  cart.items.forEach((cartItem) => {
    if (cartItem.productId === productId) matchingItem = cartItem;
  });

  if (matchingItem) matchingItem.quantity += selectedQuantity;
  else
    cart.items.push({
      productId,
      quantity: selectedQuantity,
      deliveryOptionId: "1",
    });

  calculateTotalQuantity();
  saveToStorage();
}

export function calculateTotalQuantity() {
  cart.total = cart.items.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  return cart.total;
}

export function calculateTotalPrice() {
  return cart.items.reduce(
    (totalPrice, cartItem) =>
      totalPrice + getProduct(cartItem.productId).priceCents * cartItem.quantity,
    0,
  );
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem = cart.items.find((i) => i.productId === productId);
  matchingItem.quantity = newQuantity;
  calculateTotalQuantity();
  saveToStorage();
}

export function removeFromCart(productId) {
  cart.items = cart.items.filter((item) => item.productId !== productId);
  calculateTotalQuantity();
  saveToStorage();
}

export function updateDeliveryOption(productId, newDeliveryOptionId) {
  const cartItem = cart.items.find((item) => item.productId === productId);

  cartItem.deliveryOptionId = newDeliveryOptionId;
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default cart;

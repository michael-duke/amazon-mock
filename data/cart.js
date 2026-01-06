export const cart = {
  items: [
    {
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 1,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
    },
  ],
};

cart.total = cart.items.reduce(
  (total, cartItem) => total + cartItem.quantity,
  0
);

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
    });

  console.log(cart);
}

export function updateCartQuantity() {
  // Update the Cart quantity notificatioon
  document.querySelector(".cart-quantity").innerHTML = cart.total;
}

export default cart;

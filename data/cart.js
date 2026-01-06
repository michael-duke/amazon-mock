export const cart = [];

export function addToCart(productId, selectedQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) matchingItem = cartItem;
  });

  if (matchingItem) matchingItem.quantity += selectedQuantity;
  else
    cart.push({
      productId,
      quantity: selectedQuantity,
    });

  console.log(cart);
}

export function updateCartQuantity() {
  const cartQuantity = cart.reduce(
    (total, cartItem) => (total += cartItem.quantity),
    0
  );

  // Update the Cart quantity notificatioon
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}

export default cart;
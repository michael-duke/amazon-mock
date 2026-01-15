export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart)
  cart = {
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
    total: 0,
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
    });

  updateCartQuantity();
  saveToStorage();
}

export function updateCartQuantity() {
  // Calculate the Cart quantity
  cart.total = cart.items.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  // Update cart quantiy notification
  const cartQuantityNotifier = document.querySelector(".cart-quantity");
  if (cartQuantityNotifier) cartQuantityNotifier.innerHTML = cart.total;

  // Update the Checkout Header
  const checkoutHeader = document.querySelector(".return-to-home-link");
  
  if (checkoutHeader) checkoutHeader.innerHTML = `${cart.total} items`;
}

export function removeFromCart(productId) {
  cart.items = cart.items.filter((item) => item.productId !== productId);
  //Recalculate the total after deletion
  updateCartQuantity();
  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default cart;

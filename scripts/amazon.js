import products from "../data/products.js";
import { cart } from "../data/cart.js";

products.forEach((product) => {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");

  productContainer.innerHTML = `
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
         ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${
          product.id
        }">
          Add to Cart
        </button>
      `;

  document.querySelector(".products-grid").appendChild(productContainer);
});

document.querySelectorAll(".add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const selectedQuantity = +document.querySelector(
      `.quantity-selector-${productId}`
    ).value;

    let matchingItem, timeoutId;

    cart.forEach((item) => {
      if (item.productId === productId) matchingItem = item;
    });

    if (matchingItem) matchingItem.quantity += selectedQuantity;
    else
      cart.push({
        productId,
        quantity: selectedQuantity,
      });

    console.log(cart);

    const cartQuantity = cart.reduce(
      (total, item) => (total += item.quantity),
      0
    );

    // Update the Cart quantity notificatioon
    document.querySelector(".cart-quantity").innerHTML = cartQuantity;

    document
      .querySelector(`.added-to-cart-${productId}`)
      .classList.add("make-visible");

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      document
        .querySelector(`.added-to-cart-${productId}`)
        .classList.remove("make-visible");
    }, 2000);
  });
});

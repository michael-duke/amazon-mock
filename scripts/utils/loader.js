export function renderSkeletonGrid() {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  let skeletonHTML = "";

  for (let i = 0; i < 12; i++) {
    skeletonHTML += `
      <div class="skeleton-card">
        <div class="skeleton-image skeleton-box"></div>

        <div class="skeleton-name-line-1 skeleton-box"></div>
        <div class="skeleton-name-line-2 skeleton-box"></div>

        <div class="skeleton-rating-container">
          <div class="skeleton-stars skeleton-box"></div>
          <div class="skeleton-rating-count skeleton-box"></div>
        </div>

        <div class="skeleton-price skeleton-box"></div>
        <div class="skeleton-quantity skeleton-box"></div>
        <div class="skeleton-extra-info"></div> 

        <div class="skeleton-spacer"></div> 
        
        <div class="skeleton-button skeleton-box"></div>
      </div>
    `;
  }

  productsGrid.innerHTML = skeletonHTML;
}

export function renderCartLoader() {
  const cartQuantity = document.querySelector(".cart-quantity");
  if (!cartQuantity) return;

  // Clear current number and add the loading class
  cartQuantity.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  cartQuantity.classList.add("cart-quantity-loading");
}

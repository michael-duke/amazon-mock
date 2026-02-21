export function renderProductsSkeleton() {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  productsGrid.classList.add("is-visible");
  let skeletonHTML = "";

  for (let i = 0; i < 12; i++) {
    skeletonHTML += `
      <div class="product-card-skeleton">
        <div class="skel-image skeleton-box"></div>

        <div class="skel-name-line-1 skeleton-box"></div>
        <div class="skel-name-line-2 skeleton-box"></div>

        <div class="skel-rating-container">
          <div class="skel-stars skeleton-box"></div>
          <div class="skel-rating-count skeleton-box"></div>
        </div>

        <div class="skel-price skeleton-box"></div>
        <div class="skel-quantity skeleton-box"></div>
        <div class="skel-extra-info"></div> 

        <div class="skel-spacer"></div> 
        
        <div class="skel-button skeleton-box"></div>
      </div>
    `;
  }

  requestAnimationFrame(() => (productsGrid.innerHTML = skeletonHTML));
}

export function renderOrdersSkeleton() {
  const ordersGrid = document.querySelector(".orders-grid");
  if (!ordersGrid) return;

  let skeletonHTML = "";

  for (let i = 0; i < 3; i++) {
    skeletonHTML += `
      <div class="order-container-skeleton">
        <div class="order-header-skeleton">
          <div class="order-header-left-skeleton">
            <div class="skel-header-item skeleton-box"></div>
            <div class="skel-header-item skeleton-box"></div>
          </div>
          <div class="skel-header-item skeleton-box"></div>
        </div>

        <div class="order-details-grid-skeleton">
          <div class="product-image-container">
            <div class="skel-img skeleton-box"></div>
          </div>
          
          <div class="product-details">
            <div class="skel-name skeleton-box"></div>
            <div class="skel-delivery skeleton-box"></div>
            <div class="skel-qty skeleton-box"></div>
            <div class="skel-buy-again skeleton-box"></div>
          </div>

          <div class="product-actions">
            <div class="skel-track skeleton-box"></div>
          </div>
        </div>
      </div>
    `;
  }

  ordersGrid.innerHTML = skeletonHTML;
}

export function renderTrackingSkeleton() {
  const orderTracking = document.querySelector(".order-tracking");
  if (!orderTracking) return;

  orderTracking.innerHTML = `
    <div class="tracking-skeleton-container">
      <div class="skel-back-link skeleton-box"></div>
      <div class="skel-delivery-date skeleton-box"></div>
      
      <div class="skel-product-info skeleton-box"></div>
      <div class="skel-product-info-sm skeleton-box"></div>

      <div class="skel-tracking-img skeleton-box"></div>

      <div class="skel-progress-labels">
        <div class="skel-progress-text skeleton-box"></div>
        <div class="skel-progress-text skeleton-box"></div>
        <div class="skel-progress-text skeleton-box"></div>
      </div>

      <div class="skel-progress-bar-container skeleton-box"></div>
    </div>
  `;
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

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

export function refreshAllSummariesSkeleton() {
  renderCheckoutHeaderSkeleton();
  renderOrderSummarySkeleton();
  renderPaymentSummarySkeleton();
}

function renderCheckoutHeaderSkeleton() {
  const middleSection = document.querySelector(
    ".checkout-header-middle-section",
  );
  if (middleSection) {
    middleSection.innerHTML = `
      Checkout( <div class="skeleton-box skeleton-header-quantity"></div> )
    `;
  }
}

function renderOrderSummarySkeleton() {
  const orderSummary = document.querySelector(".order-summary");

  let skeletonHTML = "";
  for (let i = 0; i < 3; i++) {
    skeletonHTML += `
      <div class="cart-item-container">
        <div class="skeleton-box skeleton-date"></div>

        <div class="cart-item-details-grid">
          <div class="skeleton-box skeleton-image-box"></div>

          <div class="cart-item-details">
            <div class="skeleton-box skeleton-name-line"></div>
            <div class="skeleton-box skeleton-price-line"></div>
          </div>

          <div class="delivery-options">
            <div class="skeleton-box skeleton-options-title"></div>
            
            ${Array(3)
              .fill(
                `
              <div class="skeleton-option-row">
                <div class="skeleton-box skeleton-radio"></div>
                <div class="skeleton-box skeleton-option-text"></div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }
  orderSummary.innerHTML = skeletonHTML;
}

export function renderPaymentSummarySkeleton() {
  const paymentSummary = document.querySelector(".payment-summary");
  if (!paymentSummary) return;

  paymentSummary.innerHTML = `
    <div class="payment-summary-title">Order Summary</div>
    ${Array(4)
      .fill(
        `
      <div class="payment-summary-row">
        <div class="skeleton-box skeleton-payment-row-text"></div>
        <div class="skeleton-box skeleton-payment-row-money"></div>
      </div>
    `,
      )
      .join("")}

    <div class="payment-summary-row total-row">
      <div class="skeleton-box skeleton-payment-row-text"></div>
      <div class="skeleton-box skeleton-payment-row-money"></div>
    </div>

    <div class="skeleton-box skeleton-button"></div>
  `;
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

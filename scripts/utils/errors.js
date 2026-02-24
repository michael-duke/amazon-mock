export function handleError(containerSelector, message) {
  const container = document.querySelector(containerSelector);
  if (container) {
    container.innerHTML = `
      <div class="error-container">
        <svg class="error-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#c45500" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="error-message">
          We're sorry! We're having trouble loading this page right now.
          <p>${message}</p>
        </div>
        <p>Please check your internet connection or try again.</p>
        <button class="error-retry-button">
          Try Again
        </button>
      </div>
    `;

    container
      .querySelector(".error-retry-button")
      .addEventListener("click", () => {
        window.location.reload();
      });
  }
}

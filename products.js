import { products } from "./data.js";
import { addToCart, getCart } from "./cart.js";

// Render all products to the page
export function renderProducts(filteredProducts) {
  const list = filteredProducts || products;
  const cart = getCart();
  let html = "";

  list.forEach((product) => {
    const inCart = cart.find((item) => item.id === product.id);

    // Determine button state
    let btnText = "♡ Add to Bag";
    let btnDisabled = "";

    if (!product.isAvailable) {
      btnText = "Not Available";
      btnDisabled = "disabled";
    } else if (inCart) {
      btnText = "✓ Already in Bag";
      btnDisabled = "disabled";
    }

    html += `
      <div class="product-container">
        <span class="ribbon">🎀</span>
        <div class="product-img">${product.emoji}</div>
        <p class="product-name">${product.productName}</p>
        <p class="product-price">${product.currency} ${product.price.toFixed(2)}</p>
        <p class="product-avail ${product.isAvailable ? "avail-yes" : "avail-no"}">
          ${product.isAvailable ? "✧ Available" : "✧ Sold Out"}
        </p>
        <button class="add-button" data-id="${product.id}" ${btnDisabled}>
          ${btnText}
        </button>
      </div>
    `;
  });

  document.getElementById("product-parent").innerHTML = html;

  // Attach click event listeners to all Add to Cart buttons
  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Search / Filter functionality
document.getElementById("search-input").addEventListener("input", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const filtered = products.filter((p) =>
    p.productName.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// Initial render
renderProducts();

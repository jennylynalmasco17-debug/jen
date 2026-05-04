import { products } from "./data.js";
import { renderProducts } from "./products.js";

// Load cart from localStorage (optional feature: persistence)
let cart = JSON.parse(localStorage.getItem("coquetteCart")) || [];

// Get current cart
export function getCart() {
  return cart;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("coquetteCart", JSON.stringify(cart));
}

// Add item to cart
export function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product || !product.isAvailable) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) return; // Already in cart — button should be disabled

  cart.push({
    id: product.id,
    productName: product.productName,
    price: product.price,
    currency: product.currency,
    quantity: 1,
    emoji: product.emoji,
  });

  saveCart();
  renderAll();
}

// Increase quantity
function increaseQty(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity++;
    saveCart();
    renderAll();
  }
}

// Decrease quantity
function decreaseQty(productId) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeItem(productId);
    } else {
      saveCart();
      renderAll();
    }
  }
}

// Remove individual item
function removeItem(productId) {
  cart = cart.filter((i) => i.id !== productId);
  saveCart();
  renderAll();
}

// Clear entire cart
function clearCart() {
  cart = [];
  saveCart();
  renderAll();
}


// Checkout (optional feature)
function checkout() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  alert(
    "🎀 Thank you for your order, darling!" + "Total: PHP " + " total.toFixed(2) + Your coquette items are on the way!"
  );
  clearCart();
}


// Render the cart section
function renderCart() {
  const cartItemsEl = document.getElementById("cart-items");
  const cartFooter = document.getElementById("cart-footer");
  const badge = document.getElementById("cart-badge");
  const totalEl = document.getElementById("cart-total-amount");

  // Update badge with total item count
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  badge.textContent = totalItems;

  // Empty cart message
  if (cart.length === 0) {
    cartItemsEl.innerHTML =
      '<div class="empty-msg">Your bag is empty, darling! 🎀</div>';
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";
  let html = "";
  let grandTotal = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    grandTotal += subtotal;

    html += `
      <div class="cart-item">
        <div class="ci-top">
          <span class="ci-name">${item.emoji} ${item.productName}</span>
          <span class="ci-price">${item.currency} ${item.price.toFixed(2)}</span>
        </div>
        <div class="ci-bottom">
          <div class="qty-ctrl">
            <button class="qty-btn decrease-btn" data-id="${item.id}">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn increase-btn" data-id="${item.id}">+</button>
          </div>
          <button class="remove-btn" data-id="${item.id}">✕ Remove</button>
        </div>
        <div class="ci-sub">Subtotal: ${item.currency} ${subtotal.toFixed(2)}</div>
      </div>
    `;
  });

  cartItemsEl.innerHTML = html;
  totalEl.textContent = "PHP " + grandTotal.toFixed(2);

  // Attach event listeners for cart buttons
  document.querySelectorAll(".increase-btn").forEach((btn) => {
    btn.addEventListener("click", () => increaseQty(Number(btn.dataset.id)));
  });
  document.querySelectorAll(".decrease-btn").forEach((btn) => {
    btn.addEventListener("click", () => decreaseQty(Number(btn.dataset.id)));
  });
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => removeItem(Number(btn.dataset.id)));
  });
}

// Render everything
function renderAll() {
  renderProducts();
  renderCart();
}

// Clear & Checkout button listeners
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);
document.getElementById("checkout-btn").addEventListener("click", checkout);

// Initial cart render
renderCart();



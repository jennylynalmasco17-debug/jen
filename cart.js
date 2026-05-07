export let cart = [];

export function renderCart() {
    const container = document.getElementById("cart-container");
    const totalEl = document.getElementById("total-price");
    const badge = document.getElementById("cart-quantity");
    
    container.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your bag is empty... 🎀</p>"; 
    } else {
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity; // 
            total += subtotal;
            count += item.quantity;

            container.innerHTML += `
                <div class="cart-item">
                    <span>${item.productName} ($${item.price})</span>
                    <div>
                        <button onclick="window.changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="window.changeQty(${index}, 1)">+</button>
                    </div>
                    <span>$${subtotal}</span>
                    <button onclick="window.removeItem(${index})">Remove</button>
                </div>
            `;
        });
    }
    totalEl.innerText = total.toFixed(2); // 
    badge.innerText = count; // 
}

// Global functions so HTML buttons can find them in a module
window.addToCart = (product) => {
    cart.push({ ...product, quantity: 1 });
    renderCart();
    window.renderProducts(); 
};

window.changeQty = (index, amt) => {
    cart[index].quantity += amt; // 
    if (cart[index].quantity <= 0) window.removeItem(index);
    renderCart();
};

window.removeItem = (index) => {
    cart.splice(index, 1); // 
    renderCart();
    window.renderProducts();
};

window.clearCart = () => {
    cart.length = 0; // 
    renderCart();
    window.renderProducts();
};

window.checkout = () => {
    alert("Thank you for your purchase! 🎀"); // 
};
export let cart = [];

export function renderCart(onUpdateProducts) {
    const container = document.getElementById("cart-container");
    const totalEl = document.getElementById("total-price");
    const badge = document.getElementById("cart-quantity");
    
    let html = ""; 
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        html = "<p>Your bag is empty... 🎀</p>";
    } else {
        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            count += item.quantity;

            html += `
                <div class="cart-item" style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #f9d8dd;">
                    <span>${item.productName}</span>
                    <div class="qty-controls">
                        <button class="qty-minus" data-idx="${index}">-</button>
                        <span style="margin: 0 10px;">${item.quantity}</span>
                        <button class="qty-plus" data-idx="${index}">+</button>
                    </div>
                    <span>$${subtotal.toFixed(2)}</span>
                    <button class="remove-item" data-idx="${index}">Remove</button>
                </div>
            `;
        });
    }

    container.innerHTML = html;
    totalEl.innerText = total.toFixed(2);
    badge.innerText = count;

    document.querySelectorAll(".qty-plus").forEach(btn => {
        btn.onclick = () => {
            const i = btn.dataset.idx;
            cart[i].quantity += 1; 
            renderCart(onUpdateProducts);
            if (onUpdateProducts) onUpdateProducts();
        };
    });

    document.querySelectorAll(".qty-minus").forEach(btn => {
        btn.onclick = () => {
            const i = btn.dataset.idx;
            cart[i].quantity -= 1;
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            renderCart(onUpdateProducts);
            if (onUpdateProducts) onUpdateProducts();
        };
    });

    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.onclick = () => {
            cart.splice(btn.dataset.idx, 1);
            renderCart(onUpdateProducts);
            if (onUpdateProducts) onUpdateProducts();
        };
    });
}
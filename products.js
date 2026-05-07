import { products } from "./data.js";
import { cart, renderCart } from "./cart.js";

const productParent = document.getElementById("product-parent");
const searchInput = document.getElementById("search-input");

function renderProducts() {
    let html = "";
    const searchTerm = searchInput.value.toLowerCase();

    products.forEach((product, index) => {
        if (product.productName.toLowerCase().includes(searchTerm)) {
            
            const isInCart = cart.some(item => item.productName === product.productName);
            
            html += `
                <div class="product-container" style="background: white; padding: 20px; border-radius: 15px; border: 1px solid #f9d8dd; width: 220px; text-align: center;">
                    <div class="product-image" style="font-size: 50px; margin-bottom: 10px;">${product.image}</div>
                    <div class="product-name" style="font-size: 24px; font-weight: bold; color: #c94c6d;">${product.productName}</div>
                    <div class="product-price">${product.currency} ${product.price}</div>
                    <div class="product-status" style="font-style: italic; color: #888; margin: 10px 0;">
                        ${product.isAvailable ? "Available" : "Not Available"}
                    </div>
                    <button class="add-btn" 
                        ${!product.isAvailable || isInCart ? 'disabled' : ''} 
                        id="prod-btn-${index}"
                        style="background-color: antiquewhite; border: none; padding: 12px; border-radius: 6px; cursor: pointer; width: 100%;">
                        ${isInCart ? 'Already in Bag' : 'Add to Bag'}
                    </button>
                </div>
            `;
        }
    });

    productParent.innerHTML = html;

    products.forEach((product, index) => {
        const btn = document.getElementById(`prod-btn-${index}`);
        if (btn) {
            btn.onclick = () => {
        
                let itemInCart = cart.find(item => item.productName === product.productName);

                if (itemInCart) {
                    itemInCart.quantity += 1;
                } else {

                    cart.push({
                        productName: product.productName,
                        price: product.price,
                        currency: product.currency,
                        image: product.image,
                        quantity: 1
                    });
                }

                renderCart(renderProducts);
                renderProducts();
            };
        }
    });
}

if (searchInput) {
    searchInput.oninput = renderProducts;
}

const clearBtn = document.getElementById("clear-btn");
if (clearBtn) {
    clearBtn.onclick = () => {
        cart.length = 0;
        renderCart(renderProducts);
        renderProducts();
    };
}

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
    checkoutBtn.onclick = () => {
        if (cart.length > 0) {
            alert("Thank you for your purchase! 🎀");
            cart.length = 0;
            renderCart(renderProducts);
            renderProducts();
        }
    };
}

renderProducts();
renderCart(renderProducts);
import { products } from "./data.js";
import { cart, renderCart } from "./cart.js";

let searchTerm = "";

window.handleSearch = () => {
    searchTerm = document.getElementById("search-input").value.toLowerCase(); 
    window.renderProducts();
};

window.renderProducts = () => {
    const parent = document.getElementById("product-parent");
    parent.innerHTML = "";

    const filtered = products.filter(p => 
        p.productName.toLowerCase().includes(searchTerm)
    );

    filtered.forEach((product) => {
        const isInCart = cart.some(item => item.productName === product.productName);
        
        parent.innerHTML += `
            <div class="product-container">
                <div style="font-size: 40px;">${product.image}</div>
                <p class="product-name">${product.productName}</p>
                <p>$${product.price}</p>
                <button class="add-button" 
                    ${!product.isAvailable || isInCart ? 'disabled' : ''} 
                    onclick='addToCart(${JSON.stringify(product)})'>
                    ${isInCart ? 'Already in Bag' : 'Add to Bag'}
                </button>
            </div>
        `;
    });
};

window.renderProducts();
renderCart();
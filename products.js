import {increamentCart} from "./cart.js";
import {products} from "./data.js";

let html ="";

products.forEach(
    (product) =>
    (html +=`
    <div class="product-container">
       <p class="product-name">${product.productName}</p>
       <p>${product.price}</p>
       <P>${product.isAvailable ? "Available" : "Not Available"}</p>
       <p>${product.image}</p>
       <button class="add-button">Add to Cart</button>
       </div>
         `),
       );

       document.getElementById("product-parent").innerHTML = html;
       document.querySelectorAll(".add-button").forEach((button) => {
        button.addEventListener("click", increamentCart);
});
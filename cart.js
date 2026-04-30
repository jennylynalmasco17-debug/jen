let cartQty = 0;

export const increamentCart = () => {
    cartQty++;
    renderCart();
};

const renderCart = () => {
    document.getElementById("cart-quantity").innertext = `cart: ${cartQty}`;
};

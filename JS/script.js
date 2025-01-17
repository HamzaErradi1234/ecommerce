// Gestion du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.dataset.product;
        const productPrice = parseFloat(e.target.dataset.price);

        // Ajouter l'article au panier
        cart.push({ productName, productPrice });
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mettre à jour le compteur du panier
        updateCartCount();
    });
});

function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').innerText = `(${cartCount})`;

    // Mettre à jour le panier sur la page du panier
    if (document.body.contains(document.getElementById('cart-items'))) {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = '';  // Réinitialiser le contenu du panier
        let totalPrice = 0;
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `<strong>${item.productName}</strong> - ${item.productPrice}€`;
            cartItemsDiv.appendChild(itemDiv);
            totalPrice += item.productPrice;
        });
        document.getElementById('total-price').innerText = `Total: ${totalPrice}€`;
    }
}

// Mise à jour du panier au chargement de la page
updateCartCount();

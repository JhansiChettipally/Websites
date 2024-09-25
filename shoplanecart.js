
  

let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
let cartCountElement = document.getElementById("cart-count");
let cartSection = document.getElementById("cart-section");
let billElement = document.getElementById("bill");


cartCountElement.innerText = cartItemsFromLocalStorage.length;

let totalPrice = cartItemsFromLocalStorage.reduce((acc, item) => {
    return acc + parseFloat(item.productPrice) || 0; 
}, 0);
billElement.innerText = totalPrice.toFixed(2); 


if (cartItemsFromLocalStorage.length > 0) {
    cartItemsFromLocalStorage.forEach((item, i) => {
        cartSection.innerHTML += `
            <div class="product-card"> 
                <img class="cart-product-image" src="${item.productImg}" alt="${item.productName}" />
                <div class="product-details">
                    <h3>${item.productName}</h3>
                    <p>Rs ${item.productPrice}</p>
                    <button onclick="removeFromCart(${i})" id="remove-from-cart-btn">Remove From Cart</button>
                    <button class="add-btn" onclick="wishlistAndRemoveFromCart(${i})">Move to Wishlist</button>
                </div>
            </div>
        `;
    });
} else {
    cartSection.innerHTML = "<p>Your cart is empty.</p>";
}


function removeFromCart(index) {
    cartItemsFromLocalStorage.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItemsFromLocalStorage));
    location.reload();
}


function placeOrder() {
    if (cartItemsFromLocalStorage.length > 0) {
        localStorage.removeItem("cartItems");
        alert("Your order is successfully placed!");
        location.reload();
    } else {
        alert("Your cart is empty. Please add items to your cart.");
    }
}


function wishlist(name, price, img) {
    let obj = {
        productName: name,
        productPrice: price,
        productImg: img
    };

    let wishlistItemsFromLocalStorage = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    let itemExists = wishlistItemsFromLocalStorage.some(item => item.productName === obj.productName);

    if (!itemExists) {
        wishlistItemsFromLocalStorage.push(obj);
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItemsFromLocalStorage));
        alert("Item added to wishlist.");
    } else {
        alert("Item already exists in the wishlist.");
    }
}


function wishlistAndRemoveFromCart(index) {
    if (cartItemsFromLocalStorage[index]) {
        let item = cartItemsFromLocalStorage[index];
        wishlist(item.productName, item.productPrice, item.productImg);
        removeFromCart(index);
    }
}

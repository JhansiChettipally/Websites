




let wishlistSection = document.getElementById("wishlist-section");
let cartCountElement = document.getElementById("cart-count");


let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
cartCountElement.innerText = cartItemsFromLocalStorage.length;


let wishlistItemsFromLocalStorage = JSON.parse(localStorage.getItem("wishlistItems")) || [];


if (wishlistItemsFromLocalStorage.length > 0) {
    
    wishlistItemsFromLocalStorage.forEach((item, index) => {
        wishlistSection.innerHTML += `
        <div class="wishlist-items">
            <img class="wishlist-item-image" src="${item.productImg}" alt="${item.productName}" />
            <div class="item-details">
                <h3>${item.productName}</h3>
                <p>Rs ${item.productPrice}</p>
                <button onclick="removeFromWishlist(${index})" id="remove-from-cart-btn">Remove From Wishlist</button>
                <button class="add-btn" onclick="addToCartAndRemoveFromWishlist(${index})">Add to cart</button>
            </div>
        </div>
        `;
    });
} else {
    wishlistSection.innerHTML = "<p>Your wishlist is empty.</p>";
}


function removeFromWishlist(index) {
    wishlistItemsFromLocalStorage.splice(index, 1);
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItemsFromLocalStorage));
    location.reload(); 
}


function addToCart(name, price, img) {
    let obj = {
        productName: name,
        productPrice: price,
        productImg: img
    };

    
    let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

    
    cartItemsFromLocalStorage.push(obj);
    localStorage.setItem("cartItems", JSON.stringify(cartItemsFromLocalStorage));

    
    cartCountElement.innerText = cartItemsFromLocalStorage.length;
}


function addToCartAndRemoveFromWishlist(index) {
    let item = wishlistItemsFromLocalStorage[index];

    
    addToCart(item.productName, item.productPrice, item.productImg);

    
    removeFromWishlist(index);
}


        
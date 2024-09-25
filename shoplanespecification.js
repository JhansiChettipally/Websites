
let p_id=location.search.split("=")[1];
let specificationProduct=document.getElementById("specification-product");
let cartCountElement = document.getElementById("cart-count");

let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"))
if( cartItemsFromLocalStorage != null ){
cartCountElement.innerText = cartItemsFromLocalStorage.length
}

axios.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${p_id}`)
.then((res)=>{
    let productData=res.data;
    specificationProduct.innerHTML+= `<div class="specification-product-image">
        <img id="specification-image"
        src="${productData.preview}"/>
       </div>
       <div class="specification-product-details ">
       <h2>${productData.name}</h2>
       <h4 class="brand-name">${productData.brand}</h4>
       <h3>Description : </h3>
       <div class="product-description">
        <p>${productData.description}</p>
    </div>
    <h3>Product Preview</h3>
    <div id="product-preview"></div>
    <h4>Price : <span class="price-text">Rs ${productData.price}</span></h4>
    <button class="add-btn"
     onclick = "addToCart( '${productData.name}' , '${productData.price}',
     '${productData.preview}'   )"> Add to cart</button>
      <button class="add-btn"      onclick = "wishlist( '${productData.name}' , '${productData.price}',
     '${productData.preview}'   )">Move to Wishlist</button>
       </div>`
    let productPreviewElement=document.getElementById("product-preview");
    productData.photos.map((item,i)=>{

     productPreviewElement.innerHTML+=` <div class="product-preview-card ${i==0 ? `active` :" "}">
                    <img 
                      id="img${i}"
                      class="Preview-card-img" 
                         onclick="productPreviewClicked('img${i}')"
                         src="${item}" />
                </div>`

        

    })

})

 function productPreviewClicked(id){
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById(id).classList.add("active");
    let specificationImage=document.getElementById("specification-image");
    specificationImage.src=document.getElementById(id).src;

 }
     
 function addToCart(name,price,img ){
   let obj = {
       productName : name,
       productPrice : price,
       productImg : img
   }
let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"))
 if( cartItemsFromLocalStorage == null ){
   let cartItems = []
   cartItems.push( obj ); 
   localStorage.setItem( "cartItems" , JSON.stringify(cartItems)  )
   cartCountElement.innerText = cartItems.length

 }   
 else{
   
   let cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
   cartItemsFromLocalStorage.push(obj)  
   localStorage.setItem( "cartItems" , JSON.stringify(cartItemsFromLocalStorage)  );
   cartCountElement.innerText = cartItemsFromLocalStorage.length
 }
}
function wishlist(name,price,img ){
  let obj = {
      productName : name,
      productPrice : price,
      productImg : img
  }
let wishlistItemsFromLocalStorage = JSON.parse(localStorage.getItem("wishlistItems"));
let itemExists = wishlistItemsFromLocalStorage.some(item => item.productName === obj.productName);
if( wishlistItemsFromLocalStorage == null ){
  let wishlistItems = []
  wishlistItems.push( obj ); 
  localStorage.setItem( "wishlistItems" , JSON.stringify(wishlistItems)  );

}
 else if(itemExists) {
    alert("Item already exists in the wishlist");
}
else{
  
  let wishlistItemsFromLocalStorage = JSON.parse(localStorage.getItem("wishlistItems"));
  wishlistItemsFromLocalStorage.push(obj)  
  localStorage.setItem( "wishlistItems" , JSON.stringify(wishlistItemsFromLocalStorage)  );
}
}







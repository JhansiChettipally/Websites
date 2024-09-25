


  let clothingSection = document.getElementById("clothing-section")
  let accessoriesSection = document.getElementById("accessories-section")

 
  axios.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
.then((res)=>{
    let products=res.data;
    products.map((item,i)=>{
        if( item.isAccessory==false){
        clothingSection.innerHTML+=`
            <div class="product-card" onclick="productClicked('${item.id}')">
            <img class="product-image" src="${item.preview}" alt="${item.name}" />
            <div class="product-details">
                <h3>${item.name}</h3>
                <h5>${item.brand}</h5>
                <h4>Rs ${item.price}</h4>
            </div>
        </div>`;
        }
        else{
                accessoriesSection.innerHTML+=`<div class="product-card" onclick="productClicked('${item.id}')">
                <img class="product-image"
                    src="${item.preview}"/>
                    <div class="product-details">
                        <h3>${item.name}</h3>
                        <h5>${item.brand}</h4>
                        <h4>Rs ${item.price}</h4>
                    </div>
                    </div>`
            

        }
    })

})
 function productClicked(id){
    location.assign(`http://127.0.0.1:5501/shoplanespecification.html?p_id=${id}`);
 }
 function cartClicked(){
    location.assign("http://127.0.0.1:5501/shoplanecart.html");
 }
 function wishlistClicked(){
    location.assign("http://127.0.0.1:5501/shoplanewish.html");
 }
 
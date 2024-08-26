let allCat=document.querySelector(".container2 ul ")
let allProduct=document.querySelector(".allproduct")
let myInput=document.querySelector(".input")
let cartCount = 0; 
const cartElement = document.getElementById('cart'); 

myInput.addEventListener("keyup",(e)=>{
  // e jo hai vo ek cheez hai jo seedha usspar jayegi jis pr eventlistener lagaya hai
  SearchMovie=e.target.value
   console.log(SearchMovie)
   showproduct(SearchMovie)
  
})
//display category
function color(){
  var color='red';
  style.backgroundColor=color;

}

let showcat=()=>{
  fetch('https://dummyjson.com/products/categories')
  .then(ress=>ress.json())
  .then((finelRess)=>{
   
     allCat.innerHTML="";

     finelRess.map((v,i)=>{
      allCat.innerHTML+=`
       <li onclick="filterCat('${v.url}')" >${v.name}</li>
      `
      // iss filtercat ke andar string ke format mein bhena ha url ko
     })
  })
  .catch((error)=>console.log(error))

 
}
showcat()
// ************************************************

//display product


let showproduct=(myUrl)=>{
let Api;
  if(myUrl==undefined){
    Api='https://dummyjson.com/products?limit=100'
  }
  else{
    Api=myUrl
    // filter wala chalega
  }
  fetch(Api)
  .then((ress)=>ress.json())
  .then(finelRess=>{
   
    let finalProduct=finelRess.products;
    allProduct.innerHTML="";

    finalProduct.map((v,i)=>{
      // console.log(v);
      
      allProduct.innerHTML+=`
         <div class="box">
    <img src=${v.thumbnail} alt=""/>
    <h4>Brand: ${v.brand} </h4>
    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
    <span>Price ${v.price} $ </span>
  
    <button class="add-to-cart"; onclick="addToCart(${v.id})"; data-product-id="${v.id}"> Add To Cart</button>

  </div>
      `
     })
     attachAddToCartListeners();
  })
  .catch((error)=>console.log(error))
 

}

showproduct()
let SearchMovie;




let filterCat=(myUrl)=>{
  showproduct(myUrl);
  const allLi = document.querySelectorAll(".container2 ul li");
  allLi.forEach(li => li.style.backgroundColor = ""); // Reset color for all `li` elements
  element.style.backgroundColor = "red"; 
}
function attachAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      cartCount++;
      updateCartDisplay(); 
    });
  });
}

// Update cart display
function updateCartDisplay() {
  cartElement.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> &nbsp; &nbsp;${cartCount}`;
}
function addToCart(catId){
  fetch(`https://dummyjson.com/products/${catId}`)
  // The function addToCart takes an argument catId, which represents the ID of the product the user wants to add to the cart.
  .then((ress)=>{
      return ress.json()
  })
  // The .then((ress) => { return ress.json(); }) part processes the response (ress) from the server. It converts the response to JSON format using the .json() method and passes it to the next .then().
  .then((finelRess)=>{
      // console.log(finalRess)

      let oldData = JSON.parse(localStorage.getItem("addTocart")) ?? [];
      // terninary operator ke baad humne ek ternary operator liya hai jismein ek empty array initializes hai
      // localStorage.getItem("addTocart") retrieves the current cart items as a string.
//JSON.parse converts the string back into a JavaScript array.
//If no data is found in the localStorage, the code uses the ?? [] (nullish coalescing operator) to initialize an empty array ([]). This handles cases where the cart is initially empty.
          let finalData = [...oldData, finelRess];
          // The code creates a new array finalData that contains all the previous cart items (oldData) plus the newly fetched product data (finelRess). The spread operator (...) is used to merge the two arrays.
console.log(oldData)
          localStorage.setItem("addTocart", JSON.stringify(finalData));

  })
}
// The updated cart data (finalData) is then converted back to a JSON string using JSON.stringify and saved in the localStorage under the same key "addTocart".
/*
      SUMMARY OF THE CODE OF ADDTO CART
      The function addToCart is triggered when a user adds a product to the cart.
It fetches the product details using the catId from a remote server (dummyjson.com).
The current cart items are retrieved from the localStorage.
The new product is added to the existing cart.
The updated cart is saved back to localStorage.
The previous cart contents are logged to the console. 

*/ 
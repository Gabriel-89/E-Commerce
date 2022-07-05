"use strict"

// import { pepito } from "/firebase.js";

// while importing, use ./ if script is in another folder
// or / if script is on the same folder.

// console.log(pepito)

import { getProducts, getProduct } from "./firebase.js";

let cart = [];

let total = 0;

//cart Renderer, this function is activated in addToCart();

const renderCart = () => {

    const cartContainer = document.querySelector(".here");

    cartContainer.innerHTML = ""; //Consultar en clase porque esto me limpia los repetidos

cart.forEach(product => {

const card = document.createElement("div");


    card.className = "productInCart";

    card.innerHTML = `

    <div class="separator">

    <img class="imageInCart" src=${product.data().img} alt=${product.data().name}>

   <div class="containerTitleQuantityPriceCart">

       <h4 class="productTitleInCart">${product.data().name}</h3>

       <p class="quantity">Quantity: <input class="quantityNumber" type="number" value="1" min="1"></p>

       <p class="priceInCart">Price: ${product.data().price}</p>
       </div>

       <button class="removeFromCart" id="${product.id}">Remove</button>

                </div>

`

cartContainer.append(card);

})

}



// update Total Function executed in addToCart();

const updateTotal = (price) => {

    let totalNumber = document.querySelector(".totalNumber")

    total += price;

    totalNumber.textContent = `$ ${total}`;

}

// Cart content Consulter

const cartConsulter = (id) =>
 cart.some(product => product.id === id);

 // Add to cart with cartConsulter() / updateTotal() inside;

let addToCart = async (e) => {

    const productId = e.target.id;

    const productName = e.target.name;

    if (cartConsulter(productId)){

        return false

    }
    else {

   const productGoneCart = await getProduct(productId); // ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa

   amountOfItems(); //refreshes amount of items displayed in cart icon

   updateTotal(productGoneCart.data().price)

   cart.push(productGoneCart)

   renderCart();

   

    }

}

// addToCartEvents!

const addToCartEvents = () => {

    let buyBtns = document.querySelectorAll(".addToCartButton");

    buyBtns.forEach(btn => btn.addEventListener("click", addToCart))

    }
 

// Card constructor function

let productContainer = document.querySelector(".productContainer");

const cardConstructor = (products) => {

    products.forEach(product =>{

        // console.log(product.id) here I've tested if this function is properly linked to "products",
        //variable found inside cardRenderer();

    let card = document.createElement("div");

    card.classList.add("cardProduct");

    // let img = product.data().img , for test only

    card.innerHTML = `

    <img src="${product.data().img}" class="productImage">

    </img>

        <div class="productTypeAndPrice">

    <h3 class="productType">${product.data().name}</h3>

        <div class="priceContainer">

    <p class="price" >Price: $${product.data().price}</p>

        </div>

                               </div>

    <button class="addToCartButton" id="${product.id}">Add to Cart</button>

</div>`



productContainer.append(card); // This is CRITICAL...



});

 addToCartEvents();


}

//cart renderer Function

let cardRenderer = async () => {

    const products = await getProducts();
    
    cardConstructor(products)
}
 
cardRenderer();

// Click on cart opens .cartContainer

const clickOnCart = () =>{

    let cartIcon = document.querySelector(".cart");

    let cartContainer = document.querySelector(".cartContainer");

cartIcon.addEventListener("click", () =>{

    if (cartContainer.style.display === 'none') {
        cartContainer.style.display = 'flex'
      } else {
        cartContainer.style.display = 'none'
      }

})

}

clickOnCart();

// cart Icon Quantity

let cartAmount = document.querySelector(".cartAmount");

cartAmount.textContent = 0;

let amountOfItems = () => {

  cartAmount.textContent = cart.length + 1; //arrays start in 0! need to sum 1 to start counting!

}

// Empty cart function

let buttonEmpty = document.querySelector(".buttonEmpty")

let emptyCart = () => {

    total = 0;

    let totalNumber = document.querySelector(".totalNumber");

    totalNumber.textContent = 0;

    cart.length = 0; //this will empty the cart! array lenght
    //is reduced to 0, so all elements inside will be erased.

    let visualCart = document.querySelector(".here")

    visualCart.innerHTML= ""; //and this one empty our visual cart


}

//click Event on button Empty

buttonEmpty.addEventListener("click", emptyCart);

// Finish Purchase funtion

let buttonFinish = document.querySelector(".buttonFinish")

let finishPurchase = () => {

    total = 0;

    let totalNumber = document.querySelector(".totalNumber");

    totalNumber.textContent = 0;

    cart.length = 0; //this will empty the cart! array lenght
    //is reduced to 0, so all elements inside will be erased.

    let visualCart = document.querySelector(".here");

    visualCart.innerHTML= `
    <p class="thankYou">Thank you for your Purchase!</p>
    `
}

//click Event on button Finish Purchase

buttonFinish.addEventListener("click", () => {

        finishPurchase();

}

)

//functions used as an event doesn't use its ();

//if that function is executed inside the event, then:

//(parameter) => function (parameter)





















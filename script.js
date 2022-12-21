import { menuArray } from './data.js'

const lastState = document.getElementById('last-state')
const productsContainer = document.getElementById('products-container')
const checkoutItems = document.getElementById('checkout-items')
const hidden = document.getElementById('hidden')
const checkoutPrice = document.getElementById('checkout-price')
const completeOrderBtn = document.getElementById('complete-order-btn')
const modalPayment = document.getElementById('modal-payment')
const payBtn = document.getElementById('pay-btn')
const checkoutMenu = document.getElementById('checkout-menu')
let price = 0
let chosenProducts = []

document.addEventListener('click', function(e){
  if(e.target.dataset.btn){
    handleAddBtn(e.target.dataset.btn)
  }
  else if(e.target.dataset.remove){
    handleRemoveBtn(e.target.dataset.remove, e.target.parentElement)
  }
  else if(e.target.id === 'complete-order-btn'){
    handleCompleteBtn()
  }
  else if(e.target.id == 'pay-btn'){
    if(document.querySelector('form').checkValidity()){
      generateEndState()
      e.preventDefault()
    }

  }

})

function generateEndState(){
  modalPayment.style.display = 'none'
  hidden.innerHTML = `
    <div class="ending-message">
    <h2>Thanks, James! Your order is on its way!</h2>
    </div>
  `
}

function handleCompleteBtn(){
  modalPayment.style.display = 'flex'
}

function handleAddBtn(productId){
  const chosenProduct = menuArray.filter(function(product){
    return product.id == productId
  })[0]
  chosenProducts.push(chosenProduct)


  generateChosenProducts(chosenProduct)
  hidden.classList.remove('hidden')
  price += chosenProduct.price
  generatePrice(price)

}

function generateChosenProducts(chosenProduct){
  let checkoutItems2 = `
      <div class="checkout">
      <h2>${chosenProduct.name}</h2>
      <button data-remove=${chosenProduct.id} class="remove-btn" id="remove-btn">remove</button>
      <h3 class="margin-left">$${chosenProduct.price}</h3>
      </div>
  `
  checkoutItems.innerHTML += checkoutItems2
}

function generatePrice(price){
  checkoutPrice.innerHTML = `
    <h2>Total price:</h2>
    <h3 class="margin-left">$${price}</h3>
  `
}

function handleRemoveBtn(productId, parentElement){
  parentElement.remove()
  const chosenProduct = menuArray.filter(function(product){
    return product.id == productId
  })[0]

  chosenProducts.pop(chosenProduct)
  price -= chosenProduct.price
  generatePrice(price)
  if(!chosenProducts.length){
    hidden.classList.add('hidden')
  }

}

function generateMenu(){

  let innerMenu = ``

  menuArray.forEach(function(product){
    innerMenu += `
      <div class="product">
        <span class="product-img">${product.emoji}</span>
        <div class="product-desc">
          <h2>${product.name}</h2>
          <p>${product.ingredients}</p>
          <h3 class="product-price">$${product.price}</h3>
        </div>
        <button data-btn="${product.id}" class="add-product-btn margin-left" id="add-product-btn">+</button>
      </div>
    `

  })
  return innerMenu
}

function renderCheckout(checkout){
  checkoutMenu.innerHTML += checkout
}

function render(){
  productsContainer.innerHTML += generateMenu()
}

render()

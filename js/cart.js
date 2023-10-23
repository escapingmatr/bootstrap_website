// Function to load cart items from local storage
function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem('intentions-cart')) || [];
  return cart;
}

// Function to display cart items in the HTML
function displayCartItems() {
  const cartItems = loadCartItems();
  const cartItemsDiv = document.getElementById('cart-items');

  // Clear any existing content
  cartItemsDiv.innerHTML = '';

  // Iterate through each cart item and create a row for display
  cartItems.forEach((item, index) => {
    const itemRow = document.createElement('div');
    itemRow.className = 'cart-item-row';

    // Add the item photo, name, size, and price
    itemRow.innerHTML = `
        <div class="cart-item-left">
          <img class="cart-item-photo" src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-middle">
          <p>${item.name}</p>
          <p>Size: ${item.size}</p>
        </div>
        <div class="cart-item-right">
          <p>$${item.price}</p>
          <div class="remove-button-wrapper">
            <button class="btn btn-dark remove-button" onclick="removeCartItem(${index})">Remove</button>
          </div>
        </div>
      `;

    cartItemsDiv.appendChild(itemRow);
  });
}

// Function to calculate and display the total price
function calculateTotalPrice() {
  const cartItems = loadCartItems();
  const totalPriceDiv = document.getElementById('total-price');

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  totalPriceDiv.textContent = `Total Price: $${total.toFixed(2)}`;
}

function calculateTotalDollar() {
  const cartItems = loadCartItems();
  const totalPriceDiv = document.getElementById('total-price');

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  return total;
}

// Function to remove a cart item
function removeCartItem(index) {
  const cartItems = loadCartItems();
  cartItems.splice(index, 1);
  localStorage.setItem('intentions-cart', JSON.stringify(cartItems));
  displayCartItems();
  calculateTotalPrice();
  updateCartDisplay();
}

function isCartEmpty() {
  const cart = JSON.parse(localStorage.getItem('intentions-cart')) || [];
  return cart.length === 0;
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const paypalButtons = document.getElementById('purchase-options');

  if (isCartEmpty()) {
    cartItems.style.display = 'none';
    emptyCartMessage.style.display = 'block';
    paypalButtons.style.display = 'none';
  } else {
    cartItems.style.display = 'block';
    emptyCartMessage.style.display = 'none';
    paypalButtons.style.display = 'block';
  }
}

function startShopping() {
  window.location.href = '../views/shop.html'; // Redirect to the shop page
}

function proceedCheckout() {
  window.location.href = '../views/checkout.html'; // Redirect to the shop page
}

// When the page loads, display cart items and total price
window.addEventListener('load', () => {
  displayCartItems();
  calculateTotalPrice();
  updateCartDisplay();
});

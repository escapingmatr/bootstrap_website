// Function to load cart items from local storage
function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem('intentions-cart')) || [];
  return cart;
}

// Function to display checkout items in the HTML
function displayCheckoutItems() {
  const cartItems = loadCartItems();
  const checkoutItemsDiv = document.getElementById('checkout-items');

  // Clear any existing content
  checkoutItemsDiv.innerHTML = '';

  // Iterate through each cart item and create a row for display
  cartItems.forEach((item, index) => {
    const itemRow = document.createElement('div');
    itemRow.className = 'checkout-item-row';

    // Add the item photo, name, size, and price
    itemRow.innerHTML = `
          <div class="checkout-item-left">
            <img class="checkout-item-photo" src="${item.image}" alt="${item.name}" />
          </div>
          <div class="checkout-item-middle">
            <p>${item.name}</p>
            <p>Size: ${item.size}</p>
          </div>
          <div class="checkout-item-right">
            <p>$${item.price}</p>
          </div>
        `;

    checkoutItemsDiv.appendChild(itemRow);
  });
}

// Function to calculate and display the total price
function calculateTotalPrice() {
  const cartItems = loadCartItems();
  const compTotalPriceDiv = document.getElementById(
    'checkout-total-components'
  );
  const subtotal = calculateTotalDollar();
  const shipping = 0;
  const taxes = 0;

  const checkoutTotalComponents = document.createElement('div');
  checkoutTotalComponents.className = 'checkout-total-components';

  checkoutTotalComponents.innerHTML = `
    <div class="total-left">
      <p>Subtotal</p>
      <p>Shipping</p>
      <p>Taxes</p>
    </div>
    <div class="total-right">
      <p>${subtotal}</p>
      <p>${shipping}</p>
      <p>${taxes}</p>
    </div>
  `;

  compTotalPriceDiv.appendChild(checkoutTotalComponents);

  // calculate and display total
  const total = subtotal + shipping + taxes;
  const totalPriceDiv = document.getElementById('checkout-total');
  const checkoutTotal = document.createElement('div');
  checkoutTotal.className = 'checkout-total';

  checkoutTotal.innerHTML = `
    <div class="total-left">
      <p>Total</p>
    </div>
    <div class="total-right">
      <p>${total}</p>
    </div>
  `;

  totalPriceDiv.appendChild(checkoutTotal);
}

function calculateSubtotalPrice() {
  const cartItems = loadCartItems();
  const subtotalPriceDiv = document.getElementById('subtotal-price');

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  subtotalPriceDiv.textContent = `Subtotal: $${total.toFixed(2)}`;
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

// When the page loads, display cart items and total price
window.addEventListener('load', () => {
  displayCheckoutItems();
  calculateTotalPrice();
  calculateSubtotalPrice();
  updateCartDisplay();
});

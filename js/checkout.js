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
  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const taxes = calculateTax();

  const checkoutTotalComponents = document.createElement('div');
  checkoutTotalComponents.className = 'checkout-total-components';

  checkoutTotalComponents.innerHTML = `
    <div class="total-left">
      <p>Subtotal</p>
      <div class="shipping-cost-info">
        <p>Shipping</p>
        <div id="free-shipping-info">
          <i class="fas fa-info-circle" id="free-shipping-icon"></i>
          <span id="free-shipping-text">Free shipping over $300</span>
        </div>
      </div>
      <p>Taxes</p>
    </div>
    <div class="total-right">
      <p>$${subtotal.toFixed(2)}</p>
      <p>$${shipping.toFixed(2)}</p>
      <p>$${taxes.toFixed(2)}</p>
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
      <p>$${total.toFixed(2)}</p>
    </div>
  `;

  totalPriceDiv.appendChild(checkoutTotal);
}

function calculateSubtotal() {
  const cartItems = loadCartItems();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  return subtotal;
}

function calculateShipping() {
  const subtotal = calculateSubtotal();

  return subtotal >= 300 ? 0 : 25;
}

function calculateTax() {
  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const tax = (subtotal + shipping) * 0.13;

  return tax;
}

function calculateTotalDollar() {
  const subtotal = calculateSubtotal();
  const shipping = calculateShipping();
  const total = (subtotal + shipping) * 1.13;

  return total.toFixed(2);
}

// When the page loads, display cart items and total price
window.addEventListener('load', () => {
  displayCheckoutItems();
  calculateShipping();
  calculateTax();
  calculateTotalPrice();
  calculateTotalDollar();
});

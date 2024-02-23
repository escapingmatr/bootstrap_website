# bootstrap_website

E-Commerce website written with html, css, js and bootstrap

## Technologies

Frontend: Bootstrap framework
Backend: Javascript
API: Paypal

## Features

**Item Page**  
For each item, item page shows a carousel of photos and written information.
The users are able to select among the available sizes and add to bag , which will guide the user to the shopping bag page.

**Shopping Bag**  
If the bag is empty, it shows a link to the shop page where users can find items.
Users may view or remove the items that are added to the bag.
This information is hold as local variables, which will last as long as the cache does not get removed.
When the bag is not empty, users can view the total price of the items and proceed to checkout.

**Checkout**
Checkout page shows the items selected, the Order Total where it calculates shipping and taxes, and provides purchasing options populated by Paypal API.
User may go back to the Shopping Bag page to modify the order, or choose between "Paypal" or "Debit or Credit Card" for a payment option.

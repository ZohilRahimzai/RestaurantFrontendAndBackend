const menuData = [
  {
    name: "Classic Burger",
    price: 5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    desc: "Juicy beef burger with cheese"
  },
  {
    name: "Pepperoni Pizza",
    price: 8,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
    desc: "Loaded with pepperoni & cheese"
  },
  {
    name: "Creamy Pasta",
    price: 6,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    desc: "White sauce creamy pasta"
  },
  {
    name: "Chicken Sandwich",
    price: 4,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    desc: "Grilled chicken sandwich"
  },
  {
    name: "French Fries",
    price: 3,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
    desc: "Crispy golden fries"
  }
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];


const menuContainer = document.getElementById('menu-container');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart');
const viewMenuBtn = document.getElementById('view-menu-btn');
const contactForm = document.getElementById('contact-form');


function renderMenu() {
  menuContainer.innerHTML = '';

  menuData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'menu-item';

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <span class="price">$${item.price.toFixed(2)}</span>
      <button class="add-to-cart">Add to Cart</button>
    `;

   
    card.querySelector('.add-to-cart').addEventListener('click', () => {
      addToCart(index);
    });

    menuContainer.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(menuData[index]);
  saveCart();
  updateCart();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  saveCart();
  updateCart();
}


function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;

    const row = document.createElement('div');
    row.className = 'cart-row';

    row.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button class="remove-btn">X</button>
    `;

    row.querySelector('.remove-btn').addEventListener('click', () => {
      removeFromCart(i);
    });

    cartItems.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


clearCartBtn.addEventListener('click', () => {
  cart = [];
  saveCart();
  updateCart();
});


if (viewMenuBtn) {
  viewMenuBtn.addEventListener('click', () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  });
}


if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('form-status').textContent = "Message sent successfully!";
    contactForm.reset();
  });
}


renderMenu();
updateCart();

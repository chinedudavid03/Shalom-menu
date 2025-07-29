// Menu Items Data Array
const meals = [
  {
    name: "Jollof Rice",
    description:
      "Smoky, perfectly spiced Nigerian Jollof rice cooked with rich tomato sauce and aromatic herbs. A party favorite!",
    price: 1500,
    Image: "image/jollof-rice.jpeg",
  },
  {
    name: "Abacha",
    description: "Ezeagu Abacha A delightful mouth-watering delicacy.",
    price: 1200,
    Image: "image/abacha.jpeg",
  },
  {
    name: "Isi Ewu",
    description:
      "Spicy goat head delicacy, perfectly seasoned with native herbs and hot peppers. A favorite among pepper lovers!",
    price: 5000,
    Image: "image/isi-ewu.jpeg",
  },
  {
    name: "Okpa",
    description:
      "Nutritious Bambara nut pudding, steamed to perfection. A protein-rich delicacy from the Eastern part of Nigeria.",
    price: 500,
    Image: "image/okpa.jpeg",
  },
  {
    name: "Ogbono Soup",
    description:
      "Rich, hearty soup made with ground ogbono seeds, assorted meat, and fresh vegetables. Perfect with any swallow of your choice.",
    price: 800,
    Image: "image/ogbono-soup.jpeg",
  },
  {
    name: "Roasted Yam & Plantain",
    description:
      "Fresh yam and ripe plantain, roasted to golden perfection. Served with spicy pepper sauce and choice of protein.",
    price: 2000,
    Image: "image/roasted-yam-plantain.jpeg",
  },
];

// Shopping Cart Array
const cartItems = [];

// Renders the menu items on the page

function rendermenu() {
  const menu = document.getElementById("menu");
  meals.forEach((meal, index) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");
    mealDiv.innerHTML = `
    <img src="${meal.Image}" alt="${meal.name}" />
    <h2> ${meal.name}</h2>
    <h4> ${meal.description}</h4>
    <p>₦${meal.price}</p>
    <button onClick="addToCart(${index})">Add to Plate</button>
    `;
    menu.appendChild(mealDiv);
  });
}

function addToCart(index) {
  const existingItem = cartItems.find((item) => item.mealIndex === index);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      ...meals[index],
      quantity: 1,
      mealIndex: index,
    });
  }
  updateCart();
}

function removeFromCart(index) {
  const existingItem = cartItems.find((item) => item.mealIndex === index);
  if (existingItem) {
    existingItem.quantity -= 1;
    if (existingItem.quantity === 0) {
      const itemIndex = cartItems.findIndex((item) => item.mealIndex === index);
      cartItems.splice(itemIndex, 1);
    }
  }
  updateCart();
}

function updateCart() {
  const cart = document.getElementById("cart");
  const total = document.getElementById("total");
  cart.innerHTML = "";
  let totalAmount = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <div class="quantity-controls">
        <button class="minus" onclick="removeFromCart(${
          item.mealIndex
        })">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="plus" onclick="addToCart(${item.mealIndex})">+</button>
      </div>
      <span class="item-total">₦${item.price * item.quantity}</span>
    `;
    cart.appendChild(li);
    totalAmount += item.price * item.quantity;
  });
  total.textContent = totalAmount;
}

// Creates and displays a loading overlay with countdown
// Used when submitting orders

function showLoadingOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.innerHTML = `
    <div class="loading-content">
      <div class="countdown">5</div>
      <div class="loading-text">Processing your order...</div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.style.display = "flex";

  let count = 5;
  const countdownElement = overlay.querySelector(".countdown");

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      count--;
      countdownElement.textContent = count;

      if (count === 0) {
        clearInterval(interval);
        setTimeout(() => {
          overlay.remove();
          resolve();
        }, 1000);
      }
    }, 1000);
  });
}

// Handles the order submission process
// Shows loading animation, validates cart, and processes order

async function submitOrder() {
  if (cartItems.length === 0) {
    alert("Please Add A Dish🥘🍽");
    return;
  }

  await showLoadingOverlay();

  alert("Thank you!!! Your order has been placed.");
  cartItems.length = 0; // Clear cart after successful order
  updateCart();

  document.getElementById("PrintOrder").addEventListener("click", function () {
    window.print();
  });
}

rendermenu();

const meals = [
  {
    name: "Jollof Rice",
    description: "asdfghjkldfghj",
    price: 1500,
    Image:
      "https://raw.githubusercontent.com/chinedudavid03/Shalom-menu/image/jollof-rice.jpeg",
  },
  {
    name: "Abacha",
    description: "asdfghjkldfghj",
    price: 1500,
    Image: "image/abacha.jpeg",
  },
  {
    name: "Isi Ewu",
    description: "asdfghjkldfghj",
    price: 1500,
    Image: "image/isi-ewu.jpeg",
  },
  {
    name: "Okpa",
    description: "asdfghjkldfghj",
    price: 1500,
    Image: "image/okpa.jpeg",
  },
  {
    name: "Ogbono Soup",
    description: "asdfghjkldfghj",
    price: 1500,
    Image: "image/ogbono-soup.jpeg",
  },
  {
    name: "Roasted Yam & Plantain",
    description: "asdfghjkldfghj",
    price: 1500,
    Image: "image/roasted-yam-plantain.jpeg",
  },
];

const cartItems = [];

function rendermenu() {
  const menu = document.getElementById("menu");
  meals.forEach((meal, index) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");
    mealDiv.innerHTML = `
    <img scr= "${meal.Image}" alt="${meal.name}" />
    <h2> ${meal.name}</h2>
    <h4> ${meal.description}</h4>
    <p>#${meal.price}</p>
    <button onClick="addToCart(${index})">Add to Plate</button>
    `;
    menu.appendChild(mealDiv);
  });
}

function addToCart(index) {
  cartItems.push(meals[index]);
  updateCart();
}

function updateCart() {
  const cart = document.getElementById("cart");
  const total = document.getElementById("total");
  cart.innerHTML = "";
  let totalAmount = 0;
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - #${item.price}`;
    cart.appendChild(li);
    totalAmount += item.price;
  });
  total.textContent = totalAmount;
}

function submitOrder() {
  if (cartItems.length === 0) {
    alert("Please Add A Dish🥘🍽");
    return;
  }
  alert("Thank you!!! Your order has been placed.");
  cartItems.length = 0;
  updateCart();

  document.getElementById("PrintOrder").addEventListener("click", function () {
    window.print();
  });
}
rendermenu();

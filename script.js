const meals = [
  { name: "Jollof Rice", price: 1500, Image: "Jollof Rice.jpeg" },
  { name: "Abacha", price: 1500, Image: "Abacha.jpeg" },
  { name: "Isi Ewu", price: 1500, Image: "Isi Ewu.jpeg" },
  { name: "Okpa", price: 1500, Image: "Okpa.jpeg" },
  { name: "Ogbono Soup", price: 1500, Image: "Ogbono Soup.jpeg" },
  {
    name: "Roasted Yam & Plantain",
    price: 1500,
    Image: "Roasted Yam & Plantain.jpeg",
  },
];

const cartItems = [];

function rendermenu() {
  const menu = document.getElementById("menu");
  meals.forEach((meal, index) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");
    mealDiv.innerHTML = `
    <img scr= "${meal.image}" alt="${meal.name}" />
    <h3> ${meal.name}</h3>
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

// Product Section

const MobileNavButton = document.querySelector(".Navbutton");
const MobileNav = document.querySelector(".mobile-nav");
MobileNavButton.addEventListener("click", () => {
  MobileNavButton.classList.toggle("activeNavButton");
  MobileNav.classList.toggle("activeMobileNav");
});
if (document.querySelector('body').classList.contains('LightTheme')) {
  MobileNavButton.style.backgroundImage = "url('../assets/icons/lightMobBtn.png')"
}
fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((response) => response.json())

  .then((data) => ProductList(data))
  ;

function ProductList(list) {
  const productCard = document.querySelector(".product-grid");
  productCard.innerHTML = "";
  list.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("product");
    productCard.classList.add("products");
    card.innerHTML = `
    <img src=${item.image} alt='taiwanese food'/>
    <h3>${item.name}</h3>
    <span>${item.price}$</span>
    <button onclick="addToCart(1, ${item.price}, ${item.id})">Add To Cart</button>
    `;
    productCard.appendChild(card);
  });
}

function addToCart(quantity, price, id) {
  const CartData = {
    quantity: quantity,
    price: price,
    productId: id,
  };

  fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(CartData),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    ;
}
fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  .then((response) => response.json())
  .then((data) => {
    CategList(data);
    CategoriesFilter(data);
  })
  ;

function CategList(Categ) {
  let CategDiv = document.querySelector(".Categories");
  const AllCatButton = document.createElement("button");
  AllCatButton.textContent = "All Products";
  CategDiv.appendChild(AllCatButton);

  AllCatButton.addEventListener("click", () => {
    fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
      .then((response) => response.json())
      .then((data) => ProductList(data))
      ;
  });
  Categ.forEach((item) => {
    const CatButton = document.createElement("button");
    CatButton.textContent = item.name;
    CategDiv.appendChild(CatButton);
    CatButton.addEventListener("click", () => {
      fetch(
        `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${item.id}`,
      )
        .then((resp) => resp.json())
        .then((data) => ProductList(data.products))
        ;
    });
  });
}

function CategoriesFilter(list) {
  const categoryFilter = document.querySelector("#CategoryFilter");
  const AllCategs = document.createElement("option");
  AllCategs.textContent = "Show All";
  AllCategs.value = "";
  categoryFilter.append(AllCategs);
  list.forEach((item) => {
    const option = document.createElement("option");
    option.textContent = item.name;
    option.value = item.id;
    categoryFilter.appendChild(option);
  });
}
const SubmitFilter = document.querySelector("#FilterSubmit");
const ResetFilter = document.querySelector("#FilterReset");

SubmitFilter.addEventListener("click", (event) => {
  event.preventDefault();
  const vegeterian = document.querySelector("#VegeterianFilter");
  const nuts = document.querySelector("#NutsFilter");
  const spiciness = document.querySelector("#SpicinessFilter");
  const category = document.querySelector("#CategoryFilter");
  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian.value}&nuts=${nuts.value}&spiciness=${spiciness.value}&categoryId=${category.value}`,
  )
    .then((resp) => resp.json())
    .then((list) => ProductList(list))
  ;
});
ResetFilter.addEventListener("click", () => {
  fetch(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?v`)
    .then((resp) => resp.json())
    .then((data) => ProductList(data))
   ;
});

// Cart Section

const CartBtn = document.querySelector(".cart");
CartBtn.addEventListener("click", () => {
  document.querySelector(".productCard").classList.toggle("hidden");
  document.querySelector(".CartSection").classList.toggle("hidden");
  document.querySelector(".Categories").classList.toggle("hidden");
  document.querySelector(".FilterDiv").classList.toggle("hidden");
  fetchCart();
});
let CartBtnMobile = document.querySelector("#MobileCartBtn");
CartBtnMobile.addEventListener("click", () => {
  document.querySelector(".productCard").classList.toggle("hidden");
  document.querySelector(".CartSection").classList.toggle("hidden");
  document.querySelector(".Categories").classList.toggle("hidden");
  document.querySelector(".FilterDiv").classList.toggle("hidden");
  fetchCart();
});
function fetchCart() {
  const CartItems = document.querySelector(".cartItems");
  CartItems.innerHTML = "";
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then((resp) => resp.json())

    .then((data) => {
      data.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");

        const cartItemProduct = document.createElement("div");
        cartItemProduct.classList.add("cartItemProduct");
        const cartImage = document.createElement("img");
        cartImage.src = item.product.image;
        const cartName = document.createElement("h3");
        cartName.textContent = item.product.name;
        cartItemProduct.append(cartImage, cartName);

        const quantity = document.createElement("div");
        quantity.classList.add("quantity");
        quantity.textContent = item.quantity;
        const quantMinus = document.createElement("button");
        quantMinus.textContent = "-";
        const quantPlus = document.createElement("button");
        quantPlus.textContent = "+";
        quantity.prepend(quantMinus);
        quantity.append(quantPlus);

        const price = document.createElement("span");
        price.classList.add("price");
        price.textContent = item.product.price;

        const total = document.createElement("span");
        total.classList.add("total");
        total.textContent = item.quantity * item.product.price;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.id = "deleteBtnId";
        deleteBtn.textContent = "X";
        cartItem.append(cartItemProduct, quantity, price, total, deleteBtn);
        deleteBtn.addEventListener("click", () =>
          productDelete(item.product.id),
        );
        quantMinus.addEventListener("click", () =>
          updateQuantity(
            item.product.id,
            item.product.price,
            item.quantity - 1,
          ),
        );
        quantPlus.addEventListener("click", () =>
          updateQuantity(
            item.product.id,
            item.product.price,
            item.quantity + 1,
          ),
        );
        CartItems.appendChild(cartItem);
      });
      let Total = 0;
      data.reduce(function (acc, item) {
        Total = acc + item.quantity * item.product.price;
        return Total;
      }, 0);
      document.querySelector(".TotalPrice").textContent = "$" + Total;
    })
    ;
}
function updateQuantity(productId, price, quantity) {
  if (quantity < 1) {
    return;
  }
  const CartData = {
    quantity: quantity,
    price: price,
    productId: productId,
  };
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CartData),
  })
    .then(() => fetchCart())
    ;
}

function productDelete(id) {
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    method: "DELETE",
  })
    .then(() => fetchCart())
    ;
}

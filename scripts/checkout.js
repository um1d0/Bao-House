fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("checkout-item");

      const itemName = document.createElement("h3");
      itemName.classList.add("checkout-item-name");
      itemName.textContent = item.product.name;

      const itemPrice = document.createElement("span");
      itemPrice.classList.add("checkout-item-price");
      itemPrice.textContent = `${item.price}$`;

      const itemQuantity = document.createElement("p");
      itemQuantity.classList.add("checkout-item-qty");
      itemQuantity.textContent = `x${item.quantity}`;
      let itemAndPrice = document.createElement("div");
      itemAndPrice.append(itemPrice, itemQuantity);
      itemDiv.append(itemName, itemAndPrice);
      document.querySelector(".checkout-items").append(itemDiv);
    });
    const Total = data.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);

    console.log(Total);
    document.querySelector(".checkout-total-row.grand p").textContent =
      `${Total}$`;
  });

  
let payment = document.querySelector(".pay");
payment.addEventListenerx("click", () => {
   const cardNumber =  document.querySelector('#cardNumber').value 
 const expMonth = document.querySelector('#expMonth').value 
  const expYear = document.querySelector('#expYear').value
  const cvv = document.querySelector('#cvv').value 

   if (!cardNumber || !expMonth || !expYear || !cvv) {
    Swal.fire({
      title: "Oops!",
      text: "Please fill in all payment details 💳",
      icon: "error",
    });
   
    return;
  }
  
else {
   Swal.fire({
    title: "Payment Successful!",
    text: "Your food is on its way 🍜",
    icon: "success",
  })
  cardNumber = ''
  expMonth = ''
  expYear = ''
  cvv = ''

}

});

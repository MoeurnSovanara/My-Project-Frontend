
let listCart = [];
function checkCart() {
    let cartData = localStorage.getItem('listCart');
    if (cartData) {
        try {
            listCart = JSON.parse(cartData);
            console.log("Parsed listCart from localStorage:", listCart); // Debugging log
        } catch (e) {
            console.error("Error parsing localStorage data:", e);
            listCart = [];
        }
    } else {
        console.log("No cart data in localStorage. Initializing empty listCart.");
        listCart = [];
    }
    let cookieValue = document.cookie.split(";").find(row => row.trim().startsWith("listCart="));
}

function addListCart() {
    let listCarttoHTML = document.querySelector(".returnCart .list");
    listCarttoHTML.innerHTML = ""; 
    let totalHTML = document.querySelector(".return .totalQuantity");
    let totalPriceHTML = document.querySelector(".return .totalPrice");
    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart.length > 0) {
        listCart.forEach(product => {
            if (product && product.quantity) {
                console.log("Processing product:", product); // Debugging log
                let newCart = document.createElement("div");
                newCart.classList.add("item");
                newCart.innerHTML = `
                    <img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} per ${product.name}</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${(product.price * product.quantity).toFixed(2)}</div>
                `;
                listCarttoHTML.appendChild(newCart);
                totalQuantity += product.quantity;
                totalPrice += (product.quantity * product.price);
            }
        });
    } else {
        console.log("The cart is empty."); // Debugging log
    }

    console.log("Total quantity:", totalQuantity); // Debugging log
    console.log("Total price:", totalPrice); // Debugging log

    totalHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = `$${totalPrice.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    checkCart();  // Load cart from localStorage
    addListCart();  // Display the cart
});

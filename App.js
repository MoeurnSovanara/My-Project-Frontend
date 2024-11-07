let products = null;
let listCart = [];

// Function to render products to the specified container
function renderProducts(products, containerId) {
    const listProduct = document.getElementById(containerId);
    listProduct.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        const newProduct = document.createElement("div");
        newProduct.classList.add("item");
        newProduct.innerHTML = `
            <i class="bin fa-solid fa-trash-can" title="Delete"></i>
            <i class="edit fa-solid fa-pen" title="Edit"></i>
            <i class="eye fa-solid fa-eye" title="Show"></i>
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}.00</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>
        `;
        listProduct.appendChild(newProduct);
    });
}

// Fetch the product data and handle rendering based on the current page
fetch("product.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        const currentPage = window.location.pathname;

        if (currentPage.includes('index.html')) {
            // Home page
            renderProducts(products.slice(0, 4), 'product-list-1');
            renderProducts(products.slice(4, 8), 'product-list-2');
            renderProducts(products.slice(8, 12), 'product-list-3');
        } else if (currentPage.includes('SpecailOffice.html')) {
            // Special Offer page
            renderProducts(products.slice(12, 20), 'product-list-4');
        }else if(currentPage.includes('Accessory.html')){
            renderProducts(products.slice(20, 26), 'product-list-5');
        }else if(currentPage.includes('cards.html')) {
            renderProducts(products.slice(26,32), 'product-list-6');
        }else if(currentPage.includes('clothing.html')){
            renderProducts(products.slice(32,38),'product-list-7');
        }else if(currentPage.includes('handbag.html')){
            renderProducts(products.slice(38,44),'product-list-8');
        }else if(currentPage.includes('jewel.html')){
            renderProducts(products.slice(44,50),'product-list-9');
        }else if(currentPage.includes('officeAndStation.html')){
            renderProducts(products.slice(50,56),'product-list-10');
        }else if(currentPage.includes('toys.html')){
            renderProducts(products.slice(56,62),'product-list-11');
        }else if(currentPage.includes('wallet.html')){
            renderProducts(products.slice(62,68),'product-list-12');
        }else if(currentPage.includes('')){
            renderProducts(products.slice(68,80),'product-list-13');
        }
        loadCartFromLocalStorage();
        addListCart();
    })
    .catch(error => console.error('Error loading products:', error));

// Function to add products to HTML based on the current page
function addListCart() {
    let listCarttoHTML = document.querySelector(".listCart");
    listCarttoHTML.innerHTML = "";
    let totalHTML = document.querySelector(".totalQuantity");
    let totalQuantity = 0;

    if (listCart.length > 0) {
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement("div");
                newCart.classList.add("item");
                newCart.innerHTML = `
                    <img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">${product.price}$</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>
                `;
                listCarttoHTML.appendChild(newCart);
                totalQuantity += product.quantity;
            }
        });
    }
    totalHTML.innerText = totalQuantity;
}


function addCart($idProduct) {
    let productCopy = JSON.parse(JSON.stringify(products));
    let message = "";

    if (!listCart[$idProduct]) {
        listCart[$idProduct] = productCopy.filter(pro => pro.id === $idProduct)[0];
        listCart[$idProduct].quantity = 1;
        message = "Product added to cart! Thank You🙏";
    } else {
        listCart[$idProduct].quantity++;
        message = "Increased this Product to cart!";

    }
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });

    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    saveCartToLocalStorage();
    addListCart();
}

function changeQuantity($id,$type){
    switch($type){
        case '+':{
            listCart[$id].quantity++;
        }break;
        case '-':{
            listCart[$id].quantity--;
            if(listCart[$id].quantity<=0){
                delete listCart[$id];
            }
        }break;
    }
    document.cookie="listCart="+JSON.stringify(listCart)+ "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    saveCartToLocalStorage();
    addListCart();
}

// Function to save the cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem("listCart", JSON.stringify(listCart));
}

// Function to load the cart from local storage
function loadCartFromLocalStorage() {
    let savedCart = localStorage.getItem("listCart");
    if (savedCart) {
        listCart = JSON.parse(savedCart);
    } else {
        listCart = [];
    }
}

// Event listeners for the cart visibility
let iconCart = document.querySelector(".iconCart");
let container = document.querySelector(".container");
let cart = document.querySelector(".cart");
let btnClose = document.querySelector(".close");

iconCart.addEventListener("click", function() {
    if (cart.style.right === "-100%") {
        cart.style.right = "0";
        document.body.classList.add('noscroll');
    } else {
        cart.style.right = "-100%";
        document.body.classList.remove('noscroll');
    }
});

btnClose.addEventListener("click", function() {
    cart.style.right = "-100%";
    document.body.classList.remove('noscroll');
});


// Initialize cart and product rendering
loadCartFromLocalStorage();
addListCart();

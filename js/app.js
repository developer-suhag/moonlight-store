// load products
const loadProducts = async () => {
  const url = `https://fakestoreapi.com/products`;
  const res = await fetch(url);
  const data = await res.json()
  showProducts(data)
};
// call the function
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 p-3 single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <div class="card-body">
          <h3 class="fw-normal fs-4">${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h2 class="fs-3 mb-3">Price: $ <span class="price fw-bold fs-3">${product.price}</span> </h2>
          <p>Average rating: ${product.rating.rate}</p>
          <p>Total rating: ${product.rating.count}</p>
        </div>
        <div class="card-footer bg-white border-0">
          <button onclick="addToCart(${product.id},${product.price}), updateTotal()" id="addToCart-btn" class="buy-now btn btn-secondary border-0 px-4 py-2 me-2">Add to cart</button>
          <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-info details-btn border-0 px-4 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>

      
    </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};

// add product to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  // update grand total in the UI
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// show product details
const showDetails = async id => {
  const singleUrl = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(singleUrl);
  const data = await res.json()
  showDetailModal(data);
};

// get modal
const productImg = document.getElementById('product-img');
const productTitle = document.getElementById('title');
const productDes = document.getElementById('description');
const productCategory = document.getElementById('category');
const averageRating = document.getElementById('avg-rating');
const totalRating = document.getElementById('total-rating');
const productPrice = document.getElementById('product-price');

// show modal on click
const showDetailModal = product => {
  console.log(product);
  productTitle.innerText = `${product.title}`;
  productImg.src = `${product.image}`;
  productDes.innerText = `${product.description}`;
  productCategory.innerText = `Category: ${product.category}`;
  averageRating.innerText = `Average Rating: ${product.rating.rate}`;
  totalRating.innerText = `Total Rating: ${product.rating.count}`;
  productPrice.innerText = `Price: $${product.price}`
}
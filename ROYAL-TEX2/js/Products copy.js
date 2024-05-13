fetch('data.json')
    .then(res => res.json())
    .then(data => { handleData(data) })

let cartItemCount = 0;


const productElements = [];


// Get DOM elements
const productsContainer = document.querySelector("#Products-container")
const searchInput = document.querySelector("#search")
const cartCount = document.querySelector("#cart-count")
const filterContainer = document.querySelector("#filter-container")
const checkboxes = document.querySelectorAll('.check');

function handleData(products) {
    products.forEach(product => {
        const productElement = createProductElement(product)
        productsContainer.appendChild(productElement)
        productElements.push(productElement)
    })
}

function createProductElement(product) {
    const productElement = document.createElement('div')
    productElement.classList.add('col-xxl-2')
    productElement.classList.add('col-xl-3')
    productElement.classList.add('col-lg-3')
    productElement.classList.add('col-md-4')
    productElement.classList.add('col-sm-6')
    productElement.classList.add('col-xs-6')
    productElement.classList.add('card')
    productElement.innerHTML = `
    <div 
    data-category = "${product.category}"
    data-name = "${product.name}"
    >
    <a href="./product.html">
    <img src="${product.img}" class="rounded" width="250px" height="250px" alt="">
    </a>
    <div>
      <p>${product.name}</p>
      <p>${product.price}</p>
      <button class="status btn btn-primary w-100">إضافة إلى السلة</button>
    </div>
    </div>
      `;
    productElement.querySelector('.status').addEventListener('click', updateCart)
    return productElement;
}

function updateCart(e) {
    const btn = e.target;
    if (btn.classList.contains('added')) {
        btn.classList.remove('added')
        btn.classList.add('bg-primary')
        btn.classList.remove('bg-secondary')
        btn.innerText = 'إضافة إلى السلة'
        cartItemCount--;
    } else {
        btn.classList.add('added')
        btn.classList.remove('bg-primary')
        btn.classList.add('bg-secondary')
        btn.innerText = 'تمت الاضافة الئ السلة'
        cartItemCount++;
    }
    cartCount.innerText = cartItemCount;
}
filterContainer.addEventListener("change", filterProducts);

searchInput.addEventListener("input", filterProducts);

function filterProducts() {
    
    const searchTerm = searchInput.value;

    const selectedCategories = Array
        .from(checkboxes)
        .filter((check) => check.checked)
        .map((check) => check.id);

    productElements.forEach((el) => {

        const category = el.firstElementChild.dataset.category;

        const categoryFilter =
        selectedCategories.length === 0 || selectedCategories.includes(category)

        const isSearchTerm = el.firstElementChild.dataset.name.includes(searchTerm)
        
        if(isSearchTerm && categoryFilter){

            el.classList.remove('d-none')
        }
        else{
            el.classList.add('d-none')
        }
    })
}

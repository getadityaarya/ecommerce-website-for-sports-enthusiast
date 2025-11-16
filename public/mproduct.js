const apiUrl = 'http://localhost:5432/products';

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to create product elements
function createProductElement(product) {
  const div = document.createElement('div');
  div.classList.add('pro');
  div.onclick = function() {
    window.location.href = `sproduct.html?id=${product.product_id}`;
  };

  const img = document.createElement('img');
  img.src = product.img1;

  const desDiv = document.createElement('div');
  desDiv.classList.add('des');

  const span = document.createElement('span');
  span.textContent = product.brand;

  const h5 = document.createElement('h5');
  h5.textContent = product.product_name;

  const starDiv = document.createElement('div');
  starDiv.classList.add('star');
  for (let i = 0; i < product.product_rating; i++) {
    const starIcon = document.createElement('i');
    starIcon.classList.add('fas', 'fa-star');
    starDiv.appendChild(starIcon);
  }

  const h4 = document.createElement('h4');
  h4.textContent = `Price - Rs.${product.product_price}`;

  const cartLink = document.createElement('a');
  cartLink.href = '#';
  const cartIcon = document.createElement('i');
  cartIcon.classList.add('fal', 'fa-shopping-cart', 'cart');
  cartLink.appendChild(cartIcon);

  desDiv.appendChild(span);
  desDiv.appendChild(h5);
  desDiv.appendChild(starDiv);
  desDiv.appendChild(h4);

  div.appendChild(img);
  div.appendChild(desDiv);
  div.appendChild(cartLink);

  return div;
}

// Function to render products
async function renderProducts() {
  const productsContainer = document.getElementById('products-container');
  const products = await fetchData();
  products.data.forEach(product => {
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
  });
}

// Call the renderProducts function to render products when the page loads
document.addEventListener('DOMContentLoaded', renderProducts);

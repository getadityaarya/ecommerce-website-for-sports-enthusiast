const productApi = 'http://localhost:5432/products/';
const cartApi = 'http://localhost:5432/cart/';
// Function to fetch data from the API
async function fetchData(id) {
  try {
    const response = await fetch(`${productApi}${id}`);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function renderProductDet() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const prodTitle = document.getElementById('pro_title');
    const proPrice = document.getElementById('pro_price');
    const prodDesc = document.getElementById('pro_desc');
    const mainImg = document.getElementById('MainImg');
    const proImg2 = document.getElementById('pro_img2');
    const proImg3 = document.getElementById('pro_img3');
    const proImg4 = document.getElementById('pro_img4');
    const proImg5 = document.getElementById('pro_img5');

    const products = (await fetchData(id)).data;
    prodTitle.innerHTML=products.product_name
    proPrice.innerHTML="Price: "+products.product_price
    prodDesc.innerHTML=products.product_desc
    mainImg.src=products.img1
    proImg2.src=products.img2
    proImg3.src=products.img3
    proImg4.src=products.img4
    proImg5.src=products.img5


  }

async function addCart(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const jwtToken = localStorage.getItem('logintoken') 
    if(!jwtToken){
        alert("You are not logged in")
        return
    }
    const data = {
        product_id: id,
        quantity: document.getElementById("qty").value,
        size: document.getElementById("size").value
    };

    try {
        const response = await fetch(cartApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${jwtToken}`
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        alert("Added successfuly")
        window.location.href = "cart.html"
        
        //return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
    

}
document.addEventListener('DOMContentLoaded', renderProductDet);

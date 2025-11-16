const cartApi = 'http://localhost:5432/cart';
let total = 0
// Function to fetch data from the API
async function fetchData() {
  try {
    const jwtToken = localStorage.getItem('logintoken') 

    const response = await fetch(cartApi, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${jwtToken}`
        }
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
     let data = await response.json();
     return data

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function removeItem(id){
    try {
        const jwtToken = localStorage.getItem('logintoken') 
    
        const response = await fetch(`${cartApi}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${jwtToken}`
            }
            });
    
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            alert("item removed")
            window.location.href="cart.html"
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
async function createCartTable(data) {
    console.log(data)
    const tbody = document.getElementById('cartBody');

    const tr = document.createElement('tr');
      let td = document.createElement('td');
      td.innerHTML = `<a href="#" onClick="removeItem(${data.cart_id})"><i class="far fa-times-circle"></i></a>`
      tr.appendChild(td);

       td = document.createElement('td');
      const imgCom = document.createElement('img');
      imgCom.src=data.img1;
      td.appendChild(imgCom)
      tr.appendChild(td);

      td= document.createElement('td');
      td.textContent = data.product_name;
      tr.appendChild(td);

      td= document.createElement('td');
      td.textContent = data.product_price;
      tr.appendChild(td);

      td= document.createElement('td');
      td.textContent = data.quantity
;
      tr.appendChild(td);

      td= document.createElement('td');
      td.textContent = data.quantity * data.product_price;
      tr.appendChild(td);

      tbody.appendChild(tr);
      total+=(parseInt(data.quantity) * parseFloat(data.product_price))

  }


  document.addEventListener('DOMContentLoaded', async () => {

    let data = await fetchData();
    data.data.forEach(item=>createCartTable(item));
    document.getElementById("subTotal").innerHTML=total
    document.getElementById("total").innerHTML=total
  });
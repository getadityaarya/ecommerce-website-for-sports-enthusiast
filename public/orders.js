const orderApi = 'http://localhost:5432/cart/orders';

async function fetchData() {
  try {
    const jwtToken = localStorage.getItem('logintoken') 

    const response = await fetch(orderApi, {
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

async function createOrderTable(data) {
    const tbody = document.getElementById('cartBody');

    const tr = document.createElement('tr');



      let td = document.createElement('td');
      const imgCom = document.createElement('img');
      imgCom.src=data.product_img1;
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
      td.textContent = data.order_status
      tr.appendChild(td);

      tbody.appendChild(tr);

  }


  document.addEventListener('DOMContentLoaded', async () => {

    let data = await fetchData();
    data.data.forEach(item=>createOrderTable(item));

  });
let apiUrl = 'http://localhost:5432/address';
let placeOrderUrl = 'http://localhost:5432/cart/orders';
let method = 'POST';
const jwtToken = localStorage.getItem('logintoken');

async function addOrUpdateAddress() {
    if(!jwtToken){
      alert("please login")
      return
    }
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const city = document.getElementById('city');
    const country = document.getElementById('country');
    const pin = document.getElementById('pin');

    const address = {
      line1: line1.value,
      line2: line2.value,
      city: city.value,
      country: country.value,
      pin: pin.value
    };

    try {
      const updateResponse = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
        body: JSON.stringify(address)
      });

      if (updateResponse.ok) {
       alert('Address added/updated successfully');
      } else {
        console.error('Failed to add/update address');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function proceed() {
    try {
      const res = await fetch(placeOrderUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
      });

      if (res.ok) {
        alert("Your order has been placed")
        window.location.href = 'orders.html'
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }

  document.addEventListener('DOMContentLoaded', async () => {

    const jwtToken = localStorage.getItem('logintoken');
    if(!jwtToken){
      alert("please login")
      return
    }
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const city = document.getElementById('city');
    const country = document.getElementById('country');
    const pin = document.getElementById('pin');
    try {

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `${jwtToken}`
        }
      });
      let data = await response.json();
    data=data.data
      if (data) {
        line1.value = data.line1
        line2.value = data.line2
        city.value = data.city
        country.value = data.country
        pin.value = data.pin

        apiUrl += `/${data.add_id}`;
        method = 'PUT';
      }
    }catch(error){
      console.error('Error:', error);

    }

  });
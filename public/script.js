const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}
if(close){
    bar.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}

document.addEventListener("DOMContentLoaded", function() {
  const token = localStorage.getItem('logintoken');
  
  const loginLogoutLink = document.getElementById('loginLogoutLink');
  
  if (token) {
    const loginLogout = document.getElementById('loginLogout');
    loginLogout.textContent = 'LOGOUT';
    loginLogout.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.removeItem('logintoken');
      alert("User logged out!")
      loginLogout.textContent = 'LOGIN';
    },{ once: true });


  }
});

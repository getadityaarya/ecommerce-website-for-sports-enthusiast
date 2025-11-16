document.getElementById("loginForm").addEventListener("submit", function(event) {

  event.preventDefault();
  const password = document.getElementById("login_password").value;
  const email = document.getElementById("login_email").value;
  
  const userData = {
    email: email,
    password: password
  };
  
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
    if (!response.ok) {
return response.json().then(error => {
      throw new Error(error.msg || 'Network response was not ok');
    });    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem("logintoken",data.token);
   window.location.href="/index.html"
  })
  .catch(error => {
    const loginmsg = document.getElementById("login_msg");
    loginmsg.innerHTML = "Error during login: " + error.message;
    loginmsg.hidden = false;  });
  });


document.getElementById("signupForm").addEventListener("submit", function(event) {

  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  
  const userData = {
    username: username,
    password: password,
    email: email
  };
  
  fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
    if (!response.ok) {
     return response.json().then(error => {
      throw new Error(error.msg || 'Network response was not ok');
    });
    }
    return response.json();
  })
  .then(data => {
    const signupMsg = document.getElementById("signup_msg");
    signupMsg.innerHTML = "Signup successful!, proceed to login now";
    signupMsg.hidden = false;  })
  .catch(error => {
    const signupMsg = document.getElementById("signup_msg");
    signupMsg.innerHTML = "Error during signup: " + error.message;
    signupMsg.hidden = false;  });
});

let userdata = document.getElementById ('loginform')
let username_or_email = document.getElementById ('emailorusername')
let password = document.getElementById ('password')
let loginButton = document.getElementById('logginbutton');
let messageContainer = document.getElementById('messageContainer');

document.addEventListener('DOMContentLoaded', function () {
  checkLoginStatus();
});

loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    let usernameOrEmailValue = username_or_email.value;
    let passwordValue = password.value;
    loginUser(usernameOrEmailValue, passwordValue);
});

async function loginUser(usernameOrEmail, password) {
  const data = {
      username_or_email: usernameOrEmail,
      password: password
  };

  const formData = new FormData();
formData.append("username", usernameOrEmail); // "username" alanı ve değeri ekleniyor
formData.append("password", password); // "password" alanı ve değeri ekleniyor

      const response = await fetch("http://127.0.0.1:8000/api/user/login",{
          method: "POST",
          body:formData
      });

      if (response.status === 200) {
          const responseData = await response.json();


          localStorage.setItem("token", responseData.data.token );
          localStorage.setItem("isLoggedIn", "true");

          messageContainer.innerHTML = "Giriş başarılı!";
          console.log(responseData);

          location.reload();
      } else {
          messageContainer.innerHTML = "Giriş başarısız!";
          console.error("Giriş başarısız!");
      }
  }

function checkLoginStatus() {
  let isLoggedIn = localStorage.getItem('isLoggedIn');


  if (isLoggedIn === "true") {
      window.location.href = "index.html";
  }
}










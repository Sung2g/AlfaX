
var full_name = document.getElementById ('fullname')
var username = document.getElementById ('userId')
var email = document.getElementById ('userEmail')
var password = document.getElementById ('UserPassword')
var password_confirmation = document.getElementById ('confirmedPassword')


async function createUser(fullname,username,email,password,confirmedPassword) {
  const data = {
      full_name: fullname,
      username: username,
      email: email,
      password: password,
      password_confirmation: confirmedPassword,
  };
  

  const formData = new FormData();
formData.append("FullName", full_name); // "FullName" alanı ve değeri ekleniyor.
formData.append("Username", username); // "Username" alanı ve değeri ekleniyor.
formData.append("Email", email);  // "Email" alanı ve değeri ekleniyor.
formData.append("password", password); // "username" alanı ve değeri ekleniyor.
formData.append("ConfirmedPassword", password_confirmation); // "password" alanı ve değeri ekleniyor.

      const response = await fetch("http://127.0.0.1:8000/api/user/create",{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.status === 200) {
          const responseData = await response.json();
          
          messageContainer.innerHTML = "Kayıt başarılı!";
          console.log(responseData);

      window.location.href = "login_page.html"
      } else {
          messageContainer.innerHTML = "Kayıt başarısız!";
          console.error("Kayıt başarısız!");
      }
  } 

var RegisterButton = document.getElementById('registerButton');
RegisterButton.addEventListener('click', function (event) {

  event.preventDefault();
  var fullnameValue = full_name.value;
  var usernameValue = username.value;
  var emailValue    = email.value;
  var passwordValue = password.value;
  var confirmedPasswordValue = password_confirmation.value;
  createUser(fullnameValue,usernameValue,emailValue,passwordValue,confirmedPasswordValue);
});

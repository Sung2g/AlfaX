let logoutButton = document.getElementById('loggoutButton');

logoutButton.addEventListener('click', function (event) {
    event.preventDefault();

    let confirmLogout = confirm("Çıkış yapmak istediğinize emin misiniz?");
    if (confirmLogout) {
        logoutUser();
    }
});

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');

    window.location.href = "home_page.html"
}
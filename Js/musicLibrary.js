let music = document.getElementById('video-input');
let accessToken = localStorage.getItem('token');


addButton.addEventListener('click', (event) => {
    event.preventDefault();
    addMusic(music);
});

async function addMusic(music) {
    const data = {
        music: music
    };

    const formData = new FormData();
    formData.append("song_id", music); // "music" alanı ve değeri ekleniyor

    const response = await fetch("http://127.0.0.1:8000/api/user/addMusic", {
        method: "POST",
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    });

    if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData);
    } else {
        console.error("Giriş başarısız!");
    }
}


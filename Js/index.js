let sideMenu = document.querySelector('aside');
let menuBtn = document.getElementById('menu-btn');
let closeBtn = document.getElementById('close-btn');

let darkMode = document.querySelector('.dark-mode');
let rotateImage = document.getElementById('rotate-image');

let popupButton = document.getElementById('popup-button');
let popup = document.getElementById('popupp');
let closeButtons = document.getElementsByClassName('close');
let inputField = document.querySelector('.popup-content input');
let addButton = document.querySelector('.add-order button');
let tableBody = document.querySelector('table tbody');

//Dark Mode// Start
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');
})
//Dark Mode//  End



// Ekle Butonu(popp) // Start

document.addEventListener('DOMContentLoaded', () => {
    let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    savedSongs.forEach(song => {
        let tr = document.createElement('tr');
        let trContent = `
            <td>${song.username}</td>
            <td>${song.videoChannelTitle}</td>
            <td>${song.videoTitle}</td>
            <td class="primary">${song.videoDuration}</td>
        `;
        tr.innerHTML = trContent;
        tableBody.appendChild(tr);
    });

    popupButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    for (let closeButton of closeButtons) {
        closeButton.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    addButton.addEventListener('click', () => {
        let inputValue = inputField.value.trim();
        let videoId = extractVideoId(inputValue);
        let apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`;

        let videoTitle = '';
        let videoDuration = '';
        let username = 'Alihan';
        let videoChannelTitle = '';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {

                if (data.items.length > 0) {
                    videoTitle = data.items[0].snippet.title;
                    videoDuration = formatDuration(parseISO8601Duration(data.items[0].contentDetails.duration));
                    videoChannelTitle = data.items[0].snippet.channelTitle;

                    videoPreview.textContent = videoTitle;


                    isAddable = true;
                } else {
                    videoPreview.textContent = 'Geçerli Bir Video URL\'si Girin';
                }

                if (!isAddable) {
                    console.log("Geçerli bir url değil");
                    return;
                }

                let tr = document.createElement('tr');
                let trContent = `
            <td>${username}</td>
            <td>${videoChannelTitle}</td>
            <td>${videoTitle}</td>
            <td class="primary">${videoDuration}</td> 
        `;

                tr.innerHTML = trContent;
                tableBody.appendChild(tr);

                // Eklenen şarkıyı localStorage'a kaydetme
                savedSongs.push({username,videoChannelTitle,videoTitle,videoDuration,videoId });
                localStorage.setItem('savedSongs', JSON.stringify(savedSongs));

                inputField.value = '';
                videoPreview.textContent = '';
                popup.style.display = 'none';
            });


    });
});

function parseISO8601Duration(duration) {
    let pattern = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    let matches = duration.match(pattern);

    let hours = matches[1] ? parseInt(matches[1]) : 0;
    let minutes = matches[2] ? parseInt(matches[2]) : 0;
    let seconds = matches[3] ? parseInt(matches[3]) : 0;

    return hours * 3600 + minutes * 60 + seconds;
}

// Saniyeyi okunabilir bir süreye dönüştürme
function formatDuration(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    if (hours === 0) {
        return `${minutes}. ${remainingSeconds}`;
    } else {
        return `${hours}. ${minutes}. ${remainingSeconds}`;
    }
}
//Ekle Butonu(popp) // End

// İmage Rotate // Start

rotateImage.addEventListener('click', () => {
    rotateImage.classList.toggle('rotate');
});

//image Rotate // End


// Youtube API Prewiew // Start
function updateUsername(username) {
    const usernameSpan = document.getElementById('usernamee');
    usernameSpan.textContent = username;
}
function getUsernameFromLocalStorage() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        updateUsername(savedUsername);
    }
}

window.addEventListener('load', () => {
    // Kullanıcı adını localStorage'dan çekip güncelleme
    getUsernameFromLocalStorage();
});

// Youtube API Prewiew // End


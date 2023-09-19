let API_KEY = 'AIzaSyCHObgpSBoyQewc7KwLXkJEttoWWZgTMfo';
let isAddable = false;

let videoId = ''; // Video kimliği (ID) burada olacak
let videoPlayer = null; // Video oynatıcı elementi

let contentt = document.getElementById('contentt');
let contentinfo = document.getElementById('contentinfo');

// iframe API'sini çalıştır

let player;
let videoIdFromLocalStorage = localStorage.getItem('videoId');

function onYouTubePlayerAPIReady(videoIdNew) {

    console.log("YoutubePlayer İnit.");
}

function youtubePlayerAPI(videoIdNew) {
    console.log(videoIdNew);
    console.log("Yeni Video Oluşturuluyor.");
    player = new YT.Player('playerss', {
        height: '0',
        width: '0',
        videoId: videoIdNew,
        playerVars: {
            playesinline: 1,
            controls: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    console.log('Video Başlatılıyor.');
    event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
        console.log('Video Şuan Oynatılıyor.');
    }
    else if (event.data == YT.PlayerState.ENDED) {
        console.log("video bitti sıradakini getir");
        videoId = '';

        var youtubeFrameElement = document.querySelector('.youtubeFrame');
        youtubeFrameElement.innerHTML = '';

        youtubeFrameElement.innerHTML = '<div id="player">\n' +
            '                            <input class="slider" type="range" min="0" max="100" value="0" id="fader">\n' +
            '                            <label  for="fader">0:00</label>\n' +
            '                            <output id="ytplayer" for="fader" class="duration"></output>\n' +
            '                        </div>';
    }
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


const x = document.querySelector('.youtubeFrame'); // Tek bir öğe seçiyoruz, çünkü id benzersiz olmalı
const z = document.querySelector('.slider'); // Tek bir öğe seçiyoruz, çünkü id benzersiz olmalı

x.addEventListener('timeupdate', function () {
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    const progress = (currentTime / duration) * 100;
    z.value = progress;
});

z.addEventListener('input', function () {
    const progress = z.value;
    const currentTime = (progress / 100) * player.getDuration();
    player.seekTo(currentTime);
});

function updateTime() {
    if (player && typeof player.getCurrentTime === 'function') {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progress = (currentTime / duration) * 100;

        z.value = progress;

        // Zamanı dakika ve saniye olarak hesaplayıp gösterme
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        z.nextElementSibling.textContent = formattedTime;
    }
}
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        console.log("Video Ended, Getting the Next One.");

        //sayfayı yenile
        location.reload();
    }

// ... (Daha fazla kod)

// Call functions or start processes here...

}
// Player hazır olduğunda zaman güncellemeyi başlat
function onPlayerReady(event) {
    console.log('Starting Video.');
    event.target.playVideo();

    // Her 500 ms (0.5 saniye) aralığında updateTime fonksiyonunu çağır
    setInterval(updateTime, 500);
}

z.addEventListener('input', function () {
    const progress = z.value;
    const currentTime = (progress / 100) * player.getDuration();
    player.seekTo(currentTime);
});


function videoGetir(videoId) {
    // videoplayer elementini konntrol et yoksa oluştur

    if (!videoPlayer) {

        videoPlayer = document.createElement('iframe');
        videoPlayer.setAttribute('id', 'player');
        videoPlayer.setAttribute('width', '0');
        videoPlayer.setAttribute('height', '0');
        videoPlayer.setAttribute('frameborder', '0');
        videoPlayer.setAttribute('allowfullscreen', '1');
        videoPlayer.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        document.body.appendChild(videoPlayer);
    }

    // Local storga eklenen videoyu çalıştır
    // videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    youtubePlayerAPI(videoId);

    let apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,statistics,contentDetails`;

    console.log('video getirildi');
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                let videoTitle = data.items[0].snippet.title;
                let videoChannelTitle = data.items[0].snippet.channelTitle;
                let videoTime = data.items[0].contentDetails.duration;
                let shortTitle = videoTitle.length > 50 ? videoTitle.slice(0, 38) + "..." : videoTitle;

                if (data.items[0].statistics) {
                    let videoLikeCount = data.items[0].statistics.likeCount;
                    let videoViewCount = data.items[0].statistics.viewCount;

                    updateVideoInfo(shortTitle, videoViewCount, videoLikeCount, videoChannelTitle);
                } else {
                    console.log('Video istatistikleri bulunamadı.');
                }
            } else {
                console.log('Video bulunamadı.');
            }
        })
        .catch(error => {
            console.error('API Hatası:', error);
        });
}

function videoKontrol() {
    if (videoId == '') {
        siradanVideoGetir();
    } else {
        return;
    }
}

function siradanVideoGetir() {

    console.log("Sıradan video getiriliyor.");
    // local strogade kayıtlı verileri al
    let savedSongs = JSON.parse(localStorage.getItem('savedSongs'));

    // Eğer kayıtlı veri varsa ilkini al ve sil
    if (savedSongs && savedSongs.length > 0) {
        videoId = savedSongs[0].videoId;
        savedSongs.shift();
        localStorage.setItem('savedSongs', JSON.stringify(savedSongs));

        console.log("Getirilen Video : " + videoId);
        videoGetir(videoId);
    }
    else
    {
        console.log("Kayıtlı Video Yok");
    }
}

setInterval(videoKontrol, 3000);


let updateVideoInfo = (videoTitle, viewCount, likeCount) => {
    contentt.textContent = videoTitle;
    contentinfo.textContent = `${viewCount} - Görüntüleme - ${likeCount} - Beğeni`;
    console.log(videoTitle);
};


let apiKey = 'AIzaSyCHObgpSBoyQewc7KwLXkJEttoWWZgTMfo';
let videoPreview = document.getElementById('video-title');
let videoInput = document.getElementById('video-input');

function extractVideoId(url) {
    let regex = /[?&]v=([^&#]*)/;
    let match = url.match(regex);
    return match ? match[1] : null;
}

function getVideoTitle(videoId) {
    isAddable = false;
    if (videoId) {
        let apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.items.length > 0) {
                    let videoTitle = data.items[0].snippet.title;
                    videoPreview.textContent = videoTitle;

                    isAddable = true;
                } else {
                    videoPreview.textContent = 'Geçerli Bir Video URL\'si Girin';
                }
            })
            .catch(error => {
                console.error('API Hatası:', error);
            });
    } else {
        videoPreview.textContent = '';
    }
}

videoInput.addEventListener('input', () => {
    let videoUrl = videoInput.value;
    let videoId = extractVideoId(videoUrl);

    if (videoUrl.trim() === '' || !videoId) {
        videoPreview.textContent = '';
        addButton.disabled = true;
    } else {
        getVideoTitle(videoId);
        addButton.disabled = false;
    }
});

function checkVideoAndSync() {
    let isPlaying = false; // Başka bir video oynatılıp oynatılmadığını takip edecek değişken

    setInterval(() => {
        if (!isPlaying) {
            let videoId = '';

            // videoId'nin sırasına göre atanması
            if (videoQueue.length > 0) {
                videoId = videoQueue[0].videoId;
            }

            // Eğer videoId boşsa ve localStorage'da kaydedilmiş veri varsa
            if (!videoId) {
                let savedSongs = JSON.parse(localStorage.getItem('savedSongs'));
                if (savedSongs && savedSongs.length > 0) {
                    // En üstteki sıraya eklenmiş veriyi al ve videoId'ye eşitle
                    videoId = savedSongs[0].videoId;

                    // localStorage'dan bu veriyi kaldır
                    savedSongs.shift();
                    localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
                }
            }

            // Eğer videoId doluysa ve mevcut oynatılan video farklıysa
            if (videoId && videoPlayer.src !== `https://www.youtube.com/embed/${videoId}`) {
                playCurrentVideo(); // Bu fonksiyon mevcut videonun oynatılmasını sağlar
                isPlaying = true; // Video oynatıldı olarak işaretleyin
            }
        }
    }, 5000); // 5 saniye
}















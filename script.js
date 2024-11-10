document.querySelector('.curtain').addEventListener('click', function() {
  
    this.classList.add('hidden'); 
    document.getElementById('content').classList.remove('hidden'); 

    
    const audioElement = document.getElementById('background-audio');
    if (audioElement) {
        audioElement.play().catch((error) => {
            console.log('Audio could not play due to browser restrictions:', error);
        });
    }
});


const apiKey = 'AIzaSyA2IRtd2j-4t2nYcNhg1x8ZkrXAbLC-uj0'; 
const uploadsPlaylistId = 'UUnQE6SxW8AgIUmjxp6u_ycA'; 
const videoContainer = document.getElementById('video-container');

async function fetchLatestVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`);
        const data = await response.json();
        const uploadsId = data.items[0].contentDetails.relatedPlaylists.uploads;

        
        const videosResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=4&playlistId=${uploadsId}&key=${API_KEY}`);
        const videosData = await videosResponse.json();

        videoContainer.innerHTML = ''; 

        videosData.items.forEach(video => {
            const videoId = video.snippet.resourceId.videoId;
            const videoElement = document.createElement('iframe');
            videoElement.src = `https://www.youtube.com/embed/${videoId}`;
            videoElement.width = 560;
            videoElement.height = 315;
            videoElement.frameBorder = 0;
            videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            videoElement.allowFullscreen = true;

            videoContainer.appendChild(videoElement);
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}



fetchLatestVideos();
setInterval(fetchLatestVideos, 300000); 

const fireflyContainer = document.getElementById('firefly-container');
const fireflyCount = 50; 

for (let i = 0; i < fireflyCount; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    firefly.style.width = '30px'; 
    firefly.style.height = '30px'; 
    firefly.style.left = Math.random() * 100 + '%'; 
    firefly.style.top = Math.random() * 100 + '%'; 
    fireflyContainer.appendChild(firefly);

    animateFirefly(firefly);
}

function animateFirefly(firefly) {
    const animationDuration = Math.random() * 3 + 2; 
    const translateX = Math.random() * 200 - 100; 
    const translateY = Math.random() * 200 - 100; 

    
    firefly.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${translateX}px, ${translateY}px)`, opacity: 0 }
    ], {
        duration: animationDuration * 3000,
        easing: 'ease-in-out',
        iterations: Infinity 
    });

    
    const blinkDuration = 500; 
    const initialDelay = Math.random() * 2000;


    setTimeout(() => {
        
        setInterval(() => {
          
            firefly.style.opacity = 1; 
            setTimeout(() => {
                firefly.style.opacity = 0; 
            }, blinkDuration); 
        }, 3000); 
    }, initialDelay); 
}
window.addEventListener('load', () => {
    const audioElement = document.getElementById('background-audio');

    
    audioElement.play().catch((error) => {
        console.log('Autoplay was prevented by the browser. Audio will start after user interaction.');
    });
});

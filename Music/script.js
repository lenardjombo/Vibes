document.getElementById('search-btn').addEventListener('click', function() {
    let query = document.getElementById('search-query').value;
    if (query) {
        searchYouTube(query);
    }
});

function searchYouTube(query) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${encodeURIComponent(query)}&type=video&key=AIzaSyCP_DKAXXC9QpWXLCkgt0uLRUGFtJalOe4`)
    .then(response => response.json())
    .then(data => {
        if (data.items.length > 0) {
            displayVideos(data.items);
        } else {
            document.getElementById('video-container').innerHTML = '<p>No results found.</p>';
        }
    })
    .catch(error => console.error('Error fetching YouTube API:', error));
}

function displayVideos(videos) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;
        videoContainer.appendChild(videoElement);
    });
}


const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️'; // Switch to light mode icon
    } else {
        themeIcon.textContent = '🌙'; // Switch to dark mode icon
    }
});

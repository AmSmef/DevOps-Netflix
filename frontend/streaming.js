// Function to log watch history when a user watches a video
async function logWatchHistory(username, videoTitle) {
    const response = await fetch('https://p19us78xy9.execute-api.eu-west-2.amazonaws.com/DevProd/add-watch-history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username, // Assuming 'username' is used in the Lambda function
            videoTitle: videoTitle // Title of the video
        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log the response from the Lambda function
    } else {
        console.error('Failed to log watch history:', response.statusText);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('videoId');

    if (!videoId) {
        alert('No video selected.');
        window.location.href = '/frontend/profile.html';
        return;
    }

    try {
        const response = await fetch(`https://p19us78xy9.execute-api.eu-west-2.amazonaws.com/DevProd/video?videoId=${videoId}`);
        const data = await response.json();

        if (data.videoUrl) {
            // Initialize video player
            const player = dashjs.MediaPlayer().create();
            player.initialize(document.querySelector('#videoPlayer'), data.videoUrl, true);

            // Update the title of the page with the video title
            document.querySelector('#videoTitle').textContent = data.title;

            // Log watch history (assuming the user is logged in and their ID is accessible)
            const username = localStorage.getItem('username'); // Replace with the actual user ID from your authentication system
            logWatchHistory(username, data.title);
        } else {
            alert('Error loading video.');
        }
    } catch (error) {
        console.error('Error fetching video data:', error);
        alert('Failed to load video.');
    }
});

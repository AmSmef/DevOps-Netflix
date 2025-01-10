// Function to add a video to the watchlist using the Lambda function
async function addToWatchlist(username, videoTitle) {
    const apiUrl = 'https://p19us78xy9.execute-api.eu-west-2.amazonaws.com/DevProd/add-watchlist'; // Replace with your actual API Gateway endpoint

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, videoTitle }),
        });

        const data = await response.json();

    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach event listeners to "Add to Watchlist" buttons
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username'); // Retrieve the username from localStorage
    if (!username) {
        return;
    }

    document.querySelectorAll('.add-to-watchlist').forEach(button => {
        button.addEventListener('click', (event) => {
            const videoCard = event.target.closest('.video-card'); // Assume videos are wrapped in elements with class "video-card"
            const videoTitle = videoCard.dataset.title; // Get the video title from a data attribute

            if (videoTitle) {
                addToWatchlist(username, videoTitle);
            } else {
            }
        });
    });
});


// Function to update the profile with the actual username
window.addEventListener('DOMContentLoaded', () => {
    // Get the username from localStorage
    const username = localStorage.getItem('username');
    
    // Check if the username exists in localStorage
    if (username) {
        // Update the username on the profile page
        document.getElementById('username').textContent = `${username}:`;
    } else {
        // If no username is found, redirect to the login page
        window.location.href = '/frontend/loginuser.html';
    }

    // Logout functionality
    const logoutButton = document.querySelector('a[href="/logout"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            // Clear the username from localStorage
            localStorage.removeItem('username');
            // Redirect to the login page
            window.location.href = '/frontend/loginuser.html';
        });
    }

    // Add event listeners to video links for redirection with videoId
    document.querySelectorAll('a[data-video-id]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const videoId = event.target.closest('a').dataset.videoId;
            if (videoId) {
                window.location.href = `/frontend/streaming.html?videoId=${videoId}`;
            }
        });
    });
    
});

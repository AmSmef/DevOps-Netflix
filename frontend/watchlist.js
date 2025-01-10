// Function to fetch and display the user's watchlist
window.addEventListener('DOMContentLoaded', async () => {
    const username = localStorage.getItem('username');
  
    // Redirect to login if username is not found
    if (!username) {
      window.location.href = '/frontend/loginuser.html';
      return;
    }
  
    const watchlistContainer = document.getElementById('watchlistGrid');
    const apiUrl = `https://p19us78xy9.execute-api.eu-west-2.amazonaws.com/DevProd/get-watchlist?username=${encodeURIComponent(username)}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch watchlist');
      }
  
      const watchlist = await response.json();
  
      // Check if the watchlist is empty
      if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p class="text-white">Your watchlist is empty.</p>';
        return;
      }
  
      // Generate HTML for the watchlist
      const listHtml = watchlist
        .map((item) => {
          return `
            <div class="watchlist-item">
              <h3 class="text-white text-xl font-semibold">${item.videoTitle}</h3>
              <button class="text-white remove-btn" data-video-id="${item.videoTitle}">Remove</button>
            </div>
          `;
        })
        .join('');
  
      watchlistContainer.innerHTML = listHtml;
  
      // Add event listeners to remove buttons
      document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', async (event) => {
          const videoTitle = event.target.dataset.videoId;
  
          // Call API to remove the video (optional, implement this in the backend)
          const removeUrl = `https://p19us78xy9.execute-api.eu-west-2.amazonaws.com/DevProd/delete-watchlist`;
          await fetch(removeUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, videoTitle }),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to delete video from watchlist');
            }
          })
          .catch(error => {
            console.error('Error deleting video:', error);
            alert('Error deleting video. Please try again.');
          });
          
  
          // Refresh the watchlist
          location.reload();
        });
      });
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      watchlistContainer.innerHTML = '<p>Error loading watchlist. Please try again later.</p>';
    }
  });
  
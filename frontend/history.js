// Function to fetch watch history from the API
async function fetchWatchHistory() {
    const username = localStorage.getItem('username'); // Assuming the username is stored in localStorage after login
  
    if (!username) {
      alert('Please log in to view your watch history.');
      window.location.href = '/frontend/login.html';
      return;
    }
  
    try {
      const response = await fetch('https://p19us78xy9.execute-api.eu-west-2.amazonaws.com/DevProd/get-watch-history?username=' + username);
  
      if (response.ok) {
        const data = await response.json();
        
        if (data.history && data.history.length > 0) {
          // Populate the grid with watch history
          const historyGrid = document.getElementById('historyGrid');
          data.history.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('bg-gray-700', 'p-4', 'rounded-lg', 'shadow-md');
            card.innerHTML = `
              <h3 class="text-white text-xl font-semibold">${item.videoTitle}</h3>
              <p class="text-white">Watched on: ${new Date(item.date).toLocaleDateString()}</p>
            `;
            historyGrid.appendChild(card);
          });
        } else {
          const historyGrid = document.getElementById('historyGrid');
          historyGrid.innerHTML = '<p class="text-white">No watch history found.</p>';
        }
      } else {
        console.error('Failed to fetch watch history:', response.statusText);
        alert('Failed to load your watch history.');
      }
    } catch (error) {
      console.error('Error fetching watch history:', error);
      alert('Failed to load your watch history.');
    }
  }
  
  // Run the function when the page loads
  window.addEventListener('DOMContentLoaded', fetchWatchHistory);
  
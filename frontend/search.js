// Get the search input element
const searchInput = document.getElementById('searchInput');

// Get the video grid container
const videoGrid = document.getElementById('videoGrid');

// Event listener for search input
searchInput.addEventListener('input', () => {
  // Get the search query
  const query = searchInput.value.toLowerCase();

  // Get all video cards
  const videoCards = videoGrid.querySelectorAll('.video-card');

  // Loop through each video card and check if it matches the query
  videoCards.forEach((card) => {
    const title = card.getAttribute('data-title').toLowerCase();

    // If the title matches the search query, show the card; otherwise, hide it
    if (title.includes(query)) {
      card.style.display = 'block';  // Show the video card
    } else {
      card.style.display = 'none';  // Hide the video card
    }
  });
});

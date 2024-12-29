// Get references to the form and news list
const newsForm = document.getElementById('newsForm');
const newsList = document.getElementById('newsList');

// Fetch and display news items
async function fetchNews() {
  try {
    const response = await axios.get('http://localhost:3000/News');
    const news = response.data;
    newsList.innerHTML = ''; // Clear the list
    news.forEach(newsItem => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${newsItem.title}</h3>
        <p>${newsItem.headline}</p>
        <a href="${newsItem.link}" target="_blank">Read more</a>
        <button onclick="deleteNews('${newsItem._id}')">Delete</button>
      `;
      newsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

// Handle form submission to create new news
newsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const link = document.getElementById('link').value;
  const headline = document.getElementById('headline').value;

  try {
    const response = await axios.post('http://localhost:3000/News', {
      title,
      link,
      headline
    });
    fetchNews(); // Refresh the news list
    newsForm.reset(); // Clear the form
  } catch (error) {
    console.error('Error creating news:', error);
  }
});

// Delete news item
async function deleteNews(id) {
  try {
    await axios.delete(`http://localhost:3000/News/${id}`);
    fetchNews(); // Refresh the news list
  } catch (error) {
    console.error('Error deleting news:', error);
  }
}

// Initial fetch of news items
fetchNews();

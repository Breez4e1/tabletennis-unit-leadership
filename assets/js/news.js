document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('news-list');
  const rssUrl = encodeURIComponent('https://www.ittf.com/feed');
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      list.innerHTML = '';
      const items = data.items.slice(0, 6);
      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${item.title}</h3>
          <p><strong>Date:</strong> ${new Date(item.pubDate).toLocaleDateString()}</p>
          <p>${item.description.slice(0, 200)}...</p>
          <a href="${item.link}" target="_blank">Read More</a>
          <hr />
        `;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Failed to fetch news:', error);
      list.innerHTML = '<li>Failed to load world news. Please try again later.</li>';
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const ul = document.getElementById('news-list');
  // ITTF 官方 RSS 地址
  const rssUrl = encodeURIComponent('https://www.ittf.com/feed');
  // 使用 rss2json.com 免费服务将 RSS 转为 JSON
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

  fetch(api)
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      // 只取前 5 条新闻
      data.items.slice(0, 5).forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="${item.link}" target="_blank">${item.title}</a>
          <span class="date">${new Date(item.pubDate).toLocaleDateString()}</span>
        `;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      ul.innerHTML = '<li>Failed to load news. Please try again later.</li>';
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('news-list');
  const rssUrl = encodeURIComponent('https://www.ittf.com/feed');
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = ''; // 清空 loading 信息
      data.items.slice(0, 6).forEach(item => {
        const li = document.createElement('li');
        // 某些 RSS 条目会包含 media:thumbnail 或 enclosure
        const imgUrl =
          (item.thumbnail && item.thumbnail) ||
          (item.enclosure && item.enclosure.link) ||
          '';
        li.innerHTML = `
          ${imgUrl ? `<img src="${imgUrl}" alt="${item.title}" />` : ''}
          <h3>${item.title}</h3>
          <p class="date">${new Date(item.pubDate).toLocaleDateString()}</p>
          <p class="desc">${item.description.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 200)}…</p>
          <a class="read-more" href="${item.link}" target="_blank">Read More</a>
        `;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      list.innerHTML = '<li>Failed to load world news. Please try again later.</li>';
    });
});

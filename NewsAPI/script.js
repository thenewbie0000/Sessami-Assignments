document.addEventListener('DOMContentLoaded', async function () {
  const newsList = document.getElementById('news-list');
  const apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  const itemUrl = 'https://hacker-news.firebaseio.com/v0/item/';
  const itemsPerPage = 20;
  let currentPage = 1;
  let clickedStoryId;
  let preLoader = document.getElementById('loader-container');

  function loadingFunction() {
    preLoader.style.display = 'none';
  }

  async function fetchAndRenderStories(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const pageStoryIds = data.slice(startIndex, endIndex);

      const responses = await Promise.all(
        pageStoryIds.map((storyId) =>
          fetch(`${itemUrl}${storyId}.json?print=pretty`)
        )
      );
      const stories = await Promise.all(
        responses.map((response) => response.json())
      );

      newsList.innerHTML = '';

      stories.forEach((story) => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
          <div class="news-title" data-story-id="${story.id}">
            <a class="news-url" href="${story.url}" target="_blank">${story.title}</a>
          </div>
          <div class="news-details">
            <span class="detail"><i class="far fa-star" data-story-id="${story.id}"></i> ${story.score}</span>
            <span class="detail comment">
              ${story.descendants > 0 ? `<i class="far fa-comments" data-story-id="${story.id}">${story.descendants}</i>` : ''}
            </span>
            <span class="detail"><i class="far fa-user"></i> ${story.by}</span>
          </div>
      `;
        newsList.appendChild(newsItem);
      });

      renderPaginationButtons(data.length);

      const commentIcons = document.querySelectorAll('.news-details i.fa-comments');
      commentIcons.forEach((commentIcon) => {
        commentIcon.addEventListener('click', () => {
          clickedStoryId = commentIcon.getAttribute('data-story-id');
          openCommentsPage(clickedStoryId);
        });
      });
      loadingFunction();
    } catch (error) {
      console.error('Error fetching and rendering stories:', error);
    }
  }

  

  function openCommentsPage(storyId) {
    console.log('Selected Story ID:', storyId);
    window.location.href = `comments.html?storyId=${storyId}`;
  }

  function renderPaginationButtons(totalStories) {
    const totalPages = Math.ceil(totalStories / itemsPerPage);

    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.disabled = currentPage === 1;
    backButton.addEventListener('click', () => changePage(currentPage - 1));

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => changePage(currentPage + 1));

    paginationContainer.appendChild(backButton);
    paginationContainer.appendChild(nextButton);

    newsList.appendChild(paginationContainer);
  }

  function changePage(newPage) {
    currentPage = newPage;
    fetchAndRenderStories(currentPage);
    window.scrollTo(0, 0);
  }

  await fetchAndRenderStories(currentPage);
});
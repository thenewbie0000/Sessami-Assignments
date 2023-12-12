document.addEventListener("DOMContentLoaded", async function () {
  const headerTitle = document.querySelector('.header h1 span');
  headerTitle.addEventListener('click', function () {
    window.location.href = 'index.html';
  });

  const storyId = new URLSearchParams(window.location.search).get('storyId');
  const commentsContainer = document.getElementById("commentsContainer");
  const apiUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;

  try {
    const response = await fetch(apiUrl);
    const story = await response.json();

    if (!story) {
      commentsContainer.innerHTML = "<p>Story not found</p>";
      return;
    }

    const comments = await fetchComments(story.kids);

    commentsContainer.innerHTML = `
      <div class="comments-wrapper">
        <h2><a class="news-url" href="${story.url}" target="_blank">${story.title}</a></h2>
        <div class="news-details">
          <span class="detail"><i class="far fa-star"></i> ${story.score}</span>
          <span class="detail comment"><i class="far fa-comments"> ${story.descendants}</i></span>
          <span class="detail"><i class="far fa-user"></i> ${story.by}</span>
        </div>
        <h3>Comments:</h3>
        <ul>${comments.map((comment, index) => renderComment(comment, 0, index + 1)).join("")}</ul>
      </div>
    `;
    
    loadingOff();
  } catch (error) {
    console.error("Error fetching story and comments:", error);
    commentsContainer.innerHTML = "<p>Error fetching story and comments</p>";
  }
});

function loadingOff() {
  let preLoader = document.getElementById('loader-container');
  preLoader.style.display = 'none';
}

async function fetchComments(commentIds) {
  const commentPromises = commentIds.map((commentId) =>
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
    ).then((response) => response.json())
  );

  const comments = await Promise.all(commentPromises);

  for (const comment of comments) {
    if (comment.kids && comment.kids.length > 0) {
      const nestedComments = await fetchComments(comment.kids);
      comment.replies = nestedComments;
    }
  }

  return comments;
}

function renderComment(comment, depth = 0, index) {
  if (depth > 3) {
    return "";
  }

  let html = `
    <li>
      <div class="comment-wrapper" style="margin-left: 5vw;">
        <div class="comment-line" style="left: 0;"></div>
        <div class="comment-box">
          <i class="far fa-user" style="margin:0 8px 8px 0;"></i><b>${comment.by}</b><br> ${comment.text}
        </div>
    `;

  if (comment.replies && comment.replies.length > 0) {
    html += `
      <ul class="nested-comments">
        ${comment.replies.map((reply, subIndex) => renderComment(reply, depth + 1, subIndex + 1)).join("")}
      </ul>
    `;
  }

  html += `
      </div>
    </li>
  `;

  return html;
}
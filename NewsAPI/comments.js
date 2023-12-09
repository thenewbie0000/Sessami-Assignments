document.addEventListener("DOMContentLoaded", async function () {
  const headerTitle = document.querySelector('.headerv h1');
  headerTitle.addEventListener('click', function () {
      window.location.href = 'index.html';
    }
  );

  const storyId = new URLSearchParams(window.location.search).get('storyId');
  console.log(storyId);
  const commentsContainer = document.getElementById("commentsContainer");
  const apiUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;

  try {
    const response = await fetch(apiUrl);
    const story = await response.json();

    if (!story) {
      commentsContainer.innerHTML = "<p>Story not found</p>";
      return;
    }

    const comments = story.kids ? story.kids.slice(0, 10) : [];

    commentsContainer.innerHTML = `
      <div class="comments-wrapper">
        <h3><a class="news-url" href="${story.url}" target="_blank">${story.title}</a></h3>
        <div class="news-details">
          <span class="detail"><i class="far fa-star"></i> ${story.score}</span>
          <span class="detail comment"><i class="far fa-comments"> ${story.descendants}</i></span>
          <span class="detail"><i class="far fa-user"></i> ${story.by}</span>
        </div>
        <ul id="commentList">${comments.map((comment, index) => renderComment(comment, 0, index + 1)).join("")}</ul>
        <button id="loadMoreComments">Load More Comments</button>
      </div>
    `;
    const loadMoreButton = document.getElementById("loadMoreComments");
    let currentPage = 1;

    loadMoreButton.addEventListener("click", async function () {
      currentPage++;
      const additionalComments = await fetchComments(story.kids.slice((currentPage - 1) * 10, currentPage * 10));
      const commentList = document.getElementById("commentList");
      commentList.innerHTML += additionalComments.map((comment, index) => renderComment(comment, 0, index + 1)).join("");
    });
    
    loadingFunction();
  } catch (error) {
    console.error("Error fetching story and comments:", error);
    commentsContainer.innerHTML = "<p>Error fetching story and comments</p>";
  }
});

function loadingFunction() {
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

  // Recursively fetch and append nested comments
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
    return ""; // Do not render comments beyond depth 2
  }
  
  let html = `
    <li style="margin-left: ${depth * 20}px;"><div class="comment-box">
      <i class="far fa-user" style="margin-bottom:8px;"></i><b>${comment.by}</b><br> ${comment.text}
    </div>
  `;

  if (comment.replies && comment.replies.length > 0) {
    html += "<ul>" + comment.replies.map((reply, subIndex) => renderComment(reply, depth + 1, subIndex + 1)).join("") + "</ul>";
  }

  html += "</li>";

  return html;
}

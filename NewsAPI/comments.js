document.addEventListener("DOMContentLoaded", async function () {
  const commentsContainer = document.getElementById("commentsContainer");

  const apiUrl = `https://hacker-news.firebaseio.com/v0/item/38565651.json?print=pretty`;

  try {
    const response = await fetch(apiUrl);
    const story = await response.json();

    if (!story) {
      commentsContainer.innerHTML = "<p>Story not found</p>";
      return;
    }

    const comments = await fetchComments(story.kids);

    commentsContainer.innerHTML = `<div class="comments-wrapper"><h3>${story.title}</h3><ul>${comments.map((comment, index) => renderComment(comment, 0, index + 1)).join("")}</ul></div>`;
  } catch (error) {
    console.error("Error fetching story and comments:", error);
    commentsContainer.innerHTML = "<p>Error fetching story and comments</p>";
  }
});

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
  if (depth > 2) {
    return ""; // Do not render comments beyond depth 2
  }
  
  let html = `<li style="margin-left: ${depth * 20}px;"><div class="comment-box"><b>${comment.by}</b><br> ${comment.text}</div>`;

  if (comment.replies && comment.replies.length > 0) {
    html += "<ul>" + comment.replies.map((reply, subIndex) => renderComment(reply, depth + 1, subIndex + 1)).join("") + "</ul>";
  }

  html += "</li>";

  return html;
}

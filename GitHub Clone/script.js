document.addEventListener("DOMContentLoaded", function () {
  const username = "prashantacharya";
  const apiUrl = `https://api.github.com/users/${username}`;
  const repoUrl = `https://api.github.com/users/${username}/repos`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((userData) => {
      const profile = document.getElementById("profile");
      console.log("Website:", userData.blog);
      console.log("Email:", userData.email);
      console.log("LinkedIn:", userData.linkedin);
      console.log("X:", userData.twitter_username);

      profile.innerHTML = `
            <div>
              <img src="${
                userData.avatar_url
              }" alt="Profile Picture" class="profile-picture">
              <div class="user">
                <a href="${userData.html_url}" target="_blank">
                  <img src="octo-logo.jpg" alt="GitHub Octocat Logo" class="octo-img" >
                  <h2>${username}</h2>
                </a>
              </div>
              <p style="margin:10px; font-family: 'Exo 2', sans-serif;">${
                userData.name
              }</p>
              <div>
                ${
                  userData.location
                    ? `<img src = "location.png" class="user-location"> ${userData.location}`
                    : ""
                } 
              </div>
              
              ${
                userData.bio
                  ? `<p style="font-family: 'Exo 2', sans-serif; margin:15px 0;font-weight:400;">${userData.bio}</p>`
                  : ""
              }
              <div class="follow-stats">
                  <div class="stat">
                      <div class="count">${userData.followers}</div>
                      <div class="label">FOLLOWERS</div>
                  </div>
                  <div class="stat">
                      <div class="count">${userData.following}</div>
                      <div class="label">FOLLOWING</div>
                  </div>
              </div>
              <div class="social-links">
                ${
                  userData.twitter_username
                    ? `<p><a href="https://twitter.com/${userData.twitter_username}" target="_blank"><img src="x-twitter.png" style="width:20px;"></a></p>`
                    : ""
                }
                ${
                  userData.blog
                    ? userData.blog.includes("www.linkedin.com")
                      ? `<p><a href="${userData.blog}" target="_blank"><i class="fab fa-linkedin"></i></a></p>`
                      : `<p><a href="${userData.blog}" target="_blank"><i class="fas fa-globe"></i></a></p>`
                    : ""
                }
                
                ${
                  userData.email
                    ? `<p><a href="mailto:${userData.email}"><i class="fas fa-envelope"></i></a></p>`
                    : ""
                }
              </div>
            </div>
          `;
    })
    .catch((error) => console.error("Error fetching user data:", error));

  fetch(repoUrl)
    .then((response) => response.json())
    .then((reposData) => {
      const repositories = document.getElementById("repositories");
      const repoList = document.createElement("div");
      repoList.innerHTML =
        '<h1 style="text-align:left; margin: 0 0 15px 0;">Repositories</h1>';

      reposData.forEach((repo) => {
        const repoCard = document.createElement("div");
        repoCard.classList.add("repo-card");
        repoCard.innerHTML = `
                <a href="${repo.html_url}" target="_blank">
                  <h2 style="margin:0 0 10px 0;">${repo.name}</h2>
                  <p class="repo-description">${repo.description || ""}</p>
                  <p class="repo-description"><b style="font-family:'Oswald', sans-serif;">Made With:</b> ${
                    repo.language || "N/A"
                  }</p>
                  <ul">
                    <li style="color:#fff; font-size:16px;">
                    <i class="fas fa-code-branch" style="vertical-align: middle; transform: rotate(-10deg);"></i> ${
                      repo.forks_count
                    }</li>
                    <li style="color:#fff; font-size:16px;"><i class="material-icons" style="vertical-align: middle;">star</i> ${
                      repo.stargazers_count
                    }</li>
                      
                  </ul>
                </a>
              `;
        repoList.appendChild(repoCard);
      });

      repositories.appendChild(repoList);
    })
    .catch((error) => console.error("Error fetching repository data:", error));
});

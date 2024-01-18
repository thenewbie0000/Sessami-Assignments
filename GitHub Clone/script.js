document.addEventListener("DOMContentLoaded", async function () {
  const username = "thenewbie0000";
  const apiUrl = `https://api.github.com/users/${username}`;
  const repoUrl = `https://api.github.com/users/${username}/repos`;
  const modeToggle = document.getElementById('modeToggle');
  const body = document.body;

  function updateMode() {
    const isLightMode = localStorage.getItem('isLightMode') === 'true';
    if (isLightMode) {
      body.classList.add('light-mode');
      modeToggle.checked = true;
    } else {
      body.classList.remove('light-mode');
      modeToggle.checked = false;
    }
  }

  modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
      body.classList.add('light-mode');
      localStorage.setItem('isLightMode', 'true');
    } else {
      body.classList.remove('light-mode');
      localStorage.setItem('isLightMode', 'false');
    }
  });



  try {
    const responseUser = await fetch(apiUrl);
    const userData = await responseUser.json();

    const responseRepos = await fetch(repoUrl);
    const reposData = await responseRepos.json();
    const profile = document.getElementById("profile");

    profile.innerHTML = `
            <div>
              <img src="${
                userData.avatar_url
              }" alt="Profile Picture" class="profile-picture">
              <div class="user">
                <img src="octo-logo.jpg" alt="GitHub Octocat Logo" class="octo-img dark">
                <img src="light-mode-octo.png" alt="GitHub Octocat Logo" class="octo-light">
                <a href="${userData.html_url}" target="_blank"><h2>${username}</h2></a>               
              </div>
              <p style="margin:10px; font-family: 'Exo 2', sans-serif;">${
                userData.name
              }</p>
              <div>
                ${
                  userData.location
                    ? `<img src = "location.png" class="user-location">
                       <img src = "light-location.png" class="user-location-light">
                       ${userData.location}`
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
                      ? `<p><a href="${userData.blog}" target="_blank"><i class="fab fa-linkedin linkedin-dark"></i>
                      <i class="fab fa-linkedin linkedin-light" style="color: #0077B5;"></i></a></p>`
                      : `<p><a href="${userData.blog}" target="_blank"><i class="fas fa-globe light-globe"></i><i class="fas fa-globe dark-globe" style="color:black;"></i></a></p>`
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
                  <ul>
                    <li class="fork-count">
                      <i class="fas fa-code-branch star-icon" style="vertical-align: middle; transform: rotate(-10deg); color:white; font-size:18px;"></i> 
                      <i class="fas fa-code-branch heart-icon" style="vertical-align: middle; transform: rotate(-10deg);color: black; font-size:18px;"></i>
                      <span class="count">${repo.forks_count}</span>
                    </li>
                    <li class="stargazers-count">
                      <i class="material-icons star-icon" style="vertical-align: middle;">star</i>
                      <i class="fas fa-star heart-icon" style="vertical-align: middle;color: black;font-size:18px;"></i>
                      <span class="count">${repo.stargazers_count}</span>
                    </li>
                      
                  </ul>
                </a>
              `;
        repoList.appendChild(repoCard);
      });

      repositories.appendChild(repoList);
      updateMode();
    }
    catch(error){console.error("Error fetching repository data:", error);}
});

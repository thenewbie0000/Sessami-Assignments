document.addEventListener("DOMContentLoaded", function () {
  // Replace 'YOUR_USERNAME' with the GitHub username you want to display
  const username = 'thenewbie0000';
  const apiUrl = `https://api.github.com/users/${username}`;
  const repoUrl = `https://api.github.com/users/${username}/repos`;
  


  // Fetch user details
  fetch(apiUrl)
      .then(response => response.json())
      .then(userData => {
          const profile = document.getElementById('profile');
          console.log('Website:', userData.blog);
          console.log('Email:', userData.email);
          console.log('LinkedIn:', userData.linkedin);
          profile.innerHTML = `
            <div>
              <img src="${userData.avatar_url}" alt="Profile Picture" style="border-radius: 50%; width: 180px;">
              <div class="user">
                <img src="octo-logo.jpg" alt="GitHub Octocat Logo" style="width:30px; height:30px; top:20px">
                <h2><a href="${userData.html_url}" target="_blank">${username}</a></h2>
              </div>
              <p style="margin:10px; font-family: 'Exo 2', sans-serif;">${userData.name}</p>
              ${userData.bio ? `<p>${userData.bio}</p>` : ''}
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
              ${userData.blog ? `<p><strong>Website:</strong> <a href="${userData.blog}" target="_blank"><i class="fas fa-globe"></i></a></p>` : ''}
              ${userData.email ? `<p><strong>Email:</strong> <a href="mailto:${userData.email}"><i class="far fa-envelope"></i></a></p>` : ''}
              ${userData.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${userData.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a></p>` : ''}
            </div>
          `;
      })
      .catch(error => console.error('Error fetching user data:', error));

  // Fetch user repositories
  fetch(repoUrl)
      .then(response => response.json())
      .then(reposData => {
          const repositories = document.getElementById('repositories');
          const repoList = document.createElement('div');
          repoList.innerHTML = '<h1 style="text-align:left; margin: 0 0 15px 0;">Repositories</h1>';

          reposData.forEach(repo => {
              const repoCard = document.createElement('div');
              repoCard.classList.add('repo-card');
              repoCard.innerHTML = `
                  <h2 style="margin:0 0 10px 0;"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                  <p class="repo-description">${repo.description || 'No description available'}</p>
                  <p style="color:#fff;"><b>Made With:</b> ${repo.language || 'N/A'}</p>
                  <ul>
                    <li style="color:#fff;"><svg height="16" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true" style="vertical-align: text-bottom;"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 104.498 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-.878zm2.25 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm7.5-8.75a.75.75 0 100-1.5.75.75 0 000 1.5zM2.75 5a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> Forks: ${repo.forks_count}</li>
                    <li style="color:#fff;"><svg height="16" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true" style="vertical-align: text-bottom;"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.554a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zM8 2.03L6.615 4.854a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.03z"></path></svg> Stargazers: ${repo.stargazers_count}</li>
                      
                  </ul>
              `;
              repoList.appendChild(repoCard);
          });

          repositories.appendChild(repoList);
      })
      .catch(error => console.error('Error fetching repository data:', error));
});

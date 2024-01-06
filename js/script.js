//select the div with a class of overview
const overview = document.querySelector(".overview");
//select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
//select section where the repo info appears
const repoDetails = document.querySelector(".repos");
//select section where repo data will appear
const repoData = document.querySelector(".repo-data");
//select back to gallery button
const backButton = document.querySelector(".view-repos");
//select the search by name placeholder
const filterInput = document.querySelector(".filter-repos");

const username = "shannawalsh";

//pull basic user data from profile
const gitUserProfile = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);

    displayUser(data);
};
gitUserProfile();

//create elements to display the profile data
const displayUser = function (data) {
   const div = document.createElement("div");
   div.classList.add("user-info");
   div.innerHTML = `
   <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;
    overview.append(div);
    gitUserRepos();
};

//pull user repo and repo data
const gitUserRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    repoInfo(repoData);
};

//create elements and display repos
const repoInfo = function (repos) {
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    filterInput.classList.remove("hide");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
    }
};

//add event listener for clicking on the repo name
repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//pull specific repo info
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    //fetch languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    
    //create list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);

    };

const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repoDetails.classList.add("hide");
    backButton.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `
       <h3>Name: ${repoInfo.name}</h3>
          <p>Description: ${repoInfo.description}</p>
          <p>Default Branch: ${repoInfo.default_branch}</p>
          <p>Languages: ${languages.join(", ")}</p>
          <p>Has GitHub Hosted Page: ${repoInfo.has_pages}</p>
          <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
          <a class="visit" href="https://${username}.github.io/${repoInfo.name}" target="_blank" rel="noreferrer noopener">GitHub Hosted Page!</a>
    `;
    repoData.append(div);
   }
backButton.addEventListener("click", function(){
    repoDetails.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e){
    const searchText = e.target.value
    //console.log(searchText); 
    const repos = document.querySelectorAll(".repo");
    const lowerSearchText = searchText.toLowerCase();
    
    for (const repo of repos) {
        const lowerRepoText = repo.innerText.toLowerCase();
        if (lowerRepoText.includes(lowerSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});

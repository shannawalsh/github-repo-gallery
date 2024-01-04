//select the div with a class of overview
const overview = document.querySelector(".overview");
//select the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

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
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
    }
};

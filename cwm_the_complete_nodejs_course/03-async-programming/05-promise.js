const getUser = id => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Reading a user from database ...");
        resolve({ id, gh: "shihab4t" })
    }, 2000);
});


const getRepos = username => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Get repos from github by", username, " ...");
        resolve(['repo1', 'repo2', 'repo3']);
    }, 2000)
});

const getCommits = repo => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Getting commits from github by", repo, " ...");
        resolve(['commit1', 'commit2', "commit3"]);
    }, 2000);
});

// Asynchronous
console.log("Before");
getUser(1)
    .then(user => {
        console.log(user);
        return getRepos(user.gh);
    })
    .then(repos => {
        console.log(repos);
        return getCommits(repos[0]);
    })
    .then(commits => {
        console.log(commits);
        console.log("After")
    })
    .catch(err => console.log(err.message));

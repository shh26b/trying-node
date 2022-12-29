const getUser = (id, callback) => {
    setTimeout(() => {
        console.log("Reading a user from database ...");
        callback({ id, gh: "shihab4t" })
    }, 2000);
    return 1;
}

const getRepos = (username, callback) => {
    setTimeout(() => {
        console.log("Get repos from github by", username, " ...");
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000)
}

const getCommits = (repo, callback) => {
    setTimeout(() => {
        console.log("Getting commits from github by", repo, " ...");
        callback(['commit1', 'commit2', "commit3"]);
    })
}

// Asynchronous
console.log("Before");
getUser(1, user => {
    console.log(user);
    getRepos(user.gh, repos => {
        console.log(repos);
        getCommits("shihab4t", commits => {
            console.log(commits);
        })
    })
});
console.log("After");

// // Synchronous
// console.log("Before");
// const user = getUser(1);
// console.log(user);
// const repos = getRepos(user.gh);
// console.log(repos);
// const commits = getCommits("shihab4t");
// console.log(commits);
// console.log("After");

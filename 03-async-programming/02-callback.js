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

console.log("Before");
getUser(1, user => {
    console.log(user);
    getRepos(user.gh, repos => {
        console.log(repos);
    })
});
console.log("After");
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async operation 1...");
        resolve(1);
    });
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async operation 2...");
        resolve(2);
    });
});

// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err));
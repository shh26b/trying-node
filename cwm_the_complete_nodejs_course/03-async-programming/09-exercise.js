const getCustomer = id => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            id: 1,
            name: 'Mosh Hamedani',
            isGold: true,
            email: 'email'
        });
    }, 4000);
});

const getTopMovies = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(['movie1', 'movie2']);
    }, 4000);
});

const sendEmail = (email, movies, callback) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 4000);
});

const main = async () => {
    try {
        const customer = await getCustomer(1);
        console.log('Customer: ', customer);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            await sendEmail(customer.email, movies);
            console.log("Email sent...")
        }
    } catch (err) {
        console.log(err);
    }
}
main();

// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });


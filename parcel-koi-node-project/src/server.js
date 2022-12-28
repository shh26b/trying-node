const app = require("./app");
const { connect_with_db } = require("./utils/mongo.util");

const port = 3000;

app.listen(port, () => {
    connect_with_db();
    console.log("App is running on port " + port);
});

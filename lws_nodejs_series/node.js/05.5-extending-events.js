const School = require("./school");

const school = new School();

// register a listener for bell_ring event
school.on("bell_ring", ({ period, text }) => {
    console.log(`We need to run! ${period} ${text}`);
});

school.start_period();

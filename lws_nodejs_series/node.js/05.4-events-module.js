const EventEmitter = require("events");

const event_emitter = new EventEmitter();

// register a listener for bell_ring event
event_emitter.on("bell_ring", ({ period, text }) => {
    console.log(`We need to run! ${period} ${text}`);
});

// raise an event
setTimeout(() => {
    event_emitter.emit("bell_ring", {
        period: "first",
        text: "period ended",
    });
}, 2000);

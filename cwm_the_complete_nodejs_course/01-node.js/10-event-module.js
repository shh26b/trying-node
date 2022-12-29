const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// Register a event listener
eventEmitter.on("messageLogged", () => {
    console.log("something ...");
});

// Raise a event
eventEmitter.emit("messageLogged");

// emit means Making a noise, product something - signalling

eventEmitter.on("start", (number) => {
    console.log(`The number is ${number}`);
});

eventEmitter.emit("start", 23);

const listener = (start, end) => {
    console.log(`start from ${start} to ${end}`);
};

eventEmitter.on("start", listener);

eventEmitter.emit("start", 5, 55);
// eventEmitter.off("start", listener);
eventEmitter.removeAllListeners("start");
eventEmitter.emit("start", 5, 100);

// eventEmitter.emit("start", 5, 55); // error
console.log(eventEmitter.eventNames());
console.log(eventEmitter.listenerCount("start"));
console.log(eventEmitter.listeners("start"));

eventEmitter.once("only-one", () => {
    console.log("Only one");
});

eventEmitter.emit("only-one");
eventEmitter.emit("only-one");

console.log(eventEmitter.getMaxListeners());
eventEmitter.setMaxListeners(50);
console.log(eventEmitter.getMaxListeners());

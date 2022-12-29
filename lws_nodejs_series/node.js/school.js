const EventEmitter = require("events");

class School extends EventEmitter {
    start_period () {
        console.log("Start Class");
        setTimeout(() => {
            this.emit('bell_ring', {
                period: "first", 
                text: "period ended"
            }); 
        }, 2000);    
    }
}

module.exports = School;
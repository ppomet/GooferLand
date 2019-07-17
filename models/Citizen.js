class Citizen {
  constructor(name, EventHandler) {
    this.name = name;
    this.myEventHandler = EventHandler;

  }

  addEventListener(event) {
    this.myEventHandler.on(event, this.eventHandled(event))
  }

  eventHandled(data, event) {
    console.log(`${data.city} heard a new ${event}`);
  }

  deleteEventListiner(event) {
    console.log(`deleting listener for ${event} event for ${this.name}`);
    this.myEventHandler.removeListener(event, this.eventHandled(event))
  }
}
module.exports = Citizen;

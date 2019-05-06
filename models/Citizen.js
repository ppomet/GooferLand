class Citizen {
  constructor(name, myEvents) {
    this.name = name;
    this.myEvents = myEvents;
    this.tickHandler2 = (data) => {
      console.log(`${data.city} heard a new tick`);
    }
    this.addTickListiner();
  }
  tickHandler(data) {
    console.log(`${this.name} heard a new tick`);
  }
  addTickListiner() {
    this.myEvents.on('tick', this.tickHandler2)
  }
  deleteTickListiner() {
    console.log("deleting listener for", this.name)
    this.myEvents.removeListener('tick', this.tickHandler2)
  }
}
module.exports = Citizen;
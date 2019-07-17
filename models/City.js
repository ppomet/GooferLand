TheGrid = require('../models/TheGrid');
faker = require('faker');
Randomize = require('../models/Randomize');
EventEmitter = require('events');
debug = require('debug')('insideCity');


class City {
  constructor(width, height, foodGeneratingCells, cityName) {
    ((Math.abs(width) === width && width >= 1) ? this.width = width : this.width  = 1);
    ((Math.abs(height) === height && height >= 1) ? this.height = height : this.height  = 1);
    this.rand = new Randomize();
    this.citizens = [];
    let newDayTimerId = null;
    let newNightTimerId = null;
    this.eventHandler = new EventEmitter();// declaration et assignation
    console.log("typeof event handler in city =>", this.eventHandler instanceof EventEmitter);
    this.grid = new TheGrid(width, height).setfoodGeneratingCells(5);
    this.name = cityName || faker.Company();


    this.newDay = (msDuration) => {
      if (newDayTimerId) {clearInterval(newDayTimerId)}
      newDayTimerId = setInterval(() => {
        this.eventHandler.emit('newDay');}, msDuration)
    };

    this.newNight = (msDuration) => {
      if (newNightTimerId) {clearInterval(newNightTimerId)}
      newNightTimerId = setInterval(() => {
        this.eventHandler.emit('newNight');
        }, msDuration)
    };

    this.launchTimeFlow = (flowSpeed) => {
      debug('Allez, on lance l\'ecoulement du temps');
      this.newDay(flowSpeed);
      setTimeout(this.newNight ,flowSpeed / 2, flowSpeed);
      return this;
    };

    this.dayAndNightWatcher = () => {
      this.eventHandler.on('newDay', () => {debug(`c'est une Nouvelle journée`)});
      this.eventHandler.on('newNight', () => {debug(`Il va faire Tout Noir ! ...`)});
      return this;
    }

  }

    addGridListenToTick() {
      this.grid.theGridSubscriber(this.eventHandler, 'tick')
    }

    addGooferCitizen(goofer, events) {
      this.citizens[goofer.name] = goofer;
    }

    deleteGooferCitizen(gooferName) {
      this.citizens[gooferName].deleteTickListiner();
      delete this.citizens[gooferName];
      console.log("DELETED", gooferName)
    }

    evntEmtrSnif(msDuration) {
      setInterval(() => {
        console.log(`state of event Emitter from sniffer ${JSON.stringify(this.eventHandler)}`)
      }, msDuration)
    }
  }
  
  module.exports = City;

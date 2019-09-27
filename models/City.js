const TheGrid = require('../models/TheGrid');
const chance = require('chance').Chance();
const Randomize = require('../models/Randomize');
const EventEmitter = require('events');
const debug = require('debug')('insideCity');
const debugLog = require('debug')('debug-city');


class City {
  constructor(width, height, foodGeneratingCellsNb, cityName) {
    ((Math.abs(width) === width && width >= 2) ? this.width = width : this.width  = 2);
    ((Math.abs(height) === height && height >= 2) ? this.height = height : this.height  = 2);
    this.rand = new Randomize();
    this.citizens = [];
    let newDayTimerId = null;
    let newNightTimerId = null;
    this.eventHandler = new EventEmitter();// declaration et assignation
    console.log("typeof event handler in city =>", this.eventHandler instanceof EventEmitter ? "EventEmitter" : "unknown");
    this.grid = new TheGrid(width, height).setFoodGeneratingCells(foodGeneratingCellsNb);
    this.name = cityName || chance.city();


    this.newDay = (msDuration) => {
      if (newDayTimerId) {clearInterval(newDayTimerId)}
      newDayTimerId = setInterval(() => {
          debugLog(`number of citizen today : ${this.citizens.length}`);
          this.eventHandler.emit('newDay');
          this.eventHandler.emit('Time to Shag');
        }
        , msDuration)
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
  /**
   * @param {Goofer|Array<Goofer>} goofers   A unique instance of goofer or an array of it.
   */
    addGooferCitizen(goofers) {
      if (Array.isArray(goofers)) {
        debugLog('got an instance of an array');
        // goofers.map((elem) => {
        //   this.citizens.push(elem);
        // })
        // this.citizens = this.citizens.concat(goofers);
      }
    this.citizens = this.citizens.concat(goofers);

      debugLog('************************************');
      debugLog(this.citizens);
      debugLog('*************************************');
      // this.citizens[goofers.name] = goofers;
      // debugLog({EVENT: this.eventHandler});
    }

    checkIfGooferExistSomewhere(gooferName) {
      let occurrences = 0;
      for (let idx = 0; idx < this.citizens.length; idx++) {
        if (this.citizens[idx].name === gooferName) {
          occurrences++;
          debugLog(`found an occurence of ${gooferName} in the citizens of ${this.name} at emplacement ${idx}`);
        }
      }
    }


    deleteGooferCitizen(gooferName) {
      this.citizens[gooferName];
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

TheGrid = require('../models/TheGrid');
Randomize = require('../models/Randomize');
EventEmitter = require('events');
debug = require('debug')('testCity');


class City {
  constructor(width, height, foodGeneratingCells, cityName) {
    ((Math.abs(width) === width && width >= 1) ? this.width = width : this.width  = 1);
    ((Math.abs(height) === height && height >= 1) ? this.height = height : this.height  = 1);
    this.rand = new Randomize();
    
    this.eventHandlerA = new EventEmitter();// declaration et assignation
    this.eventHandlerB = new EventEmitter();// declaration et assignation

    this.grid = new TheGrid(this.eventHandlerB, width, height, foodGeneratingCells);
    this.name = cityName || 'BaduCity';


    this.dayNnight = (msDuration) => {
      setInterval(() => {this.eventHandlerA.emit('tick');}, msDuration)
    }

    this.noonNmorning = (msDuration) => {
      setInterval(() => {this.eventHandlerB.emit('tock');}, msDuration)
    }

    // this.dayNnight(800);
    this.noonNmorning(900);
    // this.evntEmtrSnif(10000);

    debug(this);
    // console.log('bob');
    this.tickCount = 0;
    // this.eventHandlerA.on('tick', () => {
    //   this.tickCount++;
    //   console.log(`we listen to ${this.tickCount} ticks`)
    // })
    this.tockCount = 0;


    // this.eventHandlerA.on('tock', () => {
    //   this.tockCount++;
    //   console.log(`we listen to ${this.tockCount} tocks`)
    // })
    // this.addGridListenToTick();
    // this.grid.generateFoodFillListen('tock');
  }

    addGridListenToTick() {
      this.grid.theGridSubscriber(this.eventHandlerA, 'tick')
    }









































    addGooferCitizen(goofer, events) {
      goofer.addGooferListener('tick', events);
      this.gooferCitizens[goofer.name] = goofer;
    }

    deleteGooferCitizen(gooferName) {
      this.gooferCitizens[gooferName].deleteTickListiner();
      delete this.gooferCitizen[gooferName];
      console.log("DELETE", this.gooferCitizen[gooferName])
    }

    evntEmtrSnif(msDuration) {
      setInterval(() => {
        console.log(`state of event Emitter from sniffer ${JSON.stringify(this.eventHandler)}`)
      }, msDuration)
    }
    
    // freeFoodCells () {
    //   let freeFoodCells = 0;
    //   for (let x = 0; x < this.width; x++) {
    //     for (let y = 0; y < this.height; y++) {
    //       // console.log('this machin', this.grid);
    //       if (!this.grid.column[x][y].getFood()) {
    //         freeFoodCells++;
    //       }
    //     }
    //   }
    //   this.gridFFC = freeFoodCells;
    // }
    
    // isFoodCellSpaceEnough(fGC) {
    //   if (fGC > ((this.height * this.width) - this.foodOnGrid)) {
    //     return false;
    //   }
    //   return true;
    // }
    
    // freeFoodPercentage () {
    //   freeFoodCells();
    //   return ((this.height * this.width) - this.gridFFC / 100);
    // }

    // doesCellHaveAGoofer (x, y) {
    //   return this.grid.column[x][y].isGooferPresent();
    // }


      // dayNnight(msDuration) {
  //     setInterval(() => {this.eventHandler.emit('tick');}, msDuration)
  //   }
  }
  
  module.exports = City;
  
  // const EventEmitter = require('events');
  
  // class Ville {
  //   constructor(name) {
  //     this.name = name;
  //     this.citizenList = {}
  //     this.eventHandler = new EventEmitter();
  
  //     setInterval(() => {
  //       this.eventHandler.emit('tick', {city: this.name})
  //     }, 300)
  //     setTimeout(() => {
  //       console.log("Delete")
  //       this.deleteCitizen('Mike');
  //       console.log(this.citizenList)
  //       console.log(this.eventHandler.listeners("tick"))
  //     }, 3000)
  //     setTimeout(() => {
  //       console.log("Delete")
  //       this.deleteCitizen('John');
  //       console.log(this.citizenList)
  //       console.log(this.eventHandler.listeners("tick"))
  //     }, 6000)
  //   }
  
  
  
  //   addCitizen(citizen) {
  //     this.citizenList[citizen.name] = citizen
  //   }
  //   deleteCitizen(citizenName) {
  //     this.citizenList[citizenName].deleteTickListiner();
  //     delete this.citizenList[citizenName]
  //     console.log("DELETE", this.citizenList[citizenName])
  //   }
  
  // }
  // module.exports = Ville;
TheGrid = require('../models/TheGrid');
Randomize = require('../models/Randomize');
EventEmitter = require('events');

class City {
  constructor(width, height, foodGeneratingCells, cityName) {
    this.rand = new Randomize();
    this.eventHandler = new EventEmitter();
    this.name = cityName;
    ((width && typeof width == "number" && width >= 1) ? this.width = width: this.width  = 1)
    ((height && typeof height == "number" && height >= 1) ? this.height = height: this.height  = 1)
    this.grid = new TheGrid(width, height, this.eventHandler);
    if (foodGeneratingCells &&
      typeof foodGeneratingCells === "number" &&
      foodGeneratingCells > 0) {
        this.fGC = foodGeneratingCells;
      } else {
        this.fGC = Math.floor(width * height / 20);// def val = 5% des cells
      }
    gooferCitizens = [];// ???
    // gooferCitizens = {};// ???
    this.foodOnGrid = 0;
    this.gridFFC;
    freeFoodCells();

  }
    
    dayNnight(msDuration) {
      setInterval(() => {
        this.eventHandler.emit('tick', {city: name, event: "newday"});
      }, msDuration)
    }
    
    addGooferCitizen(goofer) {
      this.gooferCitizens[goofer.name] = goofer;
    }

    deleteGooferCitizen(gooferName) {
      this.gooferCitizens[gooferName].deleteTickListiner();
      delete this.gooferCitizen[gooferName];
      console.log("DELETE", this.gooferCitizen[gooferName])
    }
    
    generateFoodRand(fGC) {
      let x = this.rand.integer(0, this.width);
      let y = this.rand.integer(0, this.height);
      let idx = 0;
      while (idx < fGC) {
        if (this.foodOnGrid == this.maxGridFood) {break}
        if (!this.grid[x][y].getFood()) {
          this.grid[x][y].setFood(1);
          this.foodOnGrid++;
          this.gridFFC--;
          idx++;
        } else {
          x = this.rand.integer(0, this.width);
          y = this.rand.integer(0, this.height);
        }
      }
    }
    
    generateFoodFill (fGC) {
      let foodPlaced = 0;
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          if (!this.grid[x][y].getFood()) {
            this.grid[x][y].setFood(1);
            this.foodOnGrid++;
            foodPlaced++;
            if (foodPlaced = fGC) {return}
          }
        }
      }
    }
    
    freeFoodCells () {
      let freeFoodCells = 0;
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          if (!this.grid[x][y].getFood()) {
            freeFoodCells++;
          }
        }
      }
      this.gridFFC = freeFoodCells;
    }
    
    isFoodCellSpaceEnough(fGC) {
      if (fGC > ((this.height * this.width) - this.foodOnGrid)) {
        return false;
      }
      return true;
    }
    
    freeFoodPercentage () {
      freeFoodCells();
      return ((this.height * this.width) - this.gridFFC / 100);
    }
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
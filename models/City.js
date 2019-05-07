TheGrid = require('../models/TheGrid');
Randomize = require('../models/Randomize');
EventEmitter = require('events');

class City {
  constructor(width, height, foodGeneratingCells, cityName) {

    ((Math.abs(width) === width && width >= 1) ? this.width = width : this.width  = 1);
    ((Math.abs(height) === height && height >= 1) ? this.height = height : this.height  = 1);


    this.rand = new Randomize();
    console.log('this.rand = ');
    console.log(this.rand);




    this.eventHandler = new EventEmitter();
    this.name = cityName;
    this.foodOnGrid = 0;
    this.gridFFC;
    this.grid = new TheGrid(width, height, this.eventHandler);

    if (foodGeneratingCells && // TODO: refacto avec abs
      typeof foodGeneratingCells === "number" &&
      foodGeneratingCells > 0) {
        this.fGC = foodGeneratingCells;
      } else {
        this.fGC = Math.floor(width * height / 20);// def val = 5% des cells
      }

    this.bob = () => {
      console.log('this rand in generate food rand');
      console.log(this);
      let x = this.rand.integer(0, this.width);
      let y = this.rand.integer(0, this.height);
      let idx = 0;
      while (idx < this.fGC) {
        if (this.foodOnGrid == this.maxGridFood) {break}
        if (!this.grid.column[x][y].getFood()) {
          this.grid.column[x][y].setFood(1);
          this.foodOnGrid++;
          this.gridFFC--;
          idx++;
        } else {
          x = this.rand.integer(0, this.width);
          y = this.rand.integer(0, this.height);
        }
      }
    }

    this.gooferCitizens = [];
    // this.gooferCitizens = {};// ???
    
    this.freeFoodCells();
    // console.log('||||||||||');
    // console.log(`etat de la grille in city constructor ${JSON.stringify(this.grid)}`);
    console.log('||||||||||');
    console.log('this.grid in cityconstruct');
    console.log(this.grid);
    console.log('||||||||||');
    console.log('this.grid.getGridContent in cityconstruct');
    console.log(this.grid.getGridContent);
    // console.log(`etat de la methode getGridContent de grille in city constructor ${JSON.stringify(this.grid.getGridContent)}`);
    console.log('||||||||||');
    // console.log(`etat du listener de la grille ${JSON.stringify(this.grid.myEventHandler)}`);
    this.dayNnight(5000);
    this.evntEmtrSnif();
    console.log(`etat du this.generateFoodRand in the construct`);
    console.log(this.generateFoodRand);
    this.setfGC(1);

    this.eventHandler.on('tick', this.bob);
    // this.eventHandler.on();
  }

  setfGC(val) {
    this.fGC = val;
  }

  evntEmtrSnif() {
    setInterval(() => {
      console.log(`state of event Emitter from sniffer ${JSON.stringify(this.eventHandler)}`)
    }, 10000)
  }
    
    dayNnight(msDuration) {
      setInterval(() => {
        this.eventHandler.emit('tick', {city: this.name, event: "newday"});
      }, msDuration)
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
    
    generateFoodRand () {
      console.log('this rand in generate food rand');
      console.log(this);
      let x = this.rand.integer(0, this.width);
      let y = this.rand.integer(0, this.height);
      let idx = 0;
      while (idx < this.fGC) {
        if (this.foodOnGrid == this.maxGridFood) {break}
        if (!this.grid.column[x][y].getFood()) {
          this.grid.column[x][y].setFood(1);
          this.foodOnGrid++;
          this.gridFFC--;
          idx++;
        } else {
          x = this.rand.integer(0, this.width);
          y = this.rand.integer(0, this.height);
        }
      }
    }
    
    generateFoodFill () {
      let foodPlaced = 0;
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          if (!this.grid[x][y].getFood()) {
            this.grid[x][y].setFood(1);
            this.foodOnGrid++;
            foodPlaced++;
            if (foodPlaced = this.fGC) {return}
          }
        }
      }
    }
    
    freeFoodCells () {
      let freeFoodCells = 0;
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          // console.log('this machin', this.grid);
          if (!this.grid.column[x][y].getFood()) {
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
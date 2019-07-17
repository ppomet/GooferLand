Cell = require('../models/Cell');
Goofer = require('../models/Goofer');
Randomize = require('../models/Randomize');
debug = require('debug')('insideGrid');

class Grid {

  constructor(width, height) {

    if (Math.abs(width) !== width || Math.abs(height) !== height) {
      debug(`Grid constructor Width: ${width} Height: ${height}`)
      throw new Error(`the grid can\'t have negative sides width:${width} height:${height}`);
    }
    // if (Math.abs(foodGeneratingCells) !== foodGeneratingCells) {
    //   throw new Error(`Bad value for foodGeneratingCells >${foodGeneratingCells}<`);
    // }
    this.rand = null;
    this.width = width || 2;
    this.height = height || 2;
    this.freeFoodCells = this.width * this.height;
    this.fGC = Math.floor(this.width * this.height / 20);// def val = 5% des cells generent de la nourriture 
    this.myEventHandler = null;
    this.rowOfMap = Array(this.width).fill(null).map;
    // this.map = Array(this.height).fill(this.rowOfMap).map((elem, xIdx) => {
    //   elem.map((cell, yIdx) => {
    //     cell = new Cell(xIdx, yIdx, null);
    //   })
    // });
    this.mapArray = null;
    this.map = Array(this.height).fill(this.rowOfMap);

    for (let x = 0; x < this.height; x++) {// generation de la map;
      this.map[x] = Array(this.width).fill(null);
      for(let y = 0; y < this.width; y++){
        this.map[x][y] = new Cell(0, x, y);
      }
    }
    // let newGrid = grid(width, height).map((e,index2) => e.map((e,index1) => e = new Place(index2,index1,"nothing")));


    this.generateFoodRand = () => {
      let x = this.rand.integer(0, this.width);
      let y = this.rand.integer(0, this.height);
      let idx = 0;
      while (idx < this.fGC) {
        if (!this.freeFoodCells) {
          break;
        }
        if (!this.map[x][y].getFood()) {
          this.map[x][y].setFood(1);
          this.freeFoodCells--;
          idx++;
        } else {
          x = this.rand.integer(0, this.width);
          y = this.rand.integer(0, this.height);
        }
      }
      debug(`RAND food put on grid >${idx}<`);
      debug(`space left for food on the grid >${this.freeFoodCells}<`);
    }

    this.generateFoodFill = () => {
      let foodPlaced = 0;
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          if (!this.map[x][y].getFood()) {
            this.map[x][y].setFood(1);
            this.freeFoodCells--;
            foodPlaced++;
            if (!this.freeFoodCells || foodPlaced === this.fGC) {
              debug(`Fill food put on grid >${foodPlaced}<`);
              debug(`space left for food on the grid >${this.freeFoodCells}<`)
              return;
            } else {
              debug('No more place for food');
            }
          }
        }
      }
    };


    this.generateFood = () => {
      if (this.fGC < (this.width * this.height / 20) || this.freeFoodCells < this.fGC) {
        this.generateFoodFill();
      } else {
        this.generateFoodRand();
      }
    }
  }

  setEventHandler(EventHandlerRef) {
    this.myEventHandler = EventHandlerRef;
  }

  setRandomizer(RandomizerRef) {
    this.rand = RandomizerRef;
  }

  setfoodGeneratingCells(value) {
    this.fGC = value;
  }

  getCaseContent(x, y) {
    return this.map[x][y].getCellContent();
  }

  setCaseContent(x, y, goofer, food) {
    if (typeof x == "number" && typeof y == "number" && x >= 0 && y >= 0 && x < this.width && y < this.height) {
      (food ? this.map[x][y].food = food : this.map[x][y].food = 0);
      ((goofer && goofer instanceof Goofer) ? this.map[x][y].goofer = goofer : null);
    } else {
      debug(`is X ? ${!!x}`);
      debug(`is Y ? ${!!y}`);
      debug(`this.x ${this.width} this.y ${this.height}`);
      debug(`x: ${x} y: ${y}, food: ${food} goofer: ${goofer}`);
      throw new Error('un des parametres du setter de la grid est incorrect');
    }
  }

  isCellGooferPresent(x, y) {
    if ((Math.abs(x) + Math.abs(y) === x + y) && x < this.width && y < this.height) {
      return this.map[x][y].isGooferPresent();
    } else {
      let errMsg = `bad coordinates for isCellContainGoofer (x ${x},y ${y}) method`;
      throw new Error(errMsg);
    }
  }

  getGridContent() {
    let contentArray = []
    for (let _x = 0; _x < this.height; _x++) {
      for (let _y = 0; _y < this.width; _y++) {
        contentArray.push(this.map[_x][_y].getCellContent());
      }
    }
    ;
    return contentArray;
  }

  checkCoordinates(x, y) {
    if ((Math.abs(x) + Math.abs(y) === x + y) && x < this.width && y < this.height) {
      return true;
    }
    return false;
  }
}

module.exports = Grid;


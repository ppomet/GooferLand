Cell = require('../models/Cell');
Goofer = require('../models/Goofer');
Randomize = require('../models/Randomize');
debugLog = require('debug')('debugLog-RandFactory');
infoLog = require('debug')('info-RandFactory');
errorLog = require('debug')('error-RandFactory');

class Grid {

  constructor(width, height) {

    if (Math.abs(width) !== width || Math.abs(height) !== height) {
      errorLog(`Grid constructor Width: ${width} Height: ${height}`)
      throw new Error(`the grid can\'t have negative sides, width:${width} height:${height}`);
    }
    this.rand = null;
    this.width = width || 2;
    this.height = height || 2;
    this.freeFoodCells = this.width * this.height;
    this.fGC = Math.floor(this.width * this.height / 20);// def val = 5% des cells generent de la nourriture
    this.myEventHandler = null;
    this.rowOfMap = Array(this.width).fill(null);
    this.mapArray = Array(this.width * this.height).fill(null);
    this.GridMap = Array(this.height).fill(this.rowOfMap);

    for (let x = 0; x < this.height; x++) {// generation de la map avec insertion des cellules;
      this.GridMap[x] = Array(this.width).fill(null);
      for(let y = 0; y < this.width; y++){
        this.GridMap[x][y] = new Cell({x,y});
        this.mapArray[x*y] = this.GridMap[x][y];
      }
    }

    this.generateFoodRand = () => {
      let x = this.rand.integer(0, this.width);
      let y = this.rand.integer(0, this.height);
      let idx = 0;
      while (idx < this.fGC) {
        if (!this.freeFoodCells) {
          break;
        }
        if (!this.GridMap[x][y].getFood()) {
          this.GridMap[x][y].setFood(1);
          this.freeFoodCells--;
          idx++;
        } else {
          x = this.rand.integer(0, this.width);
          y = this.rand.integer(0, this.height);
        }
      }
      debugLog(`RAND food put on grid >${idx}<`);
      debugLog(`space left for food on the grid >${this.freeFoodCells}<`);
    };

    this.generateFoodFill = () => {
      let foodPlaced = 0;
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          if (!this.GridMap[x][y].getFood()) {
            this.GridMap[x][y].setFood(1);
            this.freeFoodCells--;
            foodPlaced++;
            if (!this.freeFoodCells || foodPlaced === this.fGC) {
              debugLog(`Fill food put on grid >${foodPlaced}<`);
              debugLog(`space left for food on the grid >${this.freeFoodCells}<`)
              return;
            } else {
              debugLog('No more place for food');
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

  setRandomizer(Randomizer) {
    this.rand = Randomizer;
  }

  setFoodGeneratingCells(value) {
    if (value > this.width * this.height) {
      this.fGC = this.height *this.width;
    } else {
      this.fGC = value;
    }
  }

  getCaseContent(x, y) {
    return this.GridMap[x][y].getCellContent();
  }

  setCaseContent(x, y, goofer, food) {
    if (typeof x == "number" && typeof y == "number" && x >= 0 && y >= 0 && x < this.width && y < this.height) {
      (food ? this.GridMap[x][y].food = food : this.GridMap[x][y].food = 0);
      ((goofer && goofer instanceof Goofer) ? this.GridMap[x][y].goofer = goofer : null);
    } else {
      debugLog(`is X ? ${!!x}`);
      debugLog(`is Y ? ${!!y}`);
      debugLog(`this.x ${this.width} this.y ${this.height}`);
      debugLog(`x: ${x} y: ${y}, food: ${food} goofer: ${goofer}`);
      throw new Error('un des parametres du setter de la grid est incorrect');
    }
  }

  isCellGooferPresent(x, y) {
    if ((Math.abs(x) + Math.abs(y) === x + y) && x < this.width && y < this.height) {
      return this.GridMap[x][y].isGooferPresent();
    } else {
      let errMsg = `bad coordinates for isCellContainGoofer (x ${x},y ${y}) method`;
      throw new Error(errMsg);
    }
  }

  getGridContent() {
    let contentArray = []
    for (let _x = 0; _x < this.height; _x++) {
      for (let _y = 0; _y < this.width; _y++) {
        contentArray.push(this.GridMap[_x][_y].getCellContent());
      }
    }
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


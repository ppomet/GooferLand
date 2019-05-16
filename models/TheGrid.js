CellContent = require('../models/CellContent');
Goofer = require('../models/Goofer');
Randomize = require('../models/Randomize');
debug = require('debug')('insideGrid');

class TheGrid {

  constructor(EventH, width, height, foodGeneratingCells) {

    if (Math.abs(width) !== width || Math.abs(height) !== height) {
      throw new Error(`the grid can\'t have negative sides width:${width} height:${height}`);
    }
    if (Math.abs(foodGeneratingCells) !== foodGeneratingCells) {
      throw new Error(`Bad value for foodGeneratingCells >${foodGeneratingCells}<`);
    }

    this.rand = new Randomize();
    this.width = width || 2;
    this.height = height || 2;
    this.freeFoodCells = this.width * this.height;
    this.fGC = foodGeneratingCells || Math.floor(this.width * this.height / 20);// def val = 5% des cells
    this.myEventHandler = EventH;
    this.column = Array(this.height).fill(null);

    this.sayWhatYouListened = () => {
      console.log(`TheGrid sayWhatYouListened >'tick'<`);
    };

    for (let x = 0; x < this.height; x++) {
      this.column[x] = Array(this.width).fill(null);
      for(let y = 0; y < this.width; y++){
        this.column[x][y] = new CellContent(0, x, y);
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
        if (!this.column[x][y].getFood()) {
          this.column[x][y].setFood(1);
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
          // debug(`turn ${(y+1) * (x+1)}`);
          if (!this.column[x][y].getFood()) {
            this.column[x][y].setFood(1);
            this.freeFoodCells--;
            foodPlaced++;
            if (!this.freeFoodCells) {
              // debug(`Foodfill`)
              debug(`Fill food put on grid >${foodPlaced}<`);
              debug(`space left for food on the grid >${this.freeFoodCells}<`)
              return;
            } else {
              debug('No more place for food');
            }
          }
        }
      }
    }

    this.setfoodGeneratingCells = (FGC) => {
      this.fGC = FGC || Math.floor(this.width * this.height / 20);
    }

  }

  generateFoodFillListen(EventToListen) {
    this.myEventHandler.on(EventToListen, this.generateFoodRand);
  }

  getCaseContent(x, y) {
    return this.column[x][y].getCellContent();
  }

  setCaseContent(x, y, food, goofer) {
    if (typeof x == "number" && typeof y == "number" && x >= 0 && y >= 0 && x < this.width && y < this.height)
    {
      (food ? this.column[x][y].food = food : this.column[x][y].food = 0);
      ((goofer && goofer instanceof Goofer) ? this.column[x][y].goofer = goofer : null);
    } else {
      debug(`is X ? ${!!x}`);
      debug(`is Y ? ${!!y}`);
      debug(`this.x ${this.width} this.y ${this.height}`);
      debug(`x: ${x} y: ${y}, food: ${food} goofer: ${goofer}`);
      throw new Error('un des parametres du setter de la grid est incorrect');
    }
  }

  isCellGooferPresent(x, y) {
    if ((Math.abs(x) + Math.abs(y) === x + y) && x < this.width && y < this.height)
    {
      return this.column[x][y].isGooferPresent();
    } else {
      let errMsg = `bad coordinates for isCellContainGoofer (x ${x},y ${y}) method`;
      throw new Error(errMsg);
    }
  }

  getGridContent() {
    for (let _x = 0; _x < this.height; _x++) {
      for (let _y = 0; _y < this.width; _y++) {
        this.column[_x][_y].getCellContent();
      }
    };
  }

  theGridSubscriber(eventFuncRef, eventToSubscribe) { // ('tick', (data) ={console.log(data)})
    eventFuncRef.on(eventToSubscribe, this.sayWhatYouListened);
  }

}

module.exports = TheGrid;
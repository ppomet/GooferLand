debug = require('debug')('insideCell');

class Cell {
  constructor(x, y, goofer, isFood) {
    (isFood ? this.food = 1 : this.food = 0);
    this.x = x;
    this.y = y;
    this.goofer = goofer;
  }

  isFoodOnCell() {
    return !!this.food;
  }

  getFood() {
    return this.food;
  }

  setFood(food) {
    if (Number.isInteger(food)) {
      this.food = food;
    } else {
      (food ? this.food = 1 : this.food = 0);
    }
  }

  getCoordinates() {
    return {x: this.x, y: this.y};
  }

  insertGoofer(goofer) {
    this.goofer = goofer;
  }

  getCellContent() {
    debug(`the Cell ${this.x} ${this.y} have: ${this.food} food`);
    (this.goofer ? debug(`and goofer ${this.goofer.name}`) : debug(`and no Goofer`));
    return {x: this.x, y: this.y, food: this.food, goofer: this.goofer};
  }

  isGooferPresent () {
    return !!this.goofer;
  }
}

module.exports = Cell;
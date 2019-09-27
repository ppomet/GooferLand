const debugLog = require('debug')('debug-Cell');
const infoLog = require('debug')('info-Cell');
const errorLog = require('debug')('error-Cell');
const conf = require('config');

class Cell {
  static sanOptions(options) {
    let sanOpt = {
      x: conf.Cell.x,
      y: conf.Cell.y,
      food: conf.Cell.food,
      gooferName: null,
    };
    if (options && (typeof options) === 'object') {
      if (options.hasOwnProperty('x')) {
        if (Number.isSafeInteger(options.x) || Math.abs(options.x) === options.x) {
          Object.assign(sanOpt, {x: options.x});
        } else {
          errorLog(`x Coordinate isn't positive or is out of Range >${options.x}< it is replaced by it's default value : ${conf.Cell.x}`);
        }
      }
      if (options.hasOwnProperty('y')) {
        if (Number.isSafeInteger(options.y) || Math.abs(options.y) === options.y) {
          Object.assign(sanOpt, {y: options.y});
        } else {
          errorLog(`y Coordinate isn't positive or is out of Range >${options.y}< it is replaced by it's default value : ${conf.Cell.y}`);
        }
      }
      if (options.hasOwnProperty('isFood')) {
        if (options.isFood) {
          Object.assign(sanOpt, {food: 1})
        } else {
          Object.assign(sanOpt, {food: 0})
        }
      }else if (options.hasOwnProperty('foodVal')) {
        if (Number.isSafeInteger(options.foodVal) && Math.abs(options.foodVal) === options.foodVal) {
          Object.assign(sanOpt, { food: options.foodVal });
        } else if (Number.isSafeInteger(options.foodVal) && options.foodVal <= 0) {
          Object.assign(sanOpt, { food: 0 });
        } else {
          errorLog(`foodValue option is out of range or of a bad type >${options.y}< it is replaced by it's default value : ${conf.Cell.y}`);
        }
      }
    }
    return sanOpt;
  }
  constructor(options) {
    const {x, y, food, gooferName} = Cell.sanOptions(options);
    this.food = food;
    this.x = x;
    this.y = y;
    this.gooferName = gooferName;
  }

  isFoodPresent() {
    return !!this.food;
  }

  getCloneCell() {
    return
}

  getFood() {
    return this.food;
  }

  setFood(food) {// can be an integer or a boolean
    if (Number.isInteger(food)) {
      if (food < 0) {
        this.food = 0;
      } else {
        this.food = food;
      }
    } else{
      (food ? this.food = 1 : this.food = 0);
    }
    return this;
  }

  updateFoodQuantity(changeQuantity) { /** @param {Number|Boolean} changeQuantity can be an integer or a boolean*/
    if (changeQuantity && Number.isSafeInteger(changeQuantity)) {
      return this.updateFoodInteger(changeQuantity);
    } else if (typeof changeQuantity === 'boolean') {
      return this.updateFoodBoolean(changeQuantity);
    } else {
      errorLog({x:this.x, y:this.y, food: this.food});
      throw new Error(`cant update food Quantity on the [x:${this.x}] [y:${this.y}] Cell`);
    }
  }

  updateFoodInteger(value) {
    if (this.food + value < 0) {
      errorLog(`cant update Food by integer`);
      errorLog({x:this.x, y:this.y, food: this.food});
      throw new Error(`tried to remove more food then was present on the {x:${this.x}y:${this.y}} Cell`);
    }
    this.food += value;
    return this;
  }

  updateFoodBoolean(value) {
    this.food = value ? 1 : 0;
    return this;
  }

  getCoordinates() {
    return {x: this.x, y: this.y};
  }

  setGoofer(gooferName) {
    this.gooferName = gooferName;
    return this;
  }

  getGooferName () {
    return this.gooferName;
  }

  getCellContent() {
    return {x: this.x, y: this.y, food: this.food, gooferName: this.gooferName};
  }

  isGooferPresent () {
    return !!this.gooferName;
  }
}

module.exports = Cell;

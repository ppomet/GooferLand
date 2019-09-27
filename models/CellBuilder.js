const debugLog = require('debug')('debug-Cell');
const infoLog = require('debug')('info-Cell');
const errorLog = require('debug')('error-Cell');
const conf = require('config');

class CellBuilder {
  static sanOptions(options) {
    let sanOpt = {
      x: conf.Cell.x,
      y: conf.Cell.y,
      isFood: conf.Cell.isFood,
      foodVal: conf.Cell.foodVal,
    };
    if (options && (typeof options) === 'object') {
      if (options.hasOwnProperty('x')) {Object.assign(sanOpt, { x: options.x })}
      if (options.hasOwnProperty('y')) {Object.assign(sanOpt, { y: options.y })}
      if (options.hasOwnProperty('isFood')) {Object.assign(sanOpt, { isFood: options.isFood })}
      if (options.hasOwnProperty('foodVal')) {Object.assign(sanOpt, { foodVal: options.foodVal })}
    }
    return sanOpt;
  }
  constructor(options) {
    const {x, y, isFood, foodVal} = options;
    // if (isFood === true) {
    //   this.food = 1;
    // } else if (foodVal && Number.isSafeInteger(foodVal) && foodVal > 0) {
    //   this.food = foodVal;
    // } else if (!isFood || foodVal === 0) {
    //   this.food = 0;
    // } else {
    //   errorLog({isFood, foodVal});
    //   throw new Error(`incorrect Food parameters at the construction of Cell`);
    // }
    // if (x === null || x === undefined || y === null || y === undefined) {
    //   debugLog({x,y});
    //   throw new Error('coordinate is missing in cell generation');
    // }
    // if (Math.abs(x) !== x || !Number.isSafeInteger(x) || Math.abs(y) !== y || !Number.isSafeInteger(y)) {
    //   debugLog({x,y});
    //   throw new Error(`coordinate have to be a positive Integer in cell generation: ${{x,y}}`);
    // }
    this.x = x;
    this.y = y;
    this.food = null;
    this.gooferName = null;
  }

  isFoodPresent() {
    return !!this.food;
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

  updateFoodQuantity(changeQuantity) { // can be an integer or a boolean
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
      errorLog({x:this.x, y:this.y, food: this.food});
      throw new Error(`tried to remove more food then was present on the {x:${this.x}y:${this.y}} Cell`);
    }
    this.food += value;
    return this;
  }

  updateFoodBoolean(value) {
    this.food = value;
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
    debugLog(`the Cell ${this.x} ${this.y} have: ${this.food} food`);
    (this.gooferName ? debugLog(`and goofer ${this.gooferName}`) : debugLog(`and no Goofer`));
    return {x: this.x, y: this.y, food: this.food, gooferName: this.gooferName};
  }

  isGooferPresent () {
    return !!this.gooferName;
  }
}

module.exports = CellBuilder;

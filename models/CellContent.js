class CellContent {
  constructor(food, x, y, goofer) {
    if (!Number.isInteger(food) || food < 0 || food > 1) {
      const errmsg = "erreur de quantité de nouriture >" + food + "<";
      throw new Error(errmsg);
    }
    this.food = food;
    this.x = x;
    this.y = y;
    this.goofer = goofer;
  }

  getFood() {
    return this.food;
  }

  setFood(food) {
    if (!Number.isInteger(food) || food < 0 || food > 1) {
      const errmsg = "erreur de quantité de nouriture >" + food + "<";
      throw new Error(errmsg);
    }
    this.food = food;
  }

  getCoordinates() {
    return {x: this.x, y: this.y};
  }

  getCellContent() {
    console.log(`the Cell ${this.x} ${this.y} have:`);
    console.log(`${this.food} food`);
    (this.goofer ? console.log(`and goofer ${this.goofer.name}`) : console.log(`No Goofer`));
    console.log('');
    return {x: this.x, y: this.y, food: this.food, goofer: this.goofer};
  }

  isGooferPresent () {
    return !!this.goofer;
  }

}

module.exports = CellContent;
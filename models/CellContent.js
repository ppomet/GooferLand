class CellContent {
  constructor(food, x, y) {
    if (!Number.isInteger(food) || food < 0 || food > 1) {
      const errmsg = "erreur de quantité de nouriture >" + food + "<";
      throw new Error(errmsg);
    }
    this.food = food;
    this.x = x;
    this.y = y;
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

}

module.exports = CellContent;
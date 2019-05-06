CellContent = require('../models/CellContent');
Goofer = require('../models/GooferClass');

class TheGrid {
  constructor(width, height, eventH) {
    if (height < 0 || width < 0) {
      throw new Error('the grid can\'t have negative side');
    }
    this.width = width || 1;
    this.height = height || 1;
    this.myEventHandler = eventH;// security
    this.column = Array(this.height).fill(null);
    this.cb1 = (data) => {
      console.log(`TheGrid cb1 ${data}`);
    };
    for (let x = 0; x < this.height; x++) {
      this.column[x] = Array(this.width).fill(null);
      for(let y = 0; y < this.width; y++){
        this.column[x][y] = new CellContent(0, x, y);
      }
    }    
  }

  getCaseContent(x, y) {
    return this.column[x][y].getCellContent();
  }

  setCaseContent(x, y, food, goofer) {
    if (x && y && x > 0 && y > 0 && x <= this.x && y <= this.y)
    {
      (food ? this.column[x][y].food = food : this.column[x][y].food = 0);
      ((goofer && goofer instanceof Goofer) ? this.column[x][y].goofer = goofer : null);
    } else {
      throw new Error('un des parametres du setter de la grid est incorrect');
    }
  }

  isCellGooferPresent (x, y) {
    if (x && y && x > 0 && y > 0 && x <= this.x && y <= this.y)
    {
      return this.column[x][y].isGooferPresent();
    } else {
      let errMsg = `bad coordinates for is cellContain goofer (x ${x},y ${y}) method`;
      throw new Error(errMsg)
    }
  }

  getGridContent () {
    for (let _x = 0; _x < this.height; _x++) {
      for (let _y = 0; _y < this.width; _y++) {
        this.column[_x][_y].getCellContent();
      }
    };
  }

  theGridlisten(eventHandler, eventToListen, cb) {
    eventHandler.on(eventToListen, cb);
    this.myEventHandler.on(eventToListen, cb);
  }

  cb2 (data) {
    console.log(`TheGrid cb2 ${data}`);
  }

}

// for (let i = 0; i < this.height; i++) { // y'a t'il moyen de faire les assignation du cell content sans passer par des boucles explicites ?
    //   this.column[i] = Array(this.width).fill(new CellContent(0, i, 0));
    // }

module.exports = TheGrid;
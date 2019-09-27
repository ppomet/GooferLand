const Cell = require('../models/Cell');
const Randomizer = require('../models/Randomize');
const randomizer = new Randomizer();
const tools = require('./testTools');
const log = tools.Logger('Cell');
const Rando = require('../models/Randomize');
const rando = new Rando({bob: "is my name"});

tCell = (iterations) => {
  let countError = 0;
  // const StringifiedDefaultCell =
  console.log();
  tools.blabla.debut(log.info, 'Cell');
  console.log();

  let testdefalutCell = new Cell({});
  log.debug(testdefalutCell);

  for (let idx = 0; idx < 150; idx++) {
    let coordCell = null;
    let coords = {
      x: rando.integer(0, 800) * ((rando.integer(1,3) % 2)? -1: 1),
      y: rando.integer(0, 800) * ((rando.integer(1,3) % 2)? -1: 1)
    };
    let food = rando.integer();
    try {
      coordCell = new Cell();
      myCellFactory = new CellFactory({options});
      myNewCell = myCellFactory();
      coordCell.getCellContent();
    } catch (e) {
      if (e.message) {console.log(e.message)}
    }
    log.debug(coordCell);
  }



  console.log(JSON.stringify(testdefalutCell));
  console.log();

  console.log();
};


module.exports = tCell;

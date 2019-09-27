const tools = require('./testTools');
const log = tools.Logger('Randomize');
const Randomize = require('../models/Randomize');

const tRandomize = (iterations) => {
  iterations = tools.secureIterationsNumber(iterations);
  console.log();
  tools.blabla.debut(log.info,'Randomize');
  console.log();
  let errorCount = 0;
  const rand = new Randomize();
  let min = 0;
  let arrayToRand = ["a", "b", "c", "d", "e", "f", "g"];
  let initialArrayCopy = arrayToRand.slice();
  for (let idx = 0; idx < iterations; idx++) {
    log.debug(tools.colorTxt.blu(`rand int (randmin = ${min}) (randmax = ${idx}) :`), rand.integer(min, idx));
  }
  log.debug(tools.colorTxt.cya(`arrayToRandomize initial S=> ${arrayToRand}`));
  log.debug(tools.colorTxt.mag(`array randomized => ${rand.array(arrayToRand)}`));
  log.debug(tools.colorTxt.cya(`arrayToRandomize final S=> ${arrayToRand}`));
  if(JSON.stringify(arrayToRand) === JSON.stringify(initialArrayCopy)) {
    log.debug(tools.colorTxt.gre('initial array has not mutated'));
  } else {
    log.debug(tools.colorTxt.red('initial array has mutated'));
    errorCount++;
  }


  console.log();
  tools.blabla.fin(log.info,'Randomize' + tools.errTexter(errorCount));
  console.log();
};

module.exports = tRandomize;

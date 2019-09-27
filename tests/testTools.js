const colors = require('colors');
const debug = require('debug');
const conf = require('config');
const chance = require('chance').Chance();

const errTexter = (count) => {
  return (count) ? ` avec ${count} erreurs.` : `.`;
};

const displayConfig = () => {
  console.log({ conf })
};

const blabla = {
    debut: (logger, name) => (logger(`debut des tests de ${name}`)),
    fin: (logger, name) => (logger(`fin des tests de ${name}`)),
};

const Logger = (logName) => {
  return {
    debug: debug(`debug-test-${logName}`),
    info: debug(`info-test-${logName}`),
    error: debug(`error-test-${logName}`),
  }
};

const nameGenerator = (gender) => {
  let myGender = null;
  if (typeof gender === 'string') {
    if (gender.toLocaleLowerCase() === 'female' || gender.toLocaleLowerCase() === 'male') {
      myGender = gender.toLocaleLowerCase();
    }
  } else if (typeof gender === 'boolean') {
    if (gender) {
      myGender = 'male';
    } else {
      myGender = 'female';
    }
  } else {
    myGender = (Math.floor(Math.random() * 10) % 2)? 'male': 'female';
  }
  return chance.name({gender: myGender, prefix: true, middle: true});

};

const colorTxt = {
  red: (coloredTxt) => {return colors.red(coloredTxt)},
  gre: (coloredTxt) => {return colors.green(coloredTxt)},
  yel: (coloredTxt) => {return colors.yellow(coloredTxt)},
  blu: (coloredTxt) => {return colors.blue(coloredTxt)},
  mag: (coloredTxt) => {return colors.magenta(coloredTxt)},
  cya: (coloredTxt) => {return colors.cyan(coloredTxt)},
  rai: (coloredTxt) => {return colors.rainbow(coloredTxt)},
  zeb: (coloredTxt) => {return colors.zebra(coloredTxt)},
  tra: (coloredTxt) => {return colors.trap(coloredTxt)},
  ran: (coloredTxt) => {return colors.random(coloredTxt)},
  Merica: (coloredTxt) => {return colors.america(coloredTxt)},
};

const secureIterationsNumber =  (iterations) => {
  if (Math.abs(iterations) !== iterations) {
    return 1;
  } else if (iterations > 25) {
    return 25;
  }
  return iterations;
};

module.exports = {
  secureIterationsNumber,
  colorTxt,
  Logger,
  errTexter,
  blabla,
  displayConfig,
  nameGenerator,
};


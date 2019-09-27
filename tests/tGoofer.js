const tools = require('./testTools');
const log = tools.Logger('Goofer');
const Goofer = require('../models/Goofer.js');
const EventHandler = require('events');
const chance = require('chance').Chance();

const tGoofer = (iterations) => {
  iterations = tools.secureIterationsNumber(iterations);
  console.log();
  tools.blabla.debut(log.info, 'Goofer');
  console.log();

  let localEventHandler = new EventHandler();
  let gooferArray = [];

  localEventHandler.on("Dying Goofer", (name) => {
    gooferArray = gooferArray.filter((item) => {
      debugLog({itemName: item.name, LookedName: name});
      if (item.name === name) {
        item.displayStory();
        item.displayLastDay();
      }
      return  item.name !== name;
    })
  });

  for (let idx = 0; idx < iterations; idx++) {
    let gooferGender = ((idx + idx + 1)% 3) ? 'female' : 'male';
    const nameOpts = {nationality: 'fr', gender: gooferGender, middle: true};
    // let myGoofer = new Goofer(chance.name(nameOpts) , ["A", "B", "C", "D", "E", "F"], myGooferEventhandler, gooferGender === 'male', idx);
    let myGoofer = new Goofer(chance.name(nameOpts), localEventHandler, ["A", "B", "C", "D", "E", "F"], {isMale: gooferGender === 'male', age: idx});
    if (myGoofer) {
      log.debug(tools.colorTxt.yel(`creation of a goofer ok: ${JSON.stringify(myGoofer)}`));
      // if (myGoofer.getHalfGenome) {
      //   Goodebug(gre('getHalfGenome exist in Goofer'));
      // } else {
      //   throw new Error("goofer is lacking the method getHalfGenome");
      // }
      // if(myGoofer.happyBirthday) {
      //   Goodebug(gre('happyBirthday method exist in Goofer'));
      //   for(let i = 0; i < 27; i++) {
      //     myGoofer.happyBirthday();
      //     if (i === 0 || i === 5 || i === 10 || i === 25){
      //       Goodebug(gre(`halfgenome of ${myGoofer.name} age ${myGoofer.age} => [${myGoofer.getHalfGenome()}]`));
      //     }
      //   }
      //   myGoofer.age = 0;
      // } else {
      //   throw new Error('the goofer is lacking the HappyBirthday Method');
      // }
      if(myGoofer.lifeCycle) {
        log.debug(tools.colorTxt.gre('lifeCycle method exist in Goofer'));
        myGoofer.lifeCycle();
      }
    }
    gooferArray.push(myGoofer);
  }
  // for (let idx = 0; idx < 90; idx++) {
  //   // console.log("for idx = ", idx);
  //   Goodebug(cya(`array de viellesse length: ${gooferArray.length}`));
  //   Goodebug(gooferArray.map((item) => {
  //     item.happyBirthday();
  //     return item.name + ' age: ' + item.age
  //   }));
  //   if (gooferArray.length === 0) {
  //     Goodebug(blu("no more goofers in the array"));
  //     break;
  //   }
  // }



  console.log();
  tools.blabla.fin(log.info, 'Goofer');
  console.log();
};

module.exports = tGoofer;

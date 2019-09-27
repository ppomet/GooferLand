Goofer = require('../models/Goofer');
Genomics = require('../models/Genomics');
chance = require('chance').Chance();
Randomize = require('../models/Randomize');
debugLog = require('debug')('debug-RandFactory');
infoLog = require('debug')('info-RandFactory');
errorLog = require('debug')('error-RandFactory');

class RandFactory {

  constructor(genePoolSize, genesLength, isMutable) {
    this.rand = new Randomize();
    this.MyGenomics = new Genomics(false, isMutable, genePoolSize, genesLength);
    debugLog(`randfactory genepool => ${this.MyGenomics.genePool}`);
  }

  defineGender(isMale) {
    if (typeof isMale == "undefined") {
      this.gender = (this.rand.integer(0, 101) > 57);
    } else {
      this.gender = isMale;
    }
    debugLog({RandFactoryDefineGender: this.gender});
  }

  createGoofer(eventHandler, isMale) {
    this.defineGender(isMale);
    debugLog(`is eventHandler instance of Events >${eventHandler instanceof require('events')}<`);
    let goofer = new Goofer(
      chance.name({nationality: 'it', gender: this.gender ? 'male': 'female'}) + ' RD',
      eventHandler,
      this.MyGenomics.getRandGenePool(),
      {
        age: this.rand.integer(0, 5),
        oldAge: this.rand.integer(5, 7),
        maxAge: this.rand.integer(7, 9),
        isMale: this.gender
      }

    );
    debugLog({generatedGoofer: goofer});
    return (goofer);
  }

  createGooferNB (eventHandler, gooferNb, isMale) {
    if (!gooferNb || !(Math.abs(gooferNb) === gooferNb)) {
      gooferNb = 10;
    }
    const gooferBox = Array(gooferNb).fill(null);
    for (let idx = 0; idx < gooferNb; idx++) {
        this.defineGender(isMale);
        gooferBox[idx] = this.createGoofer(this.gender, eventHandler);
      }
    return gooferBox;
  }
}
module.exports = RandFactory;

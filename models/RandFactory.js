Goofer = require('../models/Goofer');
Genomics = require('../models/Genomics');
Faker = require('faker/locale/fr');
Randomize = require('../models/Randomize');

class RandFactory {
  constructor(genePoolSize, genesLength, isMutable) {
      this.rand = new Randomize();
      this.MyGenomics = new Genomics(false, isMutable, genePoolSize, genesLength);
      // console.log(`randfactory genepool => ${this.MyGenomics.genePool}`);
  }
  
  createGoofer(eventHandler, isMale) {
    let gender;
    if (typeof isMale == "undefined") {
      gender = !!(this.rand.integer(0, 101) > 57);
    } else {
      gender = isMale;
    }
    let goofer = new Goofer(
      `${Faker.name.firstName()} RD`,  
      this.rand.integer(0, 26),
      this.MyGenomics.getRandGenePool(),
      gender,
      eventHandler
    );
      return (goofer);
    }
    
    createNbGoofers (eventHandler, numberOfGoofers, isMale) {
      if (numberOfGoofers &&
        typeof(numberOfGoofers) === "number" &&
        numberOfGoofers > 0) {
          const GooferList = Array(numberOfGoofers).fill(null);
          for (let idx = 0; idx < numberOfGoofers; idx++) {
            if (isMale === undefined) {
              GooferList[idx] = this.createGoofer( !!(idx%2), eventHandler);
            } else {
              GooferList[idx] = this.createGoofer(isMale, eventHandler);
            }
          }
          return GooferList;
        } else {
          return null;
        }
        
      }
}
module.exports = RandFactory;

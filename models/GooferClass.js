EventEmitter = require('events');
Randomize = require('../models/Randomize');

class Goofer {
    constructor(name, age, genome, isMale = false, events){
        this.name = name;
        this.age = age;
        this.genome = genome;
        this.isMale = isMale;
        this.events = events;
        this.rand = new Randomize();
        this.cb1 = (data) => {
          console.log(`goofer cb1 ${data}`);
        };
    }
    getHalfGenome() {
        if (this.age < 5) {
            console.log('the goofer', this.name,'is still juvenile');
            return [];
        } else if (this.age > 25) {
            console.log('the goofer', this.name,'is too old and is sterile');
            return [];
        } else if (this.isMale) {
          console.log(`the goofer ${this.name} give you some white jelly <3`);
        } else {
          console.log(`the goofette ${this.name} layed an egg`);
        }
        return this.rand.array(this.genome).slice(0 , Math.ceil(this.genome.length / 2) );
        // let jdx = 0;
        // let temp = null;
        // let tempgenomics = this.genome.slice();
        // for (let idx = 0; idx < this.genome.length; idx++){
        //     jdx = Math.floor(Math.random() * (idx + 1));
        //     temp = tempgenomics[idx];
        //     tempgenomics[idx] = tempgenomics[jdx];
        //     tempgenomics[jdx] = temp;
        // }
        // return tempgenomics.slice(0 , Math.ceil(this.genome.length / 2) );
    }
    happyBirthday() {
      this.age++;
      console.log(`the goofer ${this.name} celebrated his ${this.age}th birthday.`)
      if(this.age > 25) {// metre en place un methode de destruction de l'instance de la classe en cas d'age avancé 
        console.log(`and may die of old age any minute now`);
        
      }
    }

    gooferHearing () {
      // ici je dois listen des trucs ... je crois ...
    }

    addGooferlistener (thingToListen) {
      this.events.on(thingToListen, )
    }

    gooferEmitter(msg) {
      // Object.assign(this, {eventEmitter: new EventEmitter()});// j'ai le droit de faire ca ?
      console.log(`the goofer ${this.name} said ${msg}`);
      return msg;
    }

    cb2 (data) {
      console.log(`goofer cb2 ${data}`);
    };
    
}

module.exports = Goofer;
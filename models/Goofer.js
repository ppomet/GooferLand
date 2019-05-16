debug = require('debug')('insideGoofer');

EventEmitter = require('events');
Randomize = require('../models/Randomize');
Citizen = require('./Citizen');

class Goofer extends Citizen {
    constructor(name, age, genome, isMale = false, events){
        super(name, events);
        this.age = age;
        this.genome = genome;
        this.isMale = isMale;
        this.rand = new Randomize();
        this.cb1 = (data) => {
          debug(`goofer cb1 ${JSON.stringify(data)}`);
        };
    }

    getHalfGenome() {
        if (this.age < 5) {
            debug('the goofer', this.name,'is still juvenile');
            return [];
        } else if (this.age > 25) {
            debug('the goofer', this.name,'is too old and is sterile');
            return [];
        } else if (this.isMale) {
          debug(`the goofer ${this.name} give you some white jelly <3`);
        } else {
          debug(`the goofette ${this.name} layed an egg`);
        }
        return this.rand.array(this.genome).slice(0 , Math.ceil(this.genome.length / 2) );
    }
    happyBirthday() {
      this.age++;
      debug(`the goofer ${this.name} celebrated his ${this.age}th birthday.`)
      if(this.age > 25) {// metre en place un methode de destruction de l'instance de la classe en cas d'age avancé 
        debug(`and may die of old age any minute now`);
        
      }
    }

    gooferHearing () {
      // ici je dois listen des trucs ... je crois ...
    }

    setPos(x, y) {

    }

    addGooferListener (thingToListen, events) {
      
      events.on(thingToListen, this.cb1);
    }

    gooferEmitter(msg) {
      // Object.assign(this, {eventEmitter: new EventEmitter()});// j'ai le droit de faire ca ?
      debug(`the goofer ${this.name} said ${msg}`);
      return msg;
    }

    cb2 (data) {
      debug(`goofer cb2 ${data}`);
    };

    move() {
      debug("gooffer is moving");
    }
    
}

module.exports = Goofer;
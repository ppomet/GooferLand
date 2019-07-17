debug = require('debug')('insideGoofer');
EventEmitter = require('events');
Randomize = require('../models/Randomize');
Citizen = require('./Citizen');

class Goofer {
  constructor(name, genome, eventHandler, isMale = false, age = 0){
    if (!genome || (genome.length % 2)) {
      console.log(genome);
      throw new Error('Genome error at goofer construction');}
    this.genome = genome;
    if (!name || !(typeof name === 'string')) {throw new Error('bad naming of the goofer');}
    this.name = name;
    if (!eventHandler || !(eventHandler instanceof EventEmitter)) {
      throw new Error('tried to construct a Goofer without an Event Handler');
    }
    this.myEventHandler = eventHandler;
    this.isMale = isMale;
    this.age = age;
    this.adultAge = 5;
    this.oldAge = 25;
    this.maxAge = 40;
    this.foodStock = 0;
    this.position = {x: 0, y:0};
    this.rand = new Randomize();

    this.subscriptions = {};

  }

  lifeCycle() {
    this.awakens()
        .wantToEat()
        .wantToReproduce()
        .move()
        .goesToBed();
    return this;
  }

  consumeFood() {
    if (this.foodStock > 0) {
      debug(`${this.name}: "Nomnomnom"`);
    } else {
      debug(`${this.name}: "I'm Hungry"`);
    }
    this.foodStock--;
    if (this.foodStock < 0) {
      debug(`${this.name} is Famished`);
      if (this.foodStock < -2) {
        this.myEventHandler.emit("Dying Goofer", this);
      }
    }
  }

  getHalfGenome() {
    if (this.age < this.adultAge) {
      debug('the goofer', this.name,'is still juvenile');
      return [];
    } else if (this.age > this.oldAge) {
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
    debug(`the goofer ${this.name} celebrated his ${this.age}th birthday.`);
    if(this.age > this.oldAge) {
      debug(`and may die of old age any minute now`);
      if (this.rand.integer(this.oldAge, this.maxAge) < this.age) {
        // debug(`test goofer senility ${this.age} <>${this.rand.integer(this.oldAge, this.maxAge)}<>`);
        this.myEventHandler.emit("Dying Goofer", this.name);
      }
    }
  }

  setPos(x, y) {
    if (Math.abs(x) === x && Math.abs(y) === y) {
      this.position = {x, y};
    } else {
      throw new Error('X and Y are to be Numbers');
    }
    return this;
  }

  move() {
    debug(`goofer ${this.name} activated the moving method`);
    this.myEventHandler.on("Goofers Moving", () => {console.log(`the goofer ${this.name} is moving`)});
    return this;
  }

  awakens() {
    this.myEventHandler.on('newDay', () => console.log(`the Goofer ${this.name} is awakening`));
    return this;
  }

  goesToBed() {
    this.myEventHandler.on('newNight', () => console.log(`the Goofer ${this.name} is going to bed`));
    this.happyBirthday();
    return this;
  }

  wantToEat() {
    return this;
  }

  wantToReproduce() {
    return this;
  }

  lookForFood() {
    // here i have to make a little algorithm to look if food is available in adjacent cases
    return this;
  }

}

module.exports = Goofer;

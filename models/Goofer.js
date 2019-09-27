const EventEmitter = require('events');
const Randomize = require('../models/Randomize');
const debugLog = require('debug')('debug-Goofer');
const infoLog = require('debug')('info-Goofer');
const errorLog = require('debug')('error-Goofer');

// TODO: may add a conf file for defaults


class Goofer {

  static sanGooferOptions (options) {
    let sanOpt = {};
    if (!options.isMale) {
      Object.assign(sanOpt, {isMale: false});
    } else {
      Object.assign(sanOpt, {isMale: true});
    }

    if (!options.age || !Number.isSafeInteger(options.age) || options.age < 0) {
      Object.assign(sanOpt, {age: 0});
    } else {
      Object.assign(sanOpt, {age: options.age});
    }

    if (!options.adultAge || !Number.isSafeInteger(options.adultAge) || options.adultAge < 5) {
      Object.assign(sanOpt, {adultAge: 5});
    } else {
      Object.assign(sanOpt, {adultAge: options.adultAge});
    }

    if (!options.oldAge || !Number.isSafeInteger(options.oldAge) || options.oldAge < (sanOpt.adultAge + Math.ceil(sanOpt.adultAge / 5)) ) {
      Object.assign(sanOpt, {oldAge: sanOpt.adultAge + Math.ceil(sanOpt.adultAge / 5)});
    } else {
      Object.assign(sanOpt, {oldAge: options.oldAge});
    }

    if (!options.maxAge || !Number.isSafeInteger(options.maxAge) || options.maxAge < (sanOpt.oldAge + Math.ceil(sanOpt.oldAge / 5)) ) {
      Object.assign(sanOpt, {maxAge: sanOpt.oldAge + Math.ceil(sanOpt.oldAge / 5)});
    } else {
      Object.assign(sanOpt, {maxAge: options.maxAge});
    }

    if (!options.foodStock || !Number.isSafeInteger(options.foodStock) || options.age < 0) {
      Object.assign(sanOpt, {foodStock: 0});
    } else {
      Object.assign(sanOpt, {foodStock: options.foodStock});
    }
    return sanOpt;
  };
  constructor(name, genome, options) {
    const { age, adultAge, oldAge, maxAge, foodStock, isMale } = Goofer.sanGooferOptions(options);
    if (!genome || genome.length % 2) { // possibilité d'integrer des bugs genetiques ici
      throw new Error('Genome error at goofer construction');
    }
    this.genome = genome;
    if (!name || !(typeof name === 'string')) {throw new Error('bad naming of the goofer');}
    this.name = name;
    // if (!eventHandler || !(eventHandler instanceof EventEmitter)) {
    //   throw new Error('tried to construct a Goofer without an Event Handler');
    // }
    this.myEventHandler = null;
    this.isMale = isMale;
    this.age = age;
    this.adultAge = adultAge;
    this.oldAge = oldAge;
    this.maxAge = maxAge;
    this.foodStock = foodStock;
    // this.position = {x: 0, y:0};
    // this.rand = new Randomize();

    this.subscriptions = {};
    this.story = [];

  }

  setEventHandler(eventHandler) {
    this.myEventHandler = eventHandler;
  };

  lifeCycle() {
    debugLog(`Goofer ${this.name} lifecycle launched`);
    this.awakens()
        .wantToEat()
        .wantToReproduce()
        .move()
        .goesToBed();
    return this;
  }

  storyLog(msg) {
    debugLog('storyLog: ' + msg);
    this.story.unshift(msg);
  }

  displayStory() {
    debugLog({Name: this.name, StoryLength: this.story.length});
    console.log(`Story of Goofer ${this.name} :`);
    for (let idx = this.story.length - 1; idx >= 0; idx--) {
      console.log(`${idx} : ${this.story[idx]}`);
    }
  }

  displayLastDay() {
    debugLog({Name: this.name, StoryLength: this.story.length});
    console.log(`Last day of Goofer ${this.name} :`);
    let index = this.story.findIndex((elem) =>{
      return elem === 'newDay';
    });
    if ( index === -1 ) {
      console.log(`Goofer ${this.name} has no story`);
    } else {
      for (let idx = index; idx >= 0; idx--) {
        console.log(`${idx} : ${this.story[idx]}`);
      }
    }
  }

  dying() {
    this.myEventHandler.emit("Dying Goofer", this.name);
    // ou alors cést le moment ou il unsubscribe de ses diferents eventss handlers

  }

  unSubscriber() {
    // ??
  }


  consumeFood() {
    if (this.foodStock > 0) {
      this.storyLog(`${this.name}: "Nomnomnom"`);
    } else {
      this.storyLog(`${this.name}: "I'm Hungry"`);
    }
    this.foodStock--;
    if (this.foodStock < 0) {
      this.storyLog(`${this.name} is Famished`);
      if (this.foodStock < -2) {this.dying();}
    }
    return this;
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
    return this.rand.array(this.genome).slice(0 , this.genome.length / 2);
  }// Todo: storyLog

  happyBirthday() {
    this.age++;
    this.storyLog(`the goofer ${this.name} celebrated a new birthday (new age: ${this.age})`);
    if(this.age > this.oldAge) {
      this.storyLog(`and may die of old age any minute now`);
      let tooOld = this.rand.integer(this.oldAge, this.maxAge + 1);
      if ( tooOld >= this.age) {
        debugLog(`test goofer senility age: ${this.age} <>${tooOld}<>`);
        this.dying();
      }
    }
    return this;
  }

  // setPos(x, y) {
  //   if (Math.abs(x) === x && Math.abs(y) === y) {
  //     this.position = {x, y};
  //   } else {
  //     throw new Error('X and Y are to be Numbers');
  //   }
  //   return this;
  // }

  move() {
    debug(`goofer ${this.name} activated the moving method`);
    this.myEventHandler.on("Goofers Moving", () => {console.log(`the goofer ${this.name} is moving`)});
    return this;
  }

  awakens() {
    this.myEventHandler.on('newDay', () => {
      this.storyLog(`newDay`);
      this.happyBirthday();
      this.storyLog(`the Goofer ${this.name} is awakening`);
    });
    return this;
  }

  goesToBed() {
    this.myEventHandler.on('newNight', () => {
      this.storyLog(`the Goofer ${this.name} is going to bed`)
      this.displayLastDay();
      // this.displayStory();
    });

    return this;
  }

  wantToEat() {
    this.myEventHandler.on('Time to Eat', () => {
      this.storyLog(`${this.name} is hungry`);
    } );
    return this;
  }

  wantToReproduce() {
    this.myEventHandler.on('Time to Shag', () => {
      this.storyLog(`${this.name} is looking for a mate`);
    } );
    return this;
  }

  lookForFood() {
    // here i have to make a little algorithm to look if food is available in adjacent cases
    return this;
  }

}

module.exports = Goofer;

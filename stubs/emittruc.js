                                                                                       EventEmitter = require('events');


class TheEmmiTTTER {
    constructor(name) {
        this.eventemitterName = name;
        this.EE = new EventEmitter();
    }

    sayStuff(stuff) {
        console.log();
        console.log('--------------');
        console.log(`l'emetteur ${this.eventemitterName} a dit :'${stuff}'`);
        console.log('--------------');
        console.log();
        this.EE.emit(stuff);
    }

    getThis() {
        console.log(this);
    }
}









class Listener {

    constructor(EventEmitterRef, name) {
        this.myEventEmiter = EventEmitterRef;
        this.myname = name;
    }

    thingToSay(thing) {
        this.myEventEmiter.emit(thing, console.log);
    }

    listen (thingToListen) {


        console.log(`<S><S><S><S><S><S><S><S>  ici ${this.myname} a souscrit a l'evenement >'${thingToListen}'< <S><S><S><S><S><S><S><S>`);



        this.myEventEmiter.on(thingToListen, () => {
            // console.log('||||||||||||||||||||||||||||||||');
            console.log();
            console.log(`${this.myname} listened ('${thingToListen}')`);
            // console.log('()()()()()()()()()()()()()()()()');
            console.log(`et ${this.myname} a transformé :${thingToListen.toUpperCase()}`);
            console.log('ici on est :');
            console.log(this);
            console.log('++++++++++++++++++++++++++++');
            this.thingToSay(thingToListen.toUpperCase());
        })
    }
}



const trucquiemetBrown = new TheEmmiTTTER('EmmetBrown');
const trucquiemetWhite = new TheEmmiTTTER('EmmetWhite');
const trucquiecoute1 = new Listener(trucquiemetBrown.EE, 'BadiBadu');
const trucquiecoute2 = new Listener(trucquiemetWhite.EE, 'XARATOR LE TUEUR');

for (let idx = 0; idx < 3; idx++) {
    trucquiemetWhite.sayStuff('des choses');
}

trucquiecoute2.listen('des choses');
trucquiecoute1.listen('des choses');
trucquiecoute1.listen('bob');
trucquiecoute1.listen('źbeb');
trucquiecoute2.listen('źGeg');


for (let idx = 0; idx < 3; idx++) {
    trucquiemetBrown.sayStuff('des choses');
}

for (let idx = 0; idx < 3; idx++) {
    trucquiemetBrown.sayStuff('bob');
}


for (let idx = 0; idx < 3; idx++) {
    trucquiemetWhite.sayStuff('bob');
}


trucquiemetBrown.getThis();
trucquiemetWhite.getThis();

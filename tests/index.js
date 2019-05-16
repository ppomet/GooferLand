debug = require('debug');
Testdebug = debug('tests');
Rdebug = debug('testRandomize');
Goodebug = debug('testGoofer');
Gndebug = debug('testGenomics');
Factdebug = debug('testFact');
RDFdebug = debug('testRDFact');
Listdebug = debug('testList');





// debugtest = debug('test');

colors = require('colors');

const red = (txt) => {return colors.red(txt)};
const gre = (txt) => {return colors.green(txt)};
const yel = (txt) => {return colors.yellow(txt)};
const blu = (txt) => {return colors.blue(txt)};
const mag = (txt) => {return colors.magenta(txt)};
const cya = (txt) => {return colors.cyan(txt)};
const rai = (txt) => {return colors.rainbow(txt)};
const zeb = (txt) => {return colors.zebra(txt)};
const tra = (txt) => {return colors.trap(txt)};
const ran = (txt) => {return colors.random(txt)};
const Merica = (txt) => {return colors.america(txt)};

Randomize = require('../models/Randomize');
Goofer = require('../models/Goofer');
Genomics = require('../models/Genomics');
GooferFactory = require('../GooferFactory');
RandFactory = require('../models/RandFactory')
GooferGenerator = require('../GooferGenerator');
CellContent = require('../models/CellContent');
CityGrid = require('../models/TheGrid');
City = require('../models/City');
Faker = require('faker/locale/fr');
HF = require('./headerFooter')

const myRand = new Randomize();
const myRandFacto = new RandFactory(6, 3);
// const myHF = new HF('<>', 8, 1, true);

function secureIteration (iterations) {
  if (!(Math.abs(iterations) === iterations)) {
    return 1;
  } else if (iterations > 25) {
    return 25;
  }
  return iterations;
}

tests = () => {
  console.log();
  Testdebug(`${red('----')} ${gre('Debut de la batterie de tests')} ${red('----')}`);
  console.log();
  // Testdebug(`colors test ${red('red')} ${gre('green')} ${rai('there is the rainbow')}`);
  // testRandomize(25);
  // testGoofer(3);
  // testGenomics(20);
  // testGooferFactory(15);
  // testRandFactory(15);
  // testGooferGenerator();
  // testCellContent();
  // testTheGrid();
  // testCity();

  testListeners();
  console.log();
  Testdebug(`${red('----')} ${gre('Fin de la batterie de tests')} ${red('----')}`);
  console.log();
}

testRandomize = (iterations) => {
  iterations = secureIteration(iterations);
  console.log();
  Rdebug('debut des tests de randomize');
  console.log();


  rando = new Randomize();
  let min = 0;
  let arrayToRand = ["a", "b", "c", "d", "e", "f", "g"];
  let initialArrayCopy = arrayToRand.slice();
  for (let idx = 0; idx < iterations; idx++) {
    Rdebug(blu(`rand int (randmin = ${min}) (randmax = ${idx}) :`), rando.integer(min, idx));
  }
  Rdebug(cya(`arrayToRandomize initial S=> ${arrayToRand}`));
  Rdebug(mag(`array randomized => ${rando.array(arrayToRand)}`));
  Rdebug(cya(`arrayToRandomize final S=> ${arrayToRand}`));
  if(JSON.stringify(arrayToRand) === JSON.stringify(initialArrayCopy)) {
    Rdebug(gre('initial array has not mutated'));
  } else {
    Rdebug(red('initial array has mutated'));
  }


  console.log();
  Rdebug('fin des tests de randomize');
  console.log();
}

testGoofer = (iterations) => {
  iterations = secureIteration(iterations);
  console.log();
  Goodebug('debut des tests du Goofer');
  console.log();



  for (let idx = 0; idx < iterations; idx++) {
    let myGoofer = new Goofer(Faker.name.firstName() , (idx * 3), ["A", "B", "C", "D", "E"], !!((idx + idx + 1)% 3));
    if (myGoofer) {
      Goodebug(gre(`creation of a goofer ok: ${JSON.stringify(myGoofer)}`));
      if (myGoofer.getHalfGenome) {
        Goodebug('getHalfGenome exist in Goofer');
      } else {
        throw new Error("goofer is lacking the method getHalfGenome");
      }
      if(myGoofer.happyBirthday) {
        for(let i = 0; i < 27; i++) {
          myGoofer.happyBirthday();
          if (i == 0 || i == 5 || i == 10 || i == 25){
            Goodebug(gre(`halfgenome of ${myGoofer.name} age ${myGoofer.age} => [${myGoofer.getHalfGenome()}]`));
          }
        }
      }
      let mymsg = "A message"
      if (myGoofer.gooferEmitter) {
        Goodebug(cya(`gooferEmitter exist in Goofer and render => '${myGoofer.gooferEmitter(mymsg)}'`));
      } else {
        throw new Error("goofer is lacking the method gooferEmitter");
      }
    }
  }



  console.log();
  Rdebug('fin des tests du Goofer');
  console.log();
}

testGenomics = (iterations) => {
  iterations = secureIteration(iterations);
  console.log();
  Gndebug('---<> debut de la batterie de tests du Genomics<>---');
  console.log();



  const testName = 'Genomics';
  const myGenomics = new Genomics(["AA", "AB", "BA", "BB", "AC", "BC", "CC"]);
  Gndebug(cya(`GenePool : [${myGenomics.genePool}]`));
  if (myGenomics.getRandGenePool) {
    Gndebug(`getRandGenePool exist in ${testName} and render => ${yel(myGenomics.getRandGenePool())}`);
  } else {
    throw new Error("myGenomics is lacking the method getRandGenePool");
  }
  if (myGenomics.getGene) {
    Gndebug(`getGene exist in ${testName} and render => "${gre(myGenomics.getGene())}"`);
  } else {
    throw new Error("myGenomics is lacking the method getGene");
  }
  if (myGenomics.mutation) {
    for(let mutaIdx = 0; mutaIdx < (iterations * 3000); mutaIdx++) {
      let tempgene = myGenomics.mutation(myGenomics.genePool);
      if (myGenomics.genePool != tempgene) {
        Gndebug(`A mutation occured at ${gre(mutaIdx)}/${iterations * 3000} and the new genome is : ${yel(tempgene)}`);
      }
    }
  } else {
    throw new Error("myGenomics is lacking the method mutation");
  }
  if (myGenomics.makeRandGenePool) {
    Gndebug(`makeRandGenePool exist in ${testName} and render => ${mag(myGenomics.makeRandGenePool(5, 5))}`);
  } else {
    throw new Error("myGenomics is lacking the method makeRandGenePool");
  }
  


  
  console.log();
  Gndebug('---<> fin de la batterie de tests du Genomics<>---');
  console.log();
}

testGooferFactory = (iterations) => {
  iterations = secureIteration(iterations) * 2;
  console.log();
  Factdebug('---<> debut de la batterie de tests du GooferFactory <>---');
  console.log();

  MyFactoryTestA = new GooferFactory(["Z", "W", "B", "L"]);
  MyFactoryTestB = new GooferFactory();
  let name = Faker.name.firstName();
  if (MyFactoryTestA === MyFactoryTestB) {
    Factdebug(gre('GooferFactory is a singleton'));
  } else {
    Factdebug(red('GooferFactory is NOT a singleton'));
  }
  console.log();
  Factdebug(`factory genepool => ${yel(MyFactoryTestA.getFactoryGenePool())}`);
  for (let idx = 0;idx < iterations; idx++){
    let testGoofer = MyFactoryTestB.createGoofer(name, idx);
    Factdebug(`factory generated >> goofer ${gre(testGoofer.name)} age : ${testGoofer.age} and half genome >> ${cya(testGoofer.getHalfGenome())}`);
    name = Faker.name.firstName();
  }
  console.log();
  Factdebug('---<> fin de la batterie de tests du GooferFactory <>---');
  console.log();
}

testRandFactory = (iterations) => {
  iterations = secureIteration(iterations) * 2;
  console.log();
  RDFdebug('---<> Debut de la batterie de tests du RandFactory <>---');
  console.log();



  MyRandFactory = new RandFactory(6, 3, false);
  // RDFdebug(`randFactory genepool => ${yel(MyRandFactory.genePool)}`);
  let myIsMale = true;
  for (let idx = 0; idx < 1; idx++) {
    let testGoofer = MyRandFactory.createGoofer(myIsMale);
    RDFdebug(`test my rand factory for male goofer = ${myIsMale}`)
    RDFdebug(`testGoofer : ${testGoofer.name} is male? ${testGoofer.isMale}`);
    myIsMale = !myIsMale;
  }
    myIsMale = undefined;
    let males = 0;
    let females = 0;
    for (let idx = 0; idx < iterations * 2000; idx++) {
      testGoofer = MyRandFactory.createGoofer(myIsMale);
      // RDFdebug(`test my rand factory for male goofer = ${myIsMale}`);
      if (testGoofer.isMale === true) {
        males++;
      } else {females++}
      // (testGoofer.ismale ? males++ : females++);
      // RDFdebug(`testGoofer : ${testGoofer.name} is male? ${yel(testGoofer.isMale)}`);
    }
    RDFdebug(`Equilibre entre les males et les femelles lorsque le genre est indefini
pour ${mag(iterations * 2000)} iterations:
males = ${cya(males)} females = ${gre(females)}`);
    // console.log('generation of a predetermined nb of goofers');
    // console.log(MyRandFactory.createNbGoofers(15, myIsMale))
  console.log();
  RDFdebug('---<> fin de la batterie de tests du RandFactory <>---');
  console.log();
}

testGooferGenerator = () => {
  console.log();
  console.log('---<> debut de la batterie de tests du GooferGenerator <>---');
  console.log();
  let generatorGenes = new Genomics(["AA", "AB", "BA", "BB", "AC", "BC", "CC"])
  let dadGoofer = new Goofer(
    Faker.name.firstName(),
    14,
    generatorGenes.getRandGenePool(),
    true);
  let momGoofer = new Goofer(
    Faker.name.firstName(),
    12,
    generatorGenes.getRandGenePool(),
    false);
  console.log('dad => ', dadGoofer);
  console.log('mom => ', momGoofer);
  console.log('generatorgenes =>', generatorGenes);
  console.log(GooferGenerator(dadGoofer, momGoofer, Faker.name.firstName()));
  console.log();
}

testCellContent = () => {
  console.log();
  console.log('---<> debut de la batterie de tests de la classe CellContent <>---');
  console.log();
  let testGoofer;
  const randfact = new RandFactory(6, 2);
  for (let i = 0; i < 5; i++) {
    // (!!myRand.integer(0, 2) ? testGoofer = randfact.createGoofer() : testGoofer = undefined) 
    testGoofer = randfact.createGoofer();
    let testCellContent = new CellContent(
      myRand.integer(0, 2),
      myRand.integer(0, 255),
      myRand.integer(0, 255),
      testGoofer);
      console.log(testCellContent);
  }
  console.log();
  console.log('---<> fin de la batterie de tests de la classe CellContent <>---');
  console.log();
}

testTheGrid = () => {
  console.log();
  console.log('---<> debut de la batterie de tests de la classe TheGrid <>---');
  console.log();

  let myGrid = new CityGrid(3, 3);
  myGrid.getGridContent();
  let x = 0;
  let y = 0;
  console.log('make food poppin ;-)');
  myGrid.setCaseContent(x,y, 1);
  myGrid.getCaseContent(x,y);
  let testGoofer = myRandFacto.createGoofer();
  x = 1;
  myGrid.setCaseContent(x, y, 0, testGoofer);
  myGrid.getCaseContent(x, y);
  console.log(`test isCellGooferPresent x:${x} y:${y} ? ${myGrid.isCellGooferPresent(x, y)}`);
  x = 0;
  console.log(`test isCellGooferPresent x:${x} y:${y} ? ${myGrid.isCellGooferPresent(x, y)}`);
  // console.log(`${}`);
  // console.log(`${}`);

  console.log();
  console.log('---<> fin de la batterie de tests de la classe TheGrid <>---');
  console.log();
}

testCity = () => {
  console.log();
  console.log('---<> debut de la batterie de tests de la classe City <>---');
  console.log();
  let myFact = new RandFactory(6, 2);
  let myCity = new City(5, 5, 2, "testCity");

  console.log(`${JSON.stringify(this)}`);
  myCity.addGooferCitizen(myFact.createGoofer(undefined), myCity.eventHandler);
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      // console.log(myCity);
      myHF.coloredMsg(`y'a t'il un goofer sur la case [${x}][${y}] ${myCity.doesCellHaveAGoofer(x, y)}`, 'blue');
    }
  }
  // myCity.doesCellHaveAGoofer();

  console.log();
  console.log('---<> fin de la batterie de tests de la classe City <>---');
  console.log();
}

testListeners = (iterations) => {
  iterations = secureIteration(iterations) * 2;
  console.log();
  Listdebug('---<> Debut de la batterie de tests des listeners <>---');
  console.log();

  myScreamingCity = new City(4, 4, 2, 'The Screeeaming City');
  mySreamingCity.dayNnight(1600);
  // mySreamingCity.eventHandlerA.on('tick', mySreamingCity.grid.generateFoodRand);
  myScreamingCity.grid.generateFoodFillListen('tock');




  // mySreamingCity.grid.theGridSubscriber(mySreamingCity.eventHandlerA, 'tick');





  console.log();
  Listdebug('---<> Fin de la batterie de tests des listeners <>---');
  console.log();
}

module.exports = tests;
Randomize = require('../models/Randomize');
Goofer = require('../models/GooferClass');
Genomics = require('../models/Genomics');
GooferFactory = require('../GooferFactory');
RandFactory = require('../models/RandFactory')
GooferGenerator = require('../GooferGenerator');
CellContent = require('../models/CellContent');
CityGrid = require('../models/TheGrid');
City = require('../models/City');
Faker = require('faker/locale/fr');

const myRand = new Randomize();
const myRandFacto = new RandFactory(6, 3);


tests = () => {
  // testRandomize();
  // testGooferClass();
  // testGenomics();
  // testGooferFactory();
  // testRandFactory();
  // testGooferGenerator();
  // testCellContent();
  testTheGrid();
  testCity();
}

testRandomize = () => {
  console.log();
  console.log('---<> debut de la batterie du Randomize <>---');
  console.log();
  
  rando = new Randomize();
  let min = 1;
  let max = 15;
  let arrayToRand = ["a", "b", "c", "d", "e", "f", "g"];
  let initialArrayCopy = arrayToRand.slice();
  console.log(`rand int (randmin = ${min}) (randmax = ${max}) :`, rando.integer(min, max));
  max = 1;
  console.log(`rand int (randmin = ${min}) (randmax = ${max}) :`, rando.integer(min, max));
  console.log(`arrayToRandomize initial S=> ${arrayToRand}`);
  console.log(`array randomized => ${rando.array(arrayToRand)}`);
  console.log(`arrayToRandomize final S=> ${arrayToRand}`);
  if(JSON.stringify(arrayToRand) === JSON.stringify(initialArrayCopy)) {
    console.log(`initial array has not mutated`);
  } else {
    console.log(`initial array has mutated`);
  }
  console.log();
  console.log('---<> fin de la batterie du Randomize <>---');
  console.log();
}

testGooferClass = () => {
  console.log('---<> debut de la batterie de tests de la classe Goofer <>---');
  for (let idx = 0; idx < 4; idx++) {
    console.log();
    console.log(`gender ${idx + idx + 1}`, !!((idx + idx + 1)% 3));
    console.log()
    let myGoofer = new Goofer(Faker.name.firstName() , (idx * 3), ["A", "B", "C", "D", "E"], !!((idx + idx + 1)% 3));
    if (myGoofer) {
      console.log('creation of a goofer ok: ', myGoofer);
      if (myGoofer.getHalfGenome) {
        console.log('getHalfGenome exist in Goofer and render => ', myGoofer.getHalfGenome());
      } else {
        throw new Error("goofer is lacking the method getHalfGenome");
      }
      if(myGoofer.happyBirthday) {
        for(let i = 0; i < 27; i++) {
          myGoofer.happyBirthday();
          if (i == 0 || i == 5 || i == 10 || i == 25){
            console.log(myGoofer.getHalfGenome());
          }
        }
      }
      let mymsg = "someting"
      if (myGoofer.gooferEmitter) {
        console.log('gooferEmitter exist in Goofer and render => ', myGoofer.gooferEmitter(mymsg));
      } else {
        throw new Error("goofer is lacking the method gooferEmitter");
      }
    }
  }
  console.log();
  console.log('---<> fin de la batterie de tests de la classe Goofer <>---');
  console.log();
}

testGenomics = () => {
  console.log('---<> debut de la batterie de tests du Genomics<>---');
  console.log();
  const testName = 'Genomics';
  const myGenomics = new Genomics(["AA", "AB", "BA", "BB", "AC", "BC", "CC"]);
  // console.log('MyGenomics : ', myGenomics);
  console.log('GenePool : ', myGenomics.genePool);
  if (myGenomics.getRandGenePool) {
    console.log(`getRandGenePool exist in ${testName} and render => ${myGenomics.getRandGenePool()}`);
  } else {
    throw new Error("myGenomics is lacking the method getRandGenePool");
  }
  if (myGenomics.getGene) {
    console.log(`getGene exist in ${testName} and render => ${myGenomics.getGene()}`);
  } else {
    throw new Error("myGenomics is lacking the method getGene");
  }
  if (myGenomics.mutation) {
    for(let mutaIdx = 0; mutaIdx < 30000; mutaIdx++) {
      let tempgene = myGenomics.mutation(myGenomics.genePool);
      if (myGenomics.genePool != tempgene) {
        console.log(`A mutation occured at ${mutaIdx}/30000 and the new genome is :${tempgene}`);
      }
    }
  } else {
    throw new Error("myGenomics is lacking the method mutation");
  }
  if (myGenomics.makeRandGenePool) {
    console.log(`makeRandGenePool exist in ${testName} and render => ${myGenomics.makeRandGenePool(5, 5)}`);
  } else {
    throw new Error("myGenomics is lacking the method makeRandGenePool");
  }  
  console.log("");
  console.log('---<> fin de la batterie de tests du Genomics<>---');
  console.log("");
}

testGooferFactory = () => {
  console.log();
  console.log('---<> debut de la batterie de tests du GooferFactory<>---');
  console.log();
  MyFactoryTestA = new GooferFactory(["Z", "W", "B", "L"]);
  MyFactoryTestB = new GooferFactory();
  let name = Faker.name.firstName();
  if (MyFactoryTestA === MyFactoryTestB) {
    console.log('GooferFactory is a singleton');
  } else {
    console.log('GooferFactory is NOT a singleton');
  }
  console.log('factory genepool =>',MyFactoryTestA.getFactoryGenePool());
  for (let idx = 0;idx < 26; idx++){
    let testGoofer = MyFactoryTestB.createGoofer(name, idx);
    console.log(testGoofer.getHalfGenome());
    name = Faker.name.firstName();
  }
  console.log();console.log('---<> fin de la batterie de tests du GooferFactory<>---');
  console.log();
}

testRandFactory = () => {
  console.log();
  console.log('---<> Debut de la batterie de tests du RandFactory <>---');
  console.log();
  MyRandFactory = new RandFactory(6, 3, false);
  // console.log('randFactory genepool =>',MyRandFactory.genePool);
  let myIsMale = true;
  let testGoofer = MyRandFactory.createGoofer(myIsMale);
  console.log(`test my rand factory for male goofer = ${myIsMale}`)
  console.log(`testGoofer : ${testGoofer.name} is male? ${testGoofer.isMale}`);
  myIsMale = false;
  testGoofer = MyRandFactory.createGoofer(myIsMale);
  console.log(`test my rand factory for male goofer = ${myIsMale}`)
  console.log(`testGoofer : ${testGoofer.name} is male? ${testGoofer.isMale}`);
  myIsMale = undefined;
  for (let idx = 0; idx < 20; idx++) {
    testGoofer = MyRandFactory.createGoofer(myIsMale);
    console.log();
    console.log(`test my rand factory for male goofer = ${myIsMale}`)
    console.log(`testGoofer : ${testGoofer.name} is male? ${testGoofer.isMale}`);
  }
  console.log('generation of a predetermined nb of goofers');
  console.log(MyRandFactory.createNbGoofers(15, myIsMale))
  console.log();
  console.log('---<> fin de la batterie de tests du RandFactory <>---');
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
  let myCity = new City(5, 5, 5, "testCity");

  console.log(`${JSON.stringify(this)}`);
  myCity.addGooferCitizen(myFact.createGoofer(undefined), myCity.eventHandler);
  // myCity.

  console.log();
  console.log('---<> fin de la batterie de tests de la classe City <>---');
  console.log();
}

module.exports = tests;
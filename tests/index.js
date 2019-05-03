Randomize = require('../models/Randomize');
Goofer = require('../models/GooferClass');
Genomics = require('../models/Genomics');
GooferFactory = require('../GooferFactory');
GooferGenerator = require('../GooferGenerator');
CellContent = require('../models/CellContent');
CityGrid = require('../models/TheGrid');



tests = () => {
    testRandomize();
    const rando = new Randomize();
    testGooferClass();
    testGenomics();
    testGooferFactory();
    testGooferGenerator();
    testCaseContent();
    // testTheGrid();
}

testRandomize = () => {
  console.log();
    console.log('---<> debut de la batterie du Randomize <>---');
  rando = new Randomize();
  let min = 1;
  let max = 15;
  console.log(`rand int (randmin = ${min}) (randmax = ${max}) :`, rando.integer(min, max));
  max = 1;
  console.log(`rand int (randmin = ${min}) (randmax = ${max}) :`, rando.integer(min, max));
  console.log(rando.array(["a", "b", "c", "d", "e"]));
}

testGooferClass = () => {
    console.log();
    console.log('---<> debut de la batterie de tests de la classe Goofer <>---');
    if ( myGoofer = new Goofer('testGoofer' , 0, ["A", "B", "C", "D", "E"])) {
        console.log('creation of a goofer ok: ', myGoofer);
        if (myGoofer.getHalfGenome) {
            console.log('getHalfGenome exist in Goofer and render => ', myGoofer.getHalfGenome());
        } else {
            throw new Error("goofer is lacking a method");
        }
        if(myGoofer.happyBirthday) {
          for(let i = 0; i < 27; i++) {
            myGoofer.happyBirthday();
            console.log(myGoofer.getHalfGenome());
          }
        }
    }
    delete myGoofer;
    console.log();
}

testGenomics = () => {
    console.log('---<> debut de la batterie de tests du Genomics<>---');
    console.log();
    const myGenomics = new Genomics(["AA", "AB", "BA", "BB", "AC", "BC", "CC"]);
    // console.log('MyGenomics : ', myGenomics);
    console.log('GenePool : ', myGenomics.genePool);
    console.log('Get RandGenePool : ', myGenomics.getRandGenePool());
    console.log('Get Random Gene : ', myGenomics.getGene());
    for(let mutaIdx = 0; mutaIdx < 20000; mutaIdx++) {
      let tempgene = myGenomics.mutation(myGenomics.genePool);
      if (myGenomics.genePool != tempgene) {
        console.log(`A mutation occured at ${mutaIdx}/20000 and the new genome is :${tempgene}`);
      }
    }
}

testGooferFactory = () => {
    console.log('---<> debut de la batterie de tests du GooferFactory<>---');
    console.log();
    MyFactoryTestA = new GooferFactory(["Z", "W", "B", "L"]);
    MyFactoryTestB = new GooferFactory();
    if (MyFactoryTestA === MyFactoryTestB) {
        console.log('GooferFactory is a singleton');
    } else {
        console.log('GooferFactory is NOT a singleton');
    }
    console.log('factory genepool =>',MyFactoryTestA.getFactoryGenePool());
    let testGoofer = MyFactoryTestB.createGoofer('bobby');
    console.log(testGoofer.getHalfGenome());
    let testGoofer2 = MyFactoryTestB.createGoofer('bob', 12);
    console.log(testGoofer2.getHalfGenome());
    let testGoofer3 = MyFactoryTestB.createGoofer('old bobby', 45);
    console.log(testGoofer3.getHalfGenome());
    console.log();
}

testGooferGenerator = () => {
  console.log();
    console.log('---<> debut de la batterie de tests du GooferGenerator <>---');
    console.log();
  let generatorGenes = new Genomics(["AA", "AB", "BA", "BB", "AC", "BC", "CC"])
  let dadGoofer = new Goofer(
    'Brad',
    14,
    generatorGenes.getRandGenePool(),
    true
    );
    let momGoofer = new Goofer(
    'Brittany',
    12,
    generatorGenes.getRandGenePool()
    );
  console.log('dad => ', dadGoofer);
  console.log('mom => ', momGoofer);
  console.log('generatorgenes =>', generatorGenes);
  console.log(GooferGenerator(dadGoofer, momGoofer, 'brandon'));
  console.log();
}

testCaseContent = () => {
  console.log();
    console.log('---<> debut de la batterie de tests de la classe CellContent <>---');
    console.log();
    for (let i = 0; i < 10; i++) {
      let testCellContent = new CellContent(
        rando.integer(0, 2),
        rando.integer(0, 255),
        rando.integer(0, 255));
      console.log(testCellContent);
    }

}

testTheGrid = () => {
  console.log();
    console.log('---<> debut de la batterie de tests de la classe TheGrid <>---');
}

module.exports = tests;
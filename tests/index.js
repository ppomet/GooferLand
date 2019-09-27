const testTools = require('./testTools');
const GooferTests = require('./tGoofer');
const CellTests = require('./tCell');
const GridTests = require('./tGrid');
const RandomizeTests = require('./tRandomize');
const GooferGeneratorTests = require('./tGooferGenerator');
const GooferFactoryTests = require('./tGooferFactory');
const RandFactoryTests = require('./tRandFactory');
const GenomicsTests = require('./tGenomics');


const launchTests = () => {
  testTools.displayConfig();
  CellTests();
  // GooferTests(25);
  // CellTests();
};

module.exports = launchTests;

// testGooferFactory = (iterations) => {
//   iterations = secureIteration(iterations) * 2;
//   console.log();
//   Factdebug('---<> debut de la batterie de tests du GooferFactory <>---');
//   console.log();
//
//   MyFactoryTestA = new GooferFactory(["Z", "W", "B", "L"]);
//   MyFactoryTestB = new GooferFactory();
//   let name = Faker.name.firstName();
//   if (MyFactoryTestA === MyFactoryTestB) {
//     Factdebug(gre('GooferFactory is a singleton'));
//   } else {
//     Factdebug(red('GooferFactory is NOT a singleton'));
//   }
//   console.log();
//   Factdebug(`factory genepool => ${yel(MyFactoryTestA.getFactoryGenePool())}`);
//   for (let idx = 0;idx < iterations; idx++){
//     let testGoofer = MyFactoryTestB.createGoofer(name, idx);
//     Factdebug(`factory generated >> goofer ${gre(testGoofer.name)} age : ${testGoofer.age} and half genome >> ${cya(testGoofer.getHalfGenome())}`);
//     name = Faker.name.firstName();
//   }
//   console.log();
//   Factdebug('---<> fin de la batterie de tests du GooferFactory <>---');
//   console.log();
// }

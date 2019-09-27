// testRandFactory = (iterations) => {
//   iterations = secureIteration(iterations) * 2;
//   console.log();
//   RDFdebug('---<> Debut de la batterie de tests du RandFactory <>---');
//   console.log();
//
//
//
//   MyRandFactory = new RandFactory(6, 3, false);
//   // RDFdebug(`randFactory genepool => ${yel(MyRandFactory.genePool)}`);
//   let myIsMale = true;
//   for (let idx = 0; idx < 1; idx++) {
//     let testGoofer = MyRandFactory.createGoofer(myIsMale);
//     RDFdebug(`test my rand factory for male goofer = ${myIsMale}`)
//     RDFdebug(`testGoofer : ${testGoofer.name} is male? ${testGoofer.isMale}`);
//     myIsMale = !myIsMale;
//   }
//   myIsMale = undefined;
//   let males = 0;
//   let females = 0;
//   for (let idx = 0; idx < iterations * 2000; idx++) {
//     testGoofer = MyRandFactory.createGoofer(myIsMale);
//     // RDFdebug(`test my rand factory for male goofer = ${myIsMale}`);
//     if (testGoofer.isMale === true) {
//       males++;
//     } else {females++}
//     // (testGoofer.ismale ? males++ : females++);
//     // RDFdebug(`testGoofer : ${testGoofer.name} is male? ${yel(testGoofer.isMale)}`);
//   }
//   RDFdebug(`Equilibre entre les males et les femelles lorsque le genre est indefini
// pour ${mag(iterations * 2000)} iterations:
// males = ${cya(males)} females = ${gre(females)}`);
//   // console.log('generation of a predetermined nb of goofers');
//   // console.log(MyRandFactory.createNbGoofers(15, myIsMale))
//   console.log();
//   RDFdebug('---<> fin de la batterie de tests du RandFactory <>---');
//   console.log();
// }

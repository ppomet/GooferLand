// testGenomics = (iterations) => {
//   iterations = secureIteration(iterations);
//   console.log();
//   Gndebug('---<> debut de la batterie de tests du Genomics<>---');
//   console.log();
//
//
//
//   const testName = 'Genomics';
//   const myGenomics = new Genomics(["AA", "AB", "BA", "BB", "AC", "BC", "CC"]);
//   Gndebug(cya(`GenePool : [${myGenomics.genePool}]`));
//   if (myGenomics.getRandGenePool) {
//     Gndebug(`getRandGenePool exist in ${testName} and render => ${yel(myGenomics.getRandGenePool())}`);
//   } else {
//     throw new Error("myGenomics is lacking the method getRandGenePool");
//   }
//   if (myGenomics.getGene) {
//     Gndebug(`getGene exist in ${testName} and render => "${gre(myGenomics.getGene())}"`);
//   } else {
//     throw new Error("myGenomics is lacking the method getGene");
//   }
//   if (myGenomics.mutation) {
//     for(let mutaIdx = 0; mutaIdx < (iterations * 3000); mutaIdx++) {
//       let tempgene = myGenomics.mutation(myGenomics.genePool);
//       if (myGenomics.genePool != tempgene) {
//         Gndebug(`A mutation occured at ${gre(mutaIdx)}/${iterations * 3000} and the new genome is : ${yel(tempgene)}`);
//       }
//     }
//   } else {
//     throw new Error("myGenomics is lacking the method mutation");
//   }
//   if (myGenomics.makeRandGenePool) {
//     Gndebug(`makeRandGenePool exist in ${testName} and render => ${mag(myGenomics.makeRandGenePool(5, 5))}`);
//   } else {
//     throw new Error("myGenomics is lacking the method makeRandGenePool");
//   }
//
//
//
//
//   console.log();
//   Gndebug('---<> fin de la batterie de tests du Genomics<>---');
//   console.log();
// }

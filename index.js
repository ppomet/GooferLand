Goofer = require('./models/GooferClass');
Genomics = require('./models/Genomics');
GooferFactory = require('./GooferFactory');


console.log('goof facto', GooferFactory);

MyGooferFactory = new GooferFactory();

console.log(MyGooferFactory);


console.log(MyGooferFactory.createGoofer('bob', 10));

// // dans une factory on verifie les entree sortie

// //try catch avec des erreur specifique


// function createGenome() {
//     let genome = [];
//     for(let i = 0; i < 10; i++) {
//       // console.log('geno inside the iife', this.genomics);
//       shuffle(genomics);
//       // genome = Array.push(randGenomics[0]);
//       genome.push(this.genomics[0]);
//       // console.log(genome);
//     }
//     // console.log(genome);
//     return genome;
//   }

// generateGoofer = (goofer1, goofer2, name) => {
//   if (!(goofer1 instanceof Goofer) ||
//       !(goofer2 instanceof Goofer)) {
//         throw new Error('n\'est pas un goofer');
//       }
//   console.log('papa ->', goofer1.name);
//   console.log(goofer1.genome);
//   console.log('maman ->', goofer2.name);
//   console.log(goofer2.genome);
//   let gengoof1 = goofer1.getHalfGen();
//   let gengoof2 = goofer2.getHalfGen();
//   let finalgenetics = gengoof1.concat(gengoof2);
//   shuffle(finalgenetics);
//   console.log(gengoof1);
//   console.log(gengoof2);
//   console.log('final',finalgenetics);
//   console.log('concat ',gengoof1.concat(gengoof2));
//   return new Goofer(name, 0, finalgenetics);
// }

// const useGooferFactory = () => {
//   console.log('retour de la facto -->', createGoofer('bob', 15));
// }

// useGooferFactory();

// testGenerateGoffer = () => {
//   let child = generateGoofer(
//     createGoofer('bob',15),
//     createGoofer('babette', 17),
//     'geronimo');
//   console.log('juvenile ->', child.name);
//   console.log(child.genome);
// };

// testGenerateGoffer();

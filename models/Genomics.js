Randomize = require('../models/Randomize');

class Genomics {

  constructor(genePool, isMutable) {//peut -etre que pour decoupler je pourrais passer une instance de Randomize dans le constructeur
    this.rand = new Randomize();
    this.genePool = genePool || ["DefaultGene1", "DefaultGene2", "DefaultGene3"];
    this.isMutable = isMutable;
  }
  
  getRandGenePool() {
    if (this.isMutable) {
      return this.rand.array(this.mutation(this.genePool));
    }
    return this.rand.array(this.genePool);
  }
  
  getGene() {
    return this.rand.array(this.genePool)[0];
  }
  

  mutation(genome, mutationChance) {
    if (!genome) {return}
    if (!mutationChance) { mutationChance = 9998;}
    if (this.rand.integer(1, 10000) > mutationChance) {
      const geneNbToMutate = this.rand.integer(0, genome.length);
      // console.log(`Mutated gene nb:${geneNbToMutate}`);
      const tempGenome = Array.from(genome);
      // console.log(`tempgene to Mutate ${tempGenome[geneNbToMutate]}`) ;
      const geneToMutate = tempGenome.splice(geneNbToMutate, 1).join();
      // console.log(`genetomut ${geneToMutate}`);
      // console.log(`genetomut length ${geneToMutate.length}`);
      const geneLength = geneToMutate.length;
      const slicedGenes = [...geneToMutate];
      // console.log('badudop', slicedGenes);
      const indextoMutate = this.rand.integer(0, geneLength)
      slicedGenes[indextoMutate] = String.fromCharCode(this.rand.integer(33, 127));
      const temp = slicedGenes.join("");
      // console.log('bob', bob);
      // console.log(slicedGenes);
      // console.log(`arrayfrom ${geneToMutate} => ${Array.from(geneToMutate).concat()}`);
      return Array.from(genome).map((elem, idx) => {
        if (idx !== geneNbToMutate){
          return elem;
        } else {
          return temp; 
        }
      });
    } else {
      return genome
    }
  }
}

module.exports = Genomics;
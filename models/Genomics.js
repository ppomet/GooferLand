const Randomize = require('../models/Randomize');

class Genomics {

  constructor(genePool, isMutable, genePoolSize, genesLength) {//peut -etre que pour decoupler je pourrais passer une instance de Randomize dans le constructeur
    this.rand = new Randomize();
    this.genePool = genePool ||
                    this.makeRandGenePool(genePoolSize, genesLength) ||
                    ["AA", "BB", "CC", "DD", "EE", "FF"];
    this.isMutable = isMutable;
    this.simpleGene = undefined;
    this.randomizedGenePool = undefined;
  }

  getRandGenePool() {
    if (this.isMutable) {
      return this.rand.array(this.mutation(this.genePool));
    }
    return this.rand.array(this.genePool);
  }

  setRandGenePool() {
    if (this.isMutable) {
      this.randomizedGenePool =  this.rand.array(this.mutation(this.genePool));
    }
    this.randomizedGenePool =  this.rand.array(this.genePool);
    return this;
  }

  getGene() {
    this.simpleGene = this.rand.array(this.genePool)[0];
    return this;
  }

  setSimpleGene() {
    this.simpleGene = this.rand.array(this.genePool)[0];
    return this;
  }

  makeRandGenePool(Size, geneLength) {
    if (!Size || typeof Size !== "number" || !geneLength || typeof geneLength !== "number" || Size < 1 || geneLength < 1) {
      return null;
    } else {
      const rdGenePool = Array.from(Size).fill(null);
      for (let idx = 0; idx < Size; idx++) {
        const genes = Array.from(geneLength).fill(null);
          for (let jdx = 0; jdx < geneLength; jdx++) {
            genes[jdx] = String.fromCharCode(this.rand.integer(65, 91))
          }
          // console.log(`make rand genes >> ${genes}`);
          rdGenePool[idx] = genes.join("").slice();
      }
      return rdGenePool.slice();
    }
  }


  mutation(genome, mutationChance) {
    if (!genome) {return}
    if (!mutationChance) { mutationChance = 2;}
    if (this.rand.integer(1, 10000) > (10000 - mutationChance)) { // TODO: peut etre changer la logique numeraire (float ou )
      const geneNbToMutate = this.rand.integer(0, genome.length);
      const tempGenome = Array.from(genome);
      const geneToMutate = tempGenome.splice(geneNbToMutate, 1).join();
      const geneLength = geneToMutate.length;
      const slicedGenes = [...geneToMutate];
      const indextoMutate = this.rand.integer(0, geneLength);
      slicedGenes[indextoMutate] = String.fromCharCode(this.rand.integer(33, 127));
      const temp = slicedGenes.join("");
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

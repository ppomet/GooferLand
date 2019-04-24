
class Genomics {
    
    constructor(genePool = false) {
        this.genePool = genePool || ["DefaultGene1", "DefaultGene2", "DefaultGene3"];
    }
        
    getRandGenePool() {
            let jdx = 0;
            let temp = null;
            let tempgenomics = this.genePool.slice();
            for (let idx = 0; idx < this.genePool.length; idx++){
                jdx = Math.floor(Math.random() * (idx + 1));
                temp = tempgenomics[idx];
                tempgenomics[idx] = tempgenomics[jdx];
                tempgenomics[jdx] = temp;
            }
            return tempgenomics;
        }
    

    getGene() {
        return this.getRandGenePool()[0];
    }
}

module.exports = Genomics;
module.exports = class genomics {
    constructor() {};
    genomics = ["A", "B", "C"];

    getRandGenePool() {
        let jdx = 0;
        let temp = null;
        let tempgenomics = this.genomics.slice();
        for (let idx = 0; idx < genomics.length; idx++){
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
};





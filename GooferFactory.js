Goofer = require('./models/GooferClass');
Genomics = require('./models/Genomics');

class GooferFactory {
    constructor(genePool) {
        if (! GooferFactory.instance) {
            this.genePool = genePool;
            this.MyGenomics = new Genomics(genePool);
            GooferFactory.instance = this;
            Object.freeze(GooferFactory);
        }
        return GooferFactory.instance;
    }

    createGoofer(name, age) {//facade
        if (!name || (typeof(name)) !== "string") {
            console.log('bad name in the goofer factory', name);
            throw new Error("name is incorrect or absent");
        } else {
            console.log('security for naming goofer is passed');
        }
        if (!age) {
            age = 0;
        } else {
            console.log('security for naming goofer is passed');
        }
        console.log('name->', name,'age->', age);
        let goofer = new Goofer(name, age, this.MyGenomics.getRandGenePool());
        console.log('created goofer => ', goofer);
        return (goofer);
    }

    getGenePool() {
        // console.log('this=>', this);
        console.log('GenePool in the GooferFactory : ', this.genePool);
        return this.genePool.slice();
    }
}

// const instance = new GooferFactory(["bob"]); // le singleton ne me permet pas de passer des parametres au constructeur


module.exports = GooferFactory;
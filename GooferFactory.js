Goofer = require('./models/Goofer');
Genomics = require('./models/Genomics');

class GooferFactory {
    constructor(genePool, isMutable) {
        if (! GooferFactory.instance) {
            this.genePool = genePool;
            this.MyGenomics = new Genomics(genePool, isMutable);
            GooferFactory.instance = this;
            Object.freeze(GooferFactory);
        }
        return GooferFactory.instance;
    }

    createGoofer(name, age, isMale, events) {
        if (!name || (typeof(name)) !== "string") {
            throw new Error("name is incorrect or absent");
        }
        if (!age || age < 0) {
            age = 0;
        }
        let goofer = new Goofer(
          name,
          age,
          this.MyGenomics.getRandGenePool(),
          isMale,
          events);
        return (goofer);
    }

    getFactoryGenePool() {
        return this.genePool.slice();
    }
}

// const instance = new GooferFactory(["bob"]); // le singleton ne me permet pas de passer des parametres au constructeur


module.exports = GooferFactory;
class Goofer {
    constructor(name, age, genome){
        this.name = name;
        this.age = age;
        this.genome = genome;
    }
    getHalfGenome() {
        if (this.age < 5) {
            console.log('the goofer', this.name,'is still juvenile');
            return [];
        } else if (this.age > 25) {
            console.log('the goofer', this.name,'is too old and is sterile');
            return [];
        }
        console.log('the goofer', this.name,'give you some white jelly <3');
        let jdx = 0;
        let temp = null;
        let tempgenomics = this.genome.slice();
        for (let idx = 0; idx < this.genome.length; idx++){
            jdx = Math.floor(Math.random() * (idx + 1));
            temp = tempgenomics[idx];
            tempgenomics[idx] = tempgenomics[jdx];
            tempgenomics[jdx] = temp;
        }
        return tempgenomics.slice(0 , Math.ceil(this.genome.length / 2) );
    }
}


module.exports = Goofer;
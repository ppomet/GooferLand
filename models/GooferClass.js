class Goofer {
    constructor(name, age, genome){
        this.name = name;
        this.age = age;
        this.genome = genome;
        console.log('goofer', name, 'is constructed');
        console.log('his genome : ',this.genome);
    }
    getHalfGen() {
        console.log('the goofer ', this.name,' give you some white jelly');
        return this.genome.slice(0,4);
    }
}

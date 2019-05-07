class Randomize {
  constructor() { }

  integer(intMin, intMax) {// attention intmax est exclu des valeurs possible
    const iMin = (intMin ? intMin : 0);
    const iMax = (intMax ? intMax : 100);
    if (iMin > iMax) {
      throw new Error('le nombre maximum ne peut etre inferieur au nombre minimum');
    }
    return Math.floor(Math.random() * (iMax - iMin) + iMin)
  }
  
  array(arrayToShuffle) {
    let jdx = 0;
    let temp = null;
    let temparray = arrayToShuffle.slice();
    for (let idx = 0; idx < temparray.length; idx++) {
      jdx = this.integer(0, temparray.length);
      temp = temparray[idx];
      temparray[idx] = temparray[jdx];
      temparray[jdx] = temp;
    }
    return temparray;
  }
}

module.exports = Randomize;
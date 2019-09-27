class Randomize {
  constructor(options) { // TODO: integrate options
    if (options) {
      console.log( {RandomizeOptions: options } );
    }
  }

  integer(intMin, intMax) {// attention intmax est exclu des valeurs possibles

    const iMin = (intMin ? intMin : 0);
    const iMax = (intMax ? intMax : 100);
    if (Math.abs(intMin) !== intMin || Math.abs(intMax) !== intMax) {
      throw new Error('les nombres, DOIVENT etre des nombres');
    } else if (iMin > iMax) {
      throw new Error('le nombre maximum ne peut etre inferieur au nombre minimum');
    }else if (intMin === intMax) {
      return intMin;
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

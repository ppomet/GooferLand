Goofer = require('./models/Goofer');
Genomics = require('./models/Genomics');

generateGoofer = (goofer1, goofer2, name) => {
  if (!(goofer1 instanceof Goofer) ||
      !(goofer2 instanceof Goofer)) {
        throw new Error('l\'un des parents n\'est pas un goofer.');
      }
  if (!name || name === '') {
    throw new Error('le goofer ne peut etre anonyme.')
  }
  if (goofer1.isMale === goofer2.isMale) {
    throw new Error('les goofers ne peuvent pas etre du meme sexe pour la reproduction sexuée');
  }
  const gengoof1 = goofer1.getHalfGenome();
  const gengoof2 = goofer2.getHalfGenome();
  let finalgenetics = gengoof1.concat(gengoof2);
  const tempGenomics = new Genomics(finalgenetics, true);
  finalgenetics = tempGenomics.getRandGenePool();
  return new Goofer(name, 0, finalgenetics, Math.random() >= 0.48);
}

module.exports = generateGoofer;
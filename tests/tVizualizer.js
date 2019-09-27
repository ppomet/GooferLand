const vizTerm = require('../models/visualizer.js').term;
const debugLog = require('debug')('debug-vizer-test');
const infoLog = require('debug')('info-vizer-test');
const errorLog = require('debug')('error-vizer-test');

const tvizer = (options) => {
  let vizer = new vizTerm(5, 5);
  vizer.display();
  let myCell = vizer.cellGenerator({maleGoofChar: ''});
  vizer.drawBox({size: 10, delim: myCell.extDelimString});
  vizer.drawBoundLine({boxSize: 4, boxNb: 3, delim: myCell.extDelimString+myCell.intDelimString, pos: 'up'});
  vizer.drawBoundLine({boxSize: 4, boxNb: 3, delim: myCell.extDelimString+myCell.intDelimString});
  vizer.drawBoundLine({boxSize: 4, boxNb: 3, delim: myCell.extDelimString+myCell.intDelimString});
  vizer.drawBoundLine({boxSize: 4, boxNb: 3, delim: myCell.extDelimString+myCell.intDelimString});
  vizer.drawBoundLine({boxSize: 4, boxNb: 3, delim: myCell.extDelimString+myCell.intDelimString});
  vizer.drawBoundLine({boxSize: 4, boxNb: 3, delim: myCell.extDelimString+myCell.intDelimString, pos: 'down'});
  vizer.drawGrid(2, 2);
  console.log('bab');
};

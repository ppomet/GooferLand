
// interface drawingObject;

class VizTerm{
  static makeDrawingObject(drawingOptions) {
    const defaultDrawingString = String.fromCharCode(0x2554, 0x2564, 0x2557, 0x2551, 0x2502, 0x2550, 0x2500, 0x255F, 0x2562, 0x253C, 0x255A, 0x2567, 0x255D, 0x229A, 0x229E);
    if (!drawingOptions) {drawingOptions = defaultDrawingString}
    if (typeof drawingOptions === 'string') {
      return {
        lUp: drawingOptions[0], // left upper corner
        cUp: drawingOptions[1], // center upper delimiter
        rUp: drawingOptions[2], // right upper corner
        vExt: drawingOptions[3], // vertical exterior line
        vInt: drawingOptions[4], // vertical interior line
        hExt: drawingOptions[5], // horizontal exterior line
        hInt: drawingOptions[6], // horizontal interior line
        lC: drawingOptions[7], // left vertical delimiter
        rC: drawingOptions[8], // right vertical delimiter
        cross: drawingOptions[9], // center delimiter
        lDown: drawingOptions[10], // left bottom corner
        cDown: drawingOptions[11], // center bottom delimiter
        rDown: drawingOptions[12], // right bottom corner
        mGC: drawingOptions[13], // male goofer representation
        fGC: drawingOptions[14] // female goofer representation
      }
    }
  }
  constructor (width, height, drawingOptions) {
    this.width = width;
    this.height = height;
    this.cellSize = 3;
    this.drawingObject = VizTerm.makeDrawingObject(drawingOptions);
    console.log({ Dobj: this.drawingObject});
    this.generateGrid = () => {
      let newViz = [];
      let x = 0;
      let y = 0;
      const lineBreak = '_'.repeat((this.width * 2) + 1);
      const dataLine = '| '.repeat(this.width) + '|';
      // console.log({lineBreak, dataLine});
      // console.log(lineBreak);
      // console.log(dataLine);
      // console.log(lineBreak);
      for (let size = 0; size < this.height; size++) {
        newViz.push(lineBreak);
        newViz.push(dataLine);
      }
      newViz.push(lineBreak);
      return newViz;
    };
    this.myGridViz = this.generateGrid();

    this.drawBoundLine = (lineParam) => {
      // console.log({lineParam});
      this.boxSize = lineParam.boxSize;
      this.totalSize = (lineParam.boxSize * lineParam.boxNb);
      let delim;
      if (lineParam.pos === 'up') {
        // delim = `${lineParam.delim[0]}${lineParam.delim[1]}${lineParam.delim[3]}${lineParam.delim[4]}`
        delim = this.drawingObject.lUp + this.drawingObject.hExt
      } else if (lineParam.pos === 'down') {
        delim = `${lineParam.delim[8]}${lineParam.delim[1]}${lineParam.delim[7]}${lineParam.delim[6]}`
      }else {
        delim = `${lineParam.delim[9]}${lineParam.delim[10]}${lineParam.delim[11]}${lineParam.delim[5]}`
      }
      const center = [];
      center.push(delim[0]);
      for (let idx = 1; idx < this.totalSize + lineParam.boxNb; idx++) {
        if (idx % (this.boxSize + 1)) {
          center.push(delim[1]);
        } else {
          center.push(delim[2]);
        }
        // console.log(`${idx} % ${this.boxSize} = ${idx % this.boxSize}`)
        // center.push(``);
      }
      center.push(delim[3]);
      console.log(center.join(''));
    };

    // this.makeSeparationLines = (lineParam) => {
    //   let separatorArray = [];
    //   for (let idx = 0)
    // };

    this.drawBox = (boxParam) => {
      let box = [];
      for (let idx = 0; idx <= boxParam.size; idx++) {
        if (idx === 0) {
          // console.log('up');
          console.log(`${boxParam.delim[0]}${boxParam.delim[1].repeat(boxParam.size)}${boxParam.delim[4]}`);
        }
        if (idx === boxParam.size) {
          console.log(`${boxParam.delim[8]}${boxParam.delim[1].repeat(boxParam.size)}${boxParam.delim[6]}`);
          break;
          // console.log('down');
        }
        // console.log('central');
        console.log(`${boxParam.delim[2]}${' '.repeat(boxParam.size)}${boxParam.delim[2]}`);
      }
      // console.log()
    };

    this.drawSeparator = (separator) => {
      console.log(separator);
    };

    this.drawGrid = (boxSize, size) => {
      let delims = this.defaultCellOptions.extDelimString;
      let fake = delims.split('');
      // console.log(fake);
      fake[10] = ' ';
      // console.log(fake);
      fake[11] = fake[12];
      // console.log(fake);
      fake = fake.join('');
      this.drawBoundLine({boxSize, boxNb: size, pos: 'up', delim: delims});
        for (let idx = 1; idx < size - 1; idx ++) {
          if (idx % boxSize + 1) {
          this.drawBoundLine({boxSize, boxNb: size, delim: delims});
          }
          this.drawBoundLine({boxSize, boxNb: size, delim: fake});
        }
      this.drawBoundLine({boxSize, boxNb: size, pos: 'down', delim: delims});
    };

    this.display = () => {
      console.log('grid');
      console.log(this.myGridViz);
      return this;
    };

    this.cellGenerator = (options) => {
      let cell = {content: this.initCellContent()};
      Object.assign(cell, this.defaultCellOptions);
      if (!options) {
        return cell;
      }
      (options.maleGoofChar && typeof options.maleGoofChar === 'string') ? cell.maleGoofChar = options.maleGoofChar.slice(0, 1): null;
      (options.femaleGoofChar && typeof options.femaleGoofChar === 'string') ? cell.femaleGoofChar = options.femaleGoofChar.slice(0, 1): null;
      console.log({cell});
      return cell;
    };

    this.initCellContent = () => {
      let content = [];
      for (let idx = 0; idx < this.cellSize; idx++) {
        content.push(' '.repeat(this.cellSize));
      }
      return content;
    };

    this.drawGrid = (grid) => {

    }
  }

}

class VizPhas { // implement to client rendering interface
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.myGridViz = this.generateGrid;
  }
}

module.exports = {term: VizTerm, phas: VizPhas};


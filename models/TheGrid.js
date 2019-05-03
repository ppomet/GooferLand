class TheGrid {
  constructor(width, height) {
    if (height < 0 || width < 0) {
      throw new Error('the grid can\'t have negative side');
    }
    this.width = width || 1;
    this.height = height || 1;
    this.column = Array(this.height).fill(null);
    for (let i = 0; i < this.height; i++) {
      this.column[i] = Array(this.width).fill(null);
    }
    console.log('this in the grid', this);

    // this.row = new array();
    
  }

  getCaseContent(x, y) {
    return; //content{}
  }

  setCaseContent(x, y, content) {// content est un objet

  }
}

module.exports = TheGrid;
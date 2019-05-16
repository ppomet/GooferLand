Colors = require('colors/safe');

class HeaderFooter {
  constructor (charDelim, repeatDelim, numberOfJumpLines, isTests) {
    this.charDelim = charDelim || '-';
    this.jumpLines = numberOfJumpLines || 1;
    this.charDelimRepeat = repeatDelim || 15;
    this.delimStr = this.charDelim.repeat(this.charDelimRepeat);
    if (isTests) {
      this.testStr = 'des Tests';
    } else {
      this.testStr = '';
      
    }
    console.log('teststr >=', this.testStr);
    console.log('char delim >:' + this.charDelim + ':<');
  }
  
  header(title, comment, msgColor, delimColor) {
    if (!comment) {comment = ''}
    if (msgColor || delimColor) {
      this.emptylines(this.jumpLines);
      this.coloredMsg(`Début ${this.testStr}${comment} ${title}`, msgColor, delimColor);
      this.emptylines(this.jumpLines);
    } else {
      this.genericMsg(`Début ${this.testStr}${comment} ${title}`, true);
    }
  }
  
  footer(title, comment, msgColor, delimColor) {
    if (!comment) {comment = ''}
    if (msgColor || delimColor) {
      this.emptylines(this.jumpLines);
      this.coloredMsg(`Fin ${this.testStr}${comment} ${title}`, msgColor, delimColor);
      this.emptylines(this.jumpLines);
    } else {
      this.genericMsg(`Fin ${this.testStr}${comment} ${title}`, true);
    }
  }
  
  genericMsg (msg, jumps) {
    if (jumps) {
      this.emptylines(this.jumpLines);
    }
    console.log(`${this.delimStr} ${msg} ${this.delimStr}`);
    if (jumps) {
      this.emptylines(this.jumpLines);
    }
  }
  
  coloredMsg(msg, msgColor, delimColor) {
    let myMsg = '';
    if (delimColor) {
      myMsg += this.colorSelector(this.delimStr, delimColor);
    }
    myMsg += ` ${this.colorSelector(msg, msgColor)} `;
    if (delimColor) {
      myMsg += this.colorSelector(this.delimStr, delimColor);
    }
    console.log(myMsg);
  }

colorSelector(txt, color) {
  if (color) {
    switch (color.toLowerCase()) {
      case ('red'):
        return Colors.red(txt);
      case ('blue'):
        return Colors.blue(txt);
      case ('green'):
        return Colors.green(txt);
      case ('yellow'):
        return Colors.yellow(txt);
      default:
        return Colors.red(txt);
    }
  } else {
    return Colors.red(txt);
  }
}
  
  emptylines(nbr) {
    let idx = 0;
    while (idx < nbr) {
      console.log();
      idx++;
    }
  }
}

module.exports = HeaderFooter;
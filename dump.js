'use strict';

var dump = function() {

  var gunner = require('./gunmyth.js')({log: true}),
      text = [];

  // return {
  //   hybridize: newText,
  //   woodsplitter: woodSplitter,
  //   singleNouner: singleNouner,
  //   splitterPunct: splitterPunct,
  //   splitterPos: splitterPos,
  //   nounReplaceForward: replacer('NN', direction.forward),
  //   nounReplaceReverse: replacer('NN', direction.reverse)
  // };

  for (let i = 0; i < 100; i++) {
    // text.push(gunner('nounReplaceForward'));
    text.push(gunner('singleNouner'));
  }

  console.log(text.join('\n'));

};

dump();

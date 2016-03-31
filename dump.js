'use strict';

var dump = function() {

  var gunner = require('./gunmyth.js')({log: true}),
      text = [];

  for (let i = 0; i < 100; i++) {
    text.push(gunner());
  }

  console.log(text.join('\n'));

};

dump();

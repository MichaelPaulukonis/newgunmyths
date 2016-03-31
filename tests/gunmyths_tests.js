'use strict';

(function() {

  var chai = require('chai'),
      expect = chai.expect,
      gunner = require('../gunmyth.js')({log: false});


  describe('main gunmyth function', function() {

    it('should return a string', function() {

      var text = gunner();
      expect(text).to.not.be.null;
      expect(text).to.have.length.above(5);

    });

    it('should start with a capital letter', function() {

      var text = gunner(),
          firstChar = text.charAt(0);

      expect(firstChar.toUpperCase()).to.equal(firstChar);

    });

    // now this is not guaranteed
    // maybe we should cycle though a larger number of tests?
    it('should end with a punctuation mark', function() {

      var text = gunner(),
          lastChar = text.charAt(text.length-1);

      expect(lastChar).to.match(/[.!?]/);

    });

  });

}());

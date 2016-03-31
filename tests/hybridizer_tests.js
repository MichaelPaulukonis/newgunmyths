'use strict';
// 2016-03-28T12:10:23.983330+00:00 app[scheduler.2509]: m1: Demons.
// 2016-03-28T12:10:23.983338+00:00 app[scheduler.2509]: m2: The Second Amendment of our Bill of Rights is my Concealed Weapons Permit, period.
// 2016-03-28T12:10:24.727852+00:00 app[scheduler.2509]: strategy: woodsplitter
// 2016-03-28T12:10:24.729609+00:00 app[scheduler.2509]:  Second Amendment of our Bill of Rights is my Concealed Weapons Permit, period.

// TODO: get tests set up.

(function() {

  var chai = require('chai'),
      expect = chai.expect,
      hybridizer = require('../hybridizer.js')({log: true});


  describe('main hybrize function', function() {

    it('two strings of multiple words return a string', function() {

      it('two strings blah blah blah', function() {
        var s1 = 'This is the thing of which we speak.'
        ,s2 = 'This is my rifle, this is my gun.'
        ,h1 = hybridizer.hybridize(s1, s2);

        expect(h1).to.not.be.null;
      });

    });

    describe('woodSplitter tests', function() {


      // NOTE: the inverse case is not true (second second has only one word succeeds if first has > 1)
      it('fails when the first sentence has only one word', function() {
        var s1 = 'Demons.'
        ,s2 = 'The Second Amendment of our Bill of Rights is my Concealed Weapons Permit, period.'
        ,h1 = hybridizer.woodsplitter(s1, s2);

        console.log(h1);

        expect(h1).to.not.be.null;
        expect(s2.indexOf(h1)).to.equal(-1);

      });

    });

  });

}());

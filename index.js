'use strict';

// ### Libraries and globals
var config = require('./config.js'),
    Twit = require('twit'),
    T = new Twit(config),
    gunner = require('./gunmyth.js')(config);

// ### Utility Functions

var logger = function(msg) {
  // console.log('logging?: ' + config.log);
  if (config.log) console.log(msg);
};

var tweeter = function() {

  try {

    var newSentence = gunner();

    console.log(newSentence);

    if(!newSentence) {
      logger('NOTHING NOTHING NOTHING');
    }
  } catch (err) {
    console.log('Error: ' + err.message);
  }

  if (newSentence.length === 0 || newSentence.length > 140) {
    tweeter();
  } else {
    if (config.tweet_on) {
      T.post('statuses/update', { status: newSentence }, function(err) {
        if (err) {
          console.log('error:', err);
        }
        else {
          // nothing on success
        }
      });
    }
  }

};


tweeter();

/**
 TODO: break out the core of the hybridizer into a class so it can be unit-tested
 TODO: the source should also be a strategy (allows me to evaluate)
 TODO: pick and choose random or defined via config
 TODO: make it simple, and put it online ASAP
 TODO: then iterate the above stuff

 **/

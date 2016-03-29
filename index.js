// ### Libraries and globals
var pos = require('pos');
var config = require('./config.js');
var Twit = require('twit');
var T = new Twit(config);
var motifCore = require('./motif.array.txt');
var motifs = JSON.parse(JSON.stringify(motifCore)),
    hybridizer = require('./hybridizer.js');

// ### Utility Functions

var logger = function(msg) {
  // console.log('logging?: ' + config.log);
  if (config.log) console.log(msg);
};

// adding to array.prototype caused issues with nlp_compromise
// not used here, but hey, good practice anyway.
var pick = function(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
};

var pickRemove = function(arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr.splice(index,1)[0];
};

// return true or false
// 50-50 chance (unless override)
var coinflip = function(chance) {
  if (!chance) { chance = 0.5; }
  return (Math.random() < chance);
};


var capitalizeWord = function(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};


var gunsguns = [
  'Gun. Bullet. Rifle. Shooter.',
  'Bullet. Rifle. Shooter. Gun.',
  'Rifle. Shooter. Gun. Bullet.',
  'Guns kill.',
  'It\'s not the bullet that kills you, it\'s the hole.',
  'The only thing that stops a bad guy with a gun is a good guy with a gun.',
  'Guns don\'t kill people, people kill people.',
  'I have a very strict gun control policy: if there\'s a gun around, I want to be in control of it.',
  'The Second Amendment of our Bill of Rights is my Concealed Weapons Permit, period.',
  'A fear of weapons is a sign of retarded sexual and emotional maturity.',
  'An armed society is a polite society',
  'There are no dangerous weapons. There are only dangerous men.',
  'But if someone has a gun and is trying to kill you ... it would be reasonable to shoot back with your own gun.',
  'That rifle on the wall of the labourer\'s cottage or working class flat is the symbol of democracy. It is our job to see that it stays there.',
  'It\'s better to have a gun and not need it than to need a gun and not have it.',
  'A sword never kills anybody; it is a tool in the killer\'s hand.',
  'No free man shall ever be debarred the use of arms.',
  'I prefer dangerous freedom over peaceful slavery',
  'They that can give up essential liberty to obtain a little temporary safety deserve neither liberty nor safety.',
  'Beware the man who only has one gun. He probably knows how to use it!',
  'An armed man will kill an unarmed man with monotonous regularity',
  'If you carry a gun, people will call you paranoid. That\'s ridiculous. If I have a gun, what in the hell do I have to be paranoid for.',
  'The two most important rules in a gunfight are: always cheat and always win.',
  'Gun control is like trying to reduce drunk driving by making it tougher for sober people to own cars.',
  'The right to buy weapons is the right to be free.',
  'I\'ll give you my gun when you pry it from my cold, dead hands.',
  'I\'ll give you my gun when you take it from my cold, dead hands.'
];


var tweeter = function(texts) {

  if (motifs.length < 2) {
    motifs = JSON.parse(JSON.stringify(motifCore));
  }

  // TODO: these need to be swapped, sometimes....
  var myth1, myth2;
  if(coinflip()) {
    myth1 = pickRemove(motifs)[1];
    myth2 = pickRemove(gunsguns);
  } else {
    myth2 = pickRemove(motifs)[1];
    myth1 = pickRemove(gunsguns);
  };

  logger('\nm1: ' + myth1 + '\nm2: ' + myth2);

  // var strategy = getStrategy(myth1, myth2);

  try {
    var newSentence = hybridizer.hybridize(myth1, myth2);
    // var newSentence = singleNouner('gun. bullet. rifle. shooter.', myth1);
    // logger(newSentence);
    // newSentence = newText(newSentence, 'gun');

    // TODO: guns guns guns
    // newSentence = newSentence.slice(0, newSentence.length -1) + ' and a gun.';

    // capitalize first word
    newSentence = capitalizeWord(newSentence);

    console.log(newSentence);

    if(!newSentence) {
      logger('NOTHING NOTHING NOTHING');
    }
  } catch (err) {
    console.log('Error: ' + err.message);
  }

  if (newSentence.length === 0 || newSentence.length > 140
      // don't allow sentence to be a single substring of an original text
      || myth1.indexOf(newSentence) > -1 || myth2.indexOf(newSentence) > -1
     ) {
    tweeter();
  } else {
    if (config.tweet_on) {
      T.post('statuses/update', { status: newSentence }, function(err, reply) {
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

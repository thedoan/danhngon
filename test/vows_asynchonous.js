var vows   = require('vows');
var assert = require('assert');
var tobi   = require('tobi');
var fs	   = require('fs');
vows.describe('File Stats').addBatch({
	'Read stats file':{ 
		topic: function () {
			 fs.stat('./test', this.callback);
		},
		'can be accessed': function (err, stat) {
		    assert.isNull   (err);        // We have no error
		    assert.isObject (stat);       // We have a stat object
	    },
	    'is not empty': function (err, stat) {
		    assert.isNotZero (stat.size); // The file size is > 0
	    }
	}
}).export(module);

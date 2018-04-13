var vows = require('vows'),
    assert = require('assert');

// Create a Test Suite
vows.describe('Division by Zero').addBatch({
	//A context
    'when dividing a number by zero': {
		//topic
        topic: function () { return 42 / 0 },
		//vow
        'we get Infinity': function (topic/*value return by topic above*/) {
			//assert on argument return by topic
            assert.equal (topic, Infinity);
        }
    },
	//Another context
    'but when dividing zero by zero': {
		//topic
        topic: function () { return 0 / 0 },
		//sub context
        'we get a value which': {
			//vow
            'is not a number': function (topic) {
                assert.isNaN (topic);
            },
			//vow
            'is not equal to itself': function (topic) {
                assert.notEqual (topic, topic);
            }
        }
    }
}).export(module); // Run it

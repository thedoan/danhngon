var assert = require('assert');
var Todo = require('../models/Todo');
var testCompleted = 0;
var todo;
describe("Test Todo model", function(){
	before(function(){
		todo = new Todo();
	});
	describe("Test Add item in todo", function(){
		it("todo.getCount = 1 when add first item", function(){
			todo.add("tobi");
			assert.equal(todo.getCount(),1);
		});
		it("todo.getCount = 2 when add second item", function(){
			todo.add("tobi 2");
			assert.equal(todo.getCount(),2);
		});
		it("todo.getCount = 0 when delete all item", function(){
			todo.deleteAll();
			assert.equal(todo.getCount(),0);
		});
	});
	after(function(){
		todo.deleteAll();
	});
});

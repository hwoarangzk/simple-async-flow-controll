# simple-async-flow-controll
Simple realization of async flow controll

How to use:
<pre>
var async = require('./index'),
    fs = require('fs');
    
async.parallel([
	function(callback) {
		fs.readFile('1.json', 'utf8', callback);//returns 'data'
	},
	function(callback) {
		fs.readFile('2.json', 'utf8', callback);//returns 'content'
	}
], function(err, content) {
	if (err) {
		return console.log(err);
	}
	console.log(content);//[data, content]	
});

async.waterfall([
	function(cb) {
		fs.readFile('1.json', 'utf8', cb);//returns '2.json'
	},
	function(result, cb) {
		fs.readFile(result, 'utf8', cb);//returns '3.json'
	},
	function(result, cb) {
		fs.readFile(result, 'utf8', cb);//returns 'content'
	}
], function(err, content) {
	console.log(content);//content
});
</pre>

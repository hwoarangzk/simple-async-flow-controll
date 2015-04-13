var async = function(funcArray, callback) {
	var funcLength = funcArray.length,
		result = [],
		isErr = false;
	for (var i = 0, len = funcArray.length; i < len; i++) {
		if (isErr) {
			break;
		}
		(function(i) {
			var func = funcArray[i];
			func(cb);
			function cb(err, ret) {
				if (err) {
					isErr = true;
					return callback(err);
				}
				result[i] = ret;
				if (!--funcLength) {
					callback(null, result);
				}
			};	
		})(i);
	}
};

//test
var fs = require('fs');
async([
	function(callback) {
		//fs.readFile('data.json', 'utf8', callback);
		setTimeout(function() {
			callback(null, 'one');
		}, 100);
	},
	function(callback) {
		//fs.readFile('content.json', 'utf8', callback);
		setTimeout(function() {
			callback(null, 'two');
		}, 200);
	}
], function(err, content) {
	if (err) {
		return console.log(err);
	}
	console.log(content);//[data, content]	
});

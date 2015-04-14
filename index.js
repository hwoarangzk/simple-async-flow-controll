var async = {};

async.parallel = function(funcArray, callback) {
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

async.waterfall = function(funcArray, callback) {
	var funcLength = funcArray.length,
		firstDone = false;

	var func = funcArray.shift();

	function cb(err, result) {
		if (err) {
			return callback(err);
		}
		if (funcArray.length) {
			fn = funcArray.shift();
			fn(result, arguments.callee);
		} else {
			callback(null, result);
		}
	}

	func(cb);
};

module.exports = exports = async;

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
		result = null,
		firstDone = false;

	var func = funcArray.shift();

	function cb(err, data) {
		if (err) {
			return callback(err);
		}
		result = data;
		if (funcArray.length) {
			fn = funcArray.shift();
			fn(result, arguments.callee);
		} else {
			callback(null, data);
		}
	}

	func(result, cb);
};

module.exports = exports = async;

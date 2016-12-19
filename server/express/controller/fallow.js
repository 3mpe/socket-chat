const User = require('../models/users');
const fallow = {};


function update(params, updateParams, calback) {
	if (calback instanceof Function) { User.findByIdAndUpdate(params, updateParams, calback()); }
};

fallow.fallowed = function (request, response, next) {
	User.find({})
		.or([{ 'fallow.followed.user_id': request.cookies.foundUser._id },
			{ 'fallow.follower.user_id': request.params.user_id }
		])
		.exec(function (err, results) {
			return response.json(results);
		});
};

fallow.fallower = function (request, response, next) {

	User.find({})
		.or([{ 'fallow.followed.user_id': request.params.user_id },
			{ 'fallow.follower.user_id': request.cookies.foundUser._id }
		])
		.exec(function (err, results) {
			return response.json(results);
		});

};

fallow.storeFallower = function (request, response, next) {
	if (request.cookies.foundUser._id === request.params.users) {
		return response.send(403);
	}

	// fallowed is exist ? 
	var isExist = request.cookies.foundUser["fallow"].followed.filter(function (item) {
		return item.user_id === request.params.user_id;
	});

	if (isExist && request.cookies.foundUser["fallow"].followed.length) {
		return response.json({ message: ' You\'re already following ' });
	}

	// We added followed 
	User.findByIdAndUpdate({ _id: request.cookies.foundUser._id }, { $push: { 'fallow.followed': { user_id: request.params.user_id } } }, { safe: true, upsert: true },
		function (error, data) {
			// We added follower 
			User.findByIdAndUpdate({ _id: request.params.user_id }, { $push: { 'fallow.follower': { user_id: request.cookies.foundUser._id } } }, { safe: true, upsert: true },
				function (error, data) {
					return response.json({ message: 'fallowed' });
				});
		});
};


module.exports = {
	fallow
}


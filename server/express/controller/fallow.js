const User = require('../models/users');
const User_fallow = require('../models/fallow');
const fallow = {};


function findUser(request, response, calback) {
	User.findOne({ token: request.token }, { __v: 0 }, function (error, foundUser) {
		if (error) { response.json({ message: error.errors }); }
		if (calback instanceof Function) {
			calback(foundUser);
		}
	});
};

function update(params, updateParams, calback) {
	if (calback instanceof Function) {
		User_fallow.findByIdAndUpdate(params, updateParams, calback());
	}
};




fallow.index = function (request, response, next) {
	findUser(request, response, function (foundUser) {
		User_fallow.find({ user_id: foundUser.user_id }, function (error, User_data) {
			if (error) {
				return response.json({ message: error.errors });
			}
			return response.json({ fallowed: User_data });
		});
	});
};

fallow.storeFallowing = function (request, response, next) {
	findUser(request, response, function (foundUser) {
		var params = { follower_id: foundUser._id, followed_id: request.params.fallowing_id };
		User_fallow.findOne(params, function (error, foundFollow) {
			if (error) { response.json({ message: error.errors }); }

			if (foundFollow) {
				return response.json({ message: 'fallowing is exist !' });
			} else {
				var data = new User_fallow(params);
				data.save(function (error, fallow) {
					if (error) {
						return response.json({ error: error.errors });
					}
					return response.json({ message: 'fallowed!', data: fallow });
				});
			}

		});
	});
};


module.exports = {
	fallow
}


const User = require('../models/users');
const User_fallow = require('../models/fallow');
const fallow = {};


function findUser(request, response, calback) {
	User.find({ token: request.token }, function (error, foundUser) {
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
		foundUser.find({ user_id: request.body.fallowing_id }, function (error, findfallowing_id) {
			if (error) { response.json({ message: error.errors }); }
			if (findfallowing_id.length > 0) {
				return response.json({ message: 'fallowing is exist !' });
			} else {
				var data = new User_fallow({
					fallowing: [{ name: { first: request.body.first, last: request.body.last } }]
				});
				data.save(function (error, fallow) {
					if (error) {
						return response.json({ error: error.errors });
					}
					return response.json({ message: 'fallowing update!', data: fallow });
				});
			}

		});
	});
};
fallow.storeFallowed = function (request, response, next) {
	findUser(request, response, function (foundUser) {
		findUser.find({ user_id: request.body.fallowed_id }, function (error, findfallowed_id) {
			if (error) { response.json({ message: error.errors }); }
			if (findfallowed_id.length > 0) {
				return response.json({ message: 'fallowed is exist !' });
			} else {
				var data = new User_fallow({
					fallowed: [{ name: { first: request.body.first, last: request.body.last } }]
				});
				data.save(function (error, fallow) {
					if (error) {
						return responseonse.json({ error: error.errors });
					}
					return responseonse.json({ message: 'fallowing update!', data: fallow });
				});
			}
		});
	});
};
fallow.deleteFallowing = function (request, response, next) {
	findUser(request, response, function (foundUser) {
		update({ user_id: foundUser.user_id, fallowing_id: request.body.fallowing_id }, { status: 'Deleted' }, function (foundFallo) {
			if (error) { response.json({ message: ' fallowing is not deleted! ' }); }
			return response.json({ message: 'fallowing deleted !', data: foundFallo });
		});
	});
};
fallow.deleteFallowed = function (request, response, next) {
	findUser(request, response, function (foundUser) {
		update({ user_id: foundUser.user_id, fallowed_id: request.body.fallowed_id }, { status: 'Deleted' }, function (foundFallo) {
			if (error) { response.json({ message: ' fallowed is not deleted! ' }); }
			return response.json({ message: 'fallowed deleted !', data: foundFallo });
		});
	});
};

module.exports = {
	fallow
}


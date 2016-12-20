const Token = require('../lib/token');
const User = require('../models/users');

const userCrud = {};

/* find mongoose item and update  */
function update(params, updateParams, calback) {
	if (calback instanceof Function) {
		User.findByIdAndUpdate(params, updateParams, calback);
	}
};

userCrud.me = function (request, response, next) {
	if (request.cookies.foundUser === null) {
		return response.json({ message: 'find user not found !' });
	}
	if (request.cookies.foundUser.length < 1) { response.json({ message: 'You must log in' }).send(403); }
	return response.json({ data: request.cookies.foundUser });
};
userCrud.login = function (request, response, next) {
	User.findOne({ email: request.body.email, password: request.body.password }, function (err, user) {
		if (err) {
			response.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			if (user) {
				var token = Token({ email: user.email, phone: user.phone });
				update({ _id: user._id }, { token: token }, function (error, data) {
					response.json({ type: true, message: 'Login successful', status: user.status, token: token });
				});
			} else {
				response.json({
					type: false,
					data: 'User not found !'
				});
			}
		}
	});
};
userCrud.logout = function (request, response, next) {
	update({ token: request.cookies.token }, { token: '' }, function (error, data) {
		response.json({
			type: true,
			data: 'user is logout !',
		});
	});
};


userCrud.store = function (request, response, next) {
	if (request.body === undefined || request.body.email === undefined || request.body.password === undefined) {
		return response.status(403).json({ message: 'body can not be empty' });
	}
	User.find({ email: request.body.email, password: request.body.password }, { _id: 0, __v: 0 }, function (error, findUser) {
		if (error) {
			return response.status(422).json({ error: error.errors });
		}
		if (findUser.length > 0) {
			return response.json({ message: ' This user is available ', data: findUser });
		} else {
			var { token } = require('../lib/token');
			var data = {
				token: token,
				name: {
					first: request.body.first,
					last: request.body.last
				},
				age: request.body.age,
				residance: request.body.residance,
				email: request.body.email,
				password: request.body.password,
				phone: request.body.phone,
				status: 'Active'
			}
			var newUser = new User(data);
			newUser.save(function (error, savedUser) {
				if (error) {
					return response.status(422).json({ error: error.errors });
				}
				return response.json({ message: 'user added!', data: savedUser });
			});
		}
	});
};
userCrud.update = function (request, response, next) {
	update({ token: request.cookies.token }, request.body, function (error, item) {
		if (error) {
			return response.json(err.errors);
		}
		return response.status(200).json({ message: 'user updated !', data: item });
	});
};
userCrud.delete = function (request, response, next) {
	update({ token: request.cookies.token }, { status: 'Deleted' }, function (error, item) {
		if (error) { response.json({ message: ' user is not deleted! ' }); }
		return response.json({ message: 'user deleted !', data: item });
	});
};

module.exports = {
	userCrud
}


const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const userCrud = {};

function update(params, updateParams, calback) {
	if (calback instanceof Function) {
		Users.findByIdAndUpdate(params, update, calback());
	}
};

userCrud.login = function (request, response, next) {
	Users.findOne({ email: request.body.email, password: request.body.password }, function (err, user) {
		if (err) {
			response.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			if (user) {
				var token = jwt.sign(user, process.env.JWT_SECRET);
				update({ _id: user._id }, { token: token }, function (error, data) {
					response.json({
						type: true,
						data: data,
						token: token
					});
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
	Users.findOne({ token: request.headers['Authorization'] }, function (error, user) {
		if (error) { response.send(error); } else {
			update({ token: request.headers['Authorization'] }, { token: null }, function (error, data) {
				response.json({
					type: true,
					data: 'user is logout !',
				});
			});
		}
	});
};
userCrud.store = function (request, response, next) {
	var token = jwt.sign(user, process.env.JWT_SECRET);
	var data = {
		token: token,
		name: request.body.name,
		age: request.body.age,
		residance: request.body.residance,
		email: request.body.email,
		password: request.body.password,
		phone: request.body.phone,
		status: 'Active'
	}

	Users.findOne(data, function (err, User_data) {
		if (User_data.length > 0) {
			return response.status(200).json({ message: 'user is exist !' });
		}
		var newUser = new User(data);
		newUser.save(function (error, savedUser) {
			if (error) {
				return response.status(422).json(error);
			}
			return response.json({ message: 'user added!', data: savedUser });
		});
	});
};

userCrud.update = function (request, response, next) {
	var data = {
		name: request.body.name,
		age: request.body.age,
		residance: request.body.residance,
		email: request.body.email,
		password: request.body.password,
		phone: request.body.phone,
		status: request.body.status
	}
	update({ _id: request.body.id }, data, function (error, item) {
		if (error) {
			return response.json(err.errors);
		}
		return response.status(200).json({ message: 'user updated !', data: item });
	});
};

userCrud.delete = function (request, response, next) {
	update({ _id: request.body.id }, { status: 'Deleted' }, function (error, item) {
		if (error) { response.json({ message: ' user is not deleted! ' }); }
		return response.json({ message: 'user deleted !', data: item });
	});
};

module.exports = {
	userCrud
}


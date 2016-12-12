const User = require('../models/users');
const User_fallow = require('../models/fallow');
const fallow = {};

fallow.index = function (req, resp, next) {
	User.find({ _id: req.body.user_id }, function (error, User_data) {
		if (error) { return resp.json({ message: error.errors }); }
		return resp.json({ fallowed: User_data });
	});
};
fallow.storeFallowing = function (req, resp, next) {
	return resp.json({message: 'ok '});	
};
fallow.storeFallowed = function (req, resp, next) {
	return resp.json({message: 'ok '});
};
fallow.updateFallowing = function (req, resp, next) {
	return resp.json({message: 'ok '});
};
fallow.updateFallowed = function (req, resp, next) {
	return resp.json({message: 'ok '});
};

fallow.deleteFallowing = function (req, resp, next) {
	return resp.json({message: 'ok '});
};
fallow.deleteFallowed = function (req, resp, next) {
	return resp.json({message: 'ok '});
};

module.exports = {
	fallow
}


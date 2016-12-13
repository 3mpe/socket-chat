function load(app) {

	const { userCrud } = require('../controller/user');
	app.post('/user/login', userCrud.login);
	app.post('/user/store', userCrud.store);
	app.put('/user/update', userCrud.update);
	app.delete('/user/delete', userCrud.delete);

	const { fallow } = require('../controller/fallow');
	app.get('/user/fallow', fallow.index);
	app.post('/user/fallowing/:fallowing_id', fallow.storeFallowing);
	app.post('/user/fallowed/:fallowed_id', fallow.storeFallowed);
	app.delete('/user/fallow/:fallowing_id', fallow.deleteFallowing);
	app.delete('/user/fallow/:fallowed_id', fallow.deleteFallowed);

	const { message } = require('../controller/message');
	app.get('/user/:user_id/message', message.index);
	app.delete('/user/:user_id/message', message.delete);
}
module.exports = {
	load
};


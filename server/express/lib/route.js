function load(app) {

	const { userCrud } = require('../controller/user');
	app.post('/user/login', userCrud.login);
	app.post('/user/store', userCrud.store);
	app.put('/user/update/:user_id', userCrud.update);
	app.delete('/user/delete/:user_id', userCrud.delete);

	const { fallow }  = require('../controller/fallow');
	app.get('/user/:user_id/fallow', fallow.index);
	app.post('/user/:user_id/fallowing/:fallowing_id', fallow.storeFallowing);
	app.post('/user/:user_id/fallowed/:fallowed_id', fallow.storeFallowed);
	app.delete('/user/:user_id/fallow/:fallowing_id', fallow.deleteFallowing);
	app.delete('/user/:user_id/fallow/:fallowed_id', fallow.deleteFallowed);

	const { message } = require('../controller/message');
	app.get('/user/:user_id/message', message.index);
	app.delete('/user/:user_id/message', message.delete);
}
module.exports = {
	load
};


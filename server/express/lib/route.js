function load(app) {

	const { userCrud } = require('../controller/user');
	app.get('/user/me', userCrud.me);
	app.post('/user/login', userCrud.login);
	app.post('/user/store', userCrud.store);
	app.put('/user/update', userCrud.update);
	app.delete('/user/delete', userCrud.delete);

	const { fallow } = require('../controller/fallow');
	app.get('/user/fallowed/:user_id', fallow.fallowed);
	app.get('/user/fallower/:user_id', fallow.fallower);
	app.post('/user/fallowing/:user_id', fallow.storeFallower);

	const { message } = require('../controller/message');
	app.get('/user/message', message.index);
	app.post('/user/message/sender/:reciver_id', message.storesender);
	app.post('/user/message/reciver/:sender_id', message.storereciver);
	app.delete('/user/message/:sender_id', message.deletesender);
	app.delete('/user/message/:reciver_id', message.deletereciver);
}
module.exports = {
	load
};


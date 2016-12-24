function load(app) {

	const { userCrud } = require('../controller/user');
	app.get('/api/user/me', userCrud.me);
	app.post('/api/user/login', userCrud.login);
	app.post('/api/user/store', userCrud.store);
	app.put('/api/user/update', userCrud.update);
	app.delete('/api/user/delete', userCrud.delete);

	const { fallow } = require('../controller/fallow');
	app.get('/api/user/fallowed/:user_id', fallow.fallowed);
	app.get('/api/user/fallower/:user_id', fallow.fallower);
	app.post('/api/user/fallowing/:user_id', fallow.storeFallower);

	const { message } = require('../controller/message');
	app.get('/api/user/message', message.index);
	app.post('/api/user/message/sender/:reciver_id', message.storesender);
	app.post('/api/user/message/reciver/:sender_id', message.storereciver);
	app.delete('/api/user/message/:sender_id', message.deletesender);
	app.delete('/api/user/message/:reciver_id', message.deletereciver);
}
module.exports = {
	load
};


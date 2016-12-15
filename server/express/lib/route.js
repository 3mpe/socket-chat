function load(app) {

	const { userCrud } = require('../controller/user');
	app.get('/user/me', userCrud.me);
	app.post('/user/login', userCrud.login);
	app.post('/user/store', userCrud.store);
	app.put('/user/update', userCrud.update);
	app.delete('/user/delete', userCrud.delete);

	const { fallow } = require('../controller/fallow');
	app.get('/user/fallow', fallow.index);
	app.post('/user/fallowing/:fallowing_id', fallow.storeFallowing);

	const { message } = require('../controller/message');
	app.get('/user/message', message.index);
	app.post('/user/message/:reciver_id', message.storesender);
	app.post('/user/message/:sender_id', message.storereciver);
	app.post('/user/message/:sender_id', message.deletesender);
	app.post('/user/message/:reciver_id', message.deletereciver);
}
module.exports = {
	load
};


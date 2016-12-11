const { userCrud } = require('../controller/user');

function load(app) {
	/* crud operations */
	app.post('/user/login', userCrud.login);
	app.post('/user/store', userCrud.store);
	app.put('/user/update/:user_id', userCrud.update);
	app.delete('/user/delete/:user_id', userCrud.delete);

	const { fallow } = require('../controller/fallow');
	app.get('/user/:user_id/fallow', fallow.index);
	app.post('/user/:user_id/fallow', fallow.store);
	app.put('/user/:user_id/fallow', fallow.update);
	app.delete('/user/:user_id/fallow', fallow.delete);

	const { message } = require('../controller/message');
	app.get('/user/:user_id/message',message.index);
	app.delete('/user/:user_id/message',message.delete);
}
module.exports = { 
	load 
};
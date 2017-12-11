var { mongoose } = require('../server/db/mongoose');

var { Todo } = require('../server/models/todo');
var { User } = require('../server/models/user');

var id = '6a27890b744d6a14264a3c81' ;
User.findById(id).then((docs) => {
	
	if (!docs) {
		console.log('Cannot Find the user with the relevant ID');
		return;
	}
	console.log('docs', docs);
}, (e) => {
	console.log('There was an error fetching the user');
});
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		console.log('There was an error with the database');
		return;
	}
	db.collection('Users').deleteOne({name: 'Saurish Kar'}).then((response) => {
		console.log('The record has been deleted');
	});
});
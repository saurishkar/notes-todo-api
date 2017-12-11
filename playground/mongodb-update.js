const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if(err) {
		console.log('There was an error with the database');
		return;
	}
	db.collection('Users').findOneAndUpdate(
		{name: 'Andrew'},
		{$inc: {age: 5}},
		{returnOriginal: false}).then((response) => {
		console.log('the doc has been updated');
		db.close();
	});

});
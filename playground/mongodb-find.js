const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		console.log('Unable to connect to the database server');
	} else {
		console.log('Connected to the MongoDB server');
		db.collection('Users').find({name: 'Saurish Kar'}).toArray().then((docs) => {
			console.log(JSON.stringify(docs, undefined, 2));
		});
	}
	// db.close();
});
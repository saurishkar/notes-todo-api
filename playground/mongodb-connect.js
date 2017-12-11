const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		console.log('Unable to connect to the database server');
	} else {
		console.log('Connected to the MongoDB server');
		// db.collection('Todos').insertOne({
		// 	text: 'Some Text',
		// 	completed: false
		// }, (err, result) => {
		// 	if(err) {
		// 		console.log('There was a problem.');
		// 	} else {
		// 		console.log(JSON.stringify(result.ops));
		// 	}
		// });
		// 
		db.collection('Users').insertOne({
			name: 'Saurish Kar',
			age: 24
		}, (err, result) => {
			if(err) {
				console.log('There was a problem.');
			} else {
				console.log(JSON.stringify(result.ops, undefined, 2));
			}
		});
	}

	db.close(); //closes the connection with the MongoDB server
});
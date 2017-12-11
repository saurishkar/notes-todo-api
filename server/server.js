var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	const { text } = req.body;
	var newTodo = new Todo({
		text
	});
	newTodo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send(todos);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/', (req, res) => {
	res.send('Welcome to My App');
});

app.get('/todos/:id', (req, res) => {

	if(!ObjectID.isValid(req.params.id)) {
		res.status(404).send();
		return;
	}
	Todo.findById(req.params.id).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send(todo);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

module.exports = {
	app
};
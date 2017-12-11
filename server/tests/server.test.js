const expect = require('expect');
const request = require('supertest');
var { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');


const todos = [{
	text: 'First Test Todo',
	_id: new ObjectID('5a2e27e0e84e3842121d7340')
}, {
	text: 'Second Test Todo',
	_id: new ObjectID('5a2e27e0e84e3842121d7338')
}];

before((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos ', () => {
	it('should create a new todo', (done) => {
		var text = 'Test Todo Text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}
				Todo.find().then((todo) => {
					expect(todo.length).toBe(3);
					expect(todo[2].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe('GET /todos', () => {
	it('should fetch all todos', (done) => {

		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.length).toBe(3);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}
				done();
			});
	});
});

describe('GET /todos/:id', () => {
	it('should fetch a todo with the required id', (done) => {
		var text = 'First Test Todo';
		request(app)
			.get('/todos/5a2e27e0e84e3842121d7340')
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end(done);
	});

	it('should send a 400 response if id is not found', (done) => {
		request(app)
			.get('/todos/5a2e27e0e84e3842121d7339')
			.expect(404)
			.end(done);
	});

	it('should send a 404 response on invalid id', (done) => {
		request(app)
			.get('/todos/5a2e27e0e84e384')
			.expect(404)
			.end(done);
	});
});

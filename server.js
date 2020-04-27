const express = require('express');
const uuid = require('uuid').v4;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

const config = require('./config.json');
const Users = require('./database/handleUsersDB');
const Rooms = require('./database/handleRoomsDB');

const port = config.port;

app.use(express.json());
// app.use(express.static('client'));

app.post('/create', (req, res) => {
	const type = req.query.type;

	switch (type) {
		case 'room':
			const room = {
				...req.body,
				messages: [
					// {
					// 	user: 'admin',
					// 	content: `Welcome to ${req.body.name}`
					// }
				],
				id: uuid(),
				users: []
			};
			Rooms.save(room);
			res.status(201).json(room);

			break;

		case 'user':
			const user = {
				...req.body,
				id: uuid(),
				rooms: []
			};

			res.status(201).json(user);

			Users.save(user);
			break;

		default:
			res.status(400).send('incorrect querystring');
	}
});

app.get('/user/:id', async (req, res) => {
	let user = Users.getUserById(req.params.id);

	res.status(200).json(user);
});

app.get('/rooms', (req, res) => {
	res.status(200).json(Rooms.get());
});

app.get('/user/:userId/:roomId', (req, res) => {
	const room = Rooms.getRoomMessages(req.params.roomId);

	res.status(200).send(room);
});

app.delete('/rooms/:id', async (req, res) => {
	const id = req.params.id;

	try {
		Rooms.deleteRoom(id);
		res.sendStatus(204);
	} catch (error) {
		res.sendStatus(500);
	}
});

io.on('connection', (socket) => {
	// clients.push(socket);
	console.log('a user connected');
	socket.on('join', ({ username, roomId }) => {
		// const user = Users.getUserByName(username);
		const theRoom = Rooms.getRoom(roomId);

		socket.join(roomId);

		const adminMessage = {
			user: 'Admin',
			content: `${username}, welcome to the room`
		};

		socket.emit('message', adminMessage);
		socket.broadcast.to(roomId).emit('message', {
			user: 'Admin',
			content: `${username}, has joined te room`
		});
	});

	socket.on('disconnect', () => {
		console.log('A user just left!');
	});

	socket.on('new_message', ({ user, content, roomId }) => {
		// const me = Users.getUserById(socket.id);
		console.log(roomId, 'ID PÅ RUMMET');

		const message = {
			user,
			content
		};
		socket.to(roomId).emit('message', message);

		Rooms.saveMessage(roomId, message);
	});
});

http.listen(port, () => {
	console.log('listening on port ' + port);
});

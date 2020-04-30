const { rooms, save } = require('./brain');

exports.save = (room) => {
	const exists = rooms.entries.find(({ name }) => name === room.name);

	if (exists) {
		console.log('Room-name already exists');
	} else {
		rooms.entries.push(room);
		save(rooms);
	}
};

exports.saveMessage = (id, message) => {
	const idx = rooms.entries.findIndex((room) => room.id === id);

	if (idx !== -1) {
		rooms.entries[idx].messages.push(message);
		save(rooms);
	}
};

exports.get = () => {
	return rooms.entries;
};

exports.getRoom = (id) => {
	const theRoom = rooms.entries.find((name) => name.id === id);
	return theRoom;
};

exports.getRoomMessages = (roomId) => {
	const getRoom = rooms.entries.find((room) => room.id === roomId);

	return getRoom;
};

exports.deleteRoom = (id) => {
	const roomIndex = rooms.entries.findIndex((room) => room.id === id);

	if (roomIndex !== -1) {
		rooms.entries.splice(roomIndex, 1);
		save(rooms);
	} else {
		console.log('Already gone!');
	}
};

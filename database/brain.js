const fs = require('fs');

exports.rooms = {
	entries: require('./store/rooms.json'),
	path: './database/store/rooms.json'
};

exports.users = {
	entries: require('./store/users.json'),
	path: './database/store/users.json'
};

exports.save = ({ entries, path }) => {
	fs.writeFile(path, JSON.stringify(entries), (error) => {
		if (error) {
			console.log(error, 'eroor in fs');
		}
	});
};

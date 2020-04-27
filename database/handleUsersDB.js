const { users, save } = require('./brain');

exports.save = (user) => {
	const exists = users.entries.find(({ id }) => id === user.id);

	if (exists) {
		console.log('user exists');
	} else {
		users.entries.push(user);
		save(users);
	}
};

exports.getUserByName = (name) => {
	const singleUser = users.entries.find((user) => user.name === name);

	return singleUser;
};

exports.getUserById = (id) => {
	const singleUser = users.entries.find((user) => user.id === id);

	return singleUser;
};

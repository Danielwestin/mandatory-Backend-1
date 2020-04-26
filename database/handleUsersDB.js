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

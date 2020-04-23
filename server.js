const express = require('express');

const app = express();

let users = [ { name: 'Viktor' } ];

app.get('/users', (req, res) => {
	res.send({ users });
});

app.listen(8090, () => {
	console.log('started on 8090');
});

import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Login() {
	const [ user, setUser ] = useState({ username: '', password: '' });
	const [ online, setOnline ] = useState({ status: false, id: '' });
	// useEffect(() => {
	// 	// let socket = io('http://localhost:8000');
	// 	// socket.on('message', (data) => {
	// 	// 	console.log(data);
	// 	// });
	// }, []);

	const set = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const submitUser = (e) => {
		e.preventDefault();

		if (user.username.length > 1 && user.password.length > 1) {
			axios
				.post('/create?type=user', user)
				.then((response) => {
					console.log(response.data, 'GREAT SUCCESS');
					window.localStorage.setItem(
						'user',
						JSON.stringify(response.data)
					);
					setOnline({ status: true, id: response.data.id });
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	};

	return (
		<main>
			{online.status && (
				<Redirect
					to={{
						pathname: '/user/' + online.id,
						state: {
							username: user.username
						}
					}}
				/>
			)}

			<h1>Login</h1>
			<form onSubmit={submitUser}>
				<input
					type="text"
					name="username"
					value={user.username}
					onChange={set}
					placeholder="Användarnamn"
				/>
				<input
					type="text"
					name="password"
					value={user.password}
					onChange={set}
					placeholder="Lösenord"
				/>

				<button type="submit">Submit</button>
			</form>
		</main>
	);
}

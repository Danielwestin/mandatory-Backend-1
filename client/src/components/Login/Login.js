import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Login(props) {
	const [ user, setUser ] = useState({
		username: '',
		password: ''
	});
	const [ online, setOnline ] = useState({ status: false, id: '' });

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

					setOnline({ status: true, id: response.data.id });
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	};

	return (
		<main className="Login">
			{online.status && <Redirect to={'/user/' + online.id} />}

			<section className="Login__section">
				<h1>Login</h1>

				<form onSubmit={submitUser} className="Login__section__form">
					<input
						className="Login__input"
						type="text"
						name="username"
						value={user.username}
						onChange={set}
						placeholder="Användarnamn"
						autoFocus
					/>

					<input
						type="password"
						name="password"
						value={user.password}
						onChange={set}
						placeholder="Lösenord"
					/>

					<button type="submit">Submit</button>
				</form>
				<p>Ingen autentisering</p>
			</section>
		</main>
	);
}

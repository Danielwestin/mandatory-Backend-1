import React, { useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

export default function app() {
	useEffect(() => {
		let socket = io('localhost:3000');
		socket.on('message', (data) => {
			console.log(data);
		});
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

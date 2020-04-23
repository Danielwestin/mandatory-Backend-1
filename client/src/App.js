import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let socket = io('localhost:3000');
		socket.on('message', (data) => {
			console.log(data);
		});
	}

	render() {
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
}

export default App;

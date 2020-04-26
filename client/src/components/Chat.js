import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Room from './Room';
import Menu from './Menu';
import { useParams, Route } from 'react-router-dom';
let socket = io('localhost:8000');

// let io = require('socket.io-client');
// let socket = io('http://localhost:3000');

export default function Chat(props) {
	const [ rooms, setRooms ] = useState([]);
	const [ username, setUsername ] = useState('');
	const [ activeRoom, setActiveRoom ] = useState(false);
	const { userId } = useParams();

	useEffect(() => {
		setUsername(props.location.state.username);
		axios.get('/rooms').then((response) => {
			setRooms(response.data);
		});
	}, []);

	// newMessage = (data) => {
	// 	this.setState({ messages: [ ...this.state.messages, data ] });
	// };

	return (
		<React.Fragment>
			<h1>Hello, {username}</h1>
			<Menu
				rooms={rooms}
				setRooms={setRooms}
				setActiveRoom={setActiveRoom}
			/>
			<Route exact path="/user/:userId/:roomId">
				<Room username={username} />
			</Route>
		</React.Fragment>
	);
}

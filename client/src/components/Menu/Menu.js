import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const Menu = ({ rooms, setRooms, username }) => {
	const [ roomName, setRoomName ] = useState('');
	const { userId } = useParams();

	const create = (e) => {
		e.preventDefault();
		if (roomName.length > 1) {
			axios
				.post('/create?type=room', { name: roomName })
				.then((response) => {
					console.log(response.data);
					setRooms([ ...rooms, response.data ]);
					setRoomName('');
				})
				.catch((error) => {
					console.log('Room-name already in use', error);
				});
		}
	};

	const deleteRoom = (e, id) => {
		e.preventDefault();

		axios
			.delete(`/rooms/${id}`)
			.then((response) => {
				setRooms(rooms.filter((room) => room.id !== id));
			})
			.catch((error) => {
				console.log(error, 'error');
			});
	};
	return (
		<aside className="Menu">
			<h1>Hello {username}</h1>
			<form onSubmit={create} className="Menu__form">
				<input
					type="text"
					placeholder="room name"
					value={roomName}
					onChange={(e) => {
						setRoomName(e.target.value);
					}}
				/>
				<button type="submit">Create room</button>
			</form>
			<ul className="Menu__ul">
				{rooms.map((room) => (
					<li key={room.id}>
						<Link to={`/user/${userId}/room/${room.id}`}>
							{room.name}
						</Link>
						<button onClick={(e) => deleteRoom(e, room.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default Menu;

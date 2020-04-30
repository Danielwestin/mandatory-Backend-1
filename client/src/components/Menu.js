import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const Menu = ({ rooms, setRooms }) => {
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
					console.log(error);
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
		<aside>
			<form onSubmit={create}>
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
			<ul>
				{rooms.map((room) => (
					<li key={room.id}>
						<Link to={`/user/${userId}/${room.id}`}>
							{room.name}
						</Link>
						<button onClick={(e) => deleteRoom(e, room.id)}>
							Ta bort {room.id}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default Menu;

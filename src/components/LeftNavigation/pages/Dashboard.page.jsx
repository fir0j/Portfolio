import React, { useState, useReducer } from 'react';
import { auth, changeMail } from '../../../firebase/AuthUI';

export const Dashboard = () => {
	const [ user ] = useState(auth.currentUser);
	const [ newProfile, setNewProfile ] = useState(null);
	const [ , forceUpdateUI ] = useReducer(() => ({}));

	const handleChange = (e) => {
		setNewProfile({ [e.target.name]: e.target.value });
		console.log(newProfile);
	};

	const handleSubmitProfile = (e) => {
		// e.preventDefault();
		user
			.updateProfile(newProfile)
			.then(() => {
				// alert('Profile update successful');
				console.log(user.displayName);
				forceUpdateUI();
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="h-full bg-orange-500">
			<div className="flex justify-around">
				<div className="w-32 h-32">
					<img alt="" src={user.photoURL} />
				</div>
				<div>
					<p>{user.uid}</p>
					<p>{user.displayName}</p>
					<p>{user.email}</p>
					<p>{user.phoneNumber ? user.phoneNumber : 'unknown'}</p>
					<p>{user.emailVerified}</p>
				</div>
			</div>
			<div className="flex flex-col">
				<h2>Update profile</h2>
				<div>
					<input
						type="text"
						placeholder="full name"
						className="border"
						name="displayName"
						onChange={handleChange}
					/>
					<button className="cursor-pointer" onClick={handleSubmitProfile}>
						Submit
					</button>
				</div>
				<div>
					{/* <input className="cursor-pointer border" type="text" placeholder="email" name="email" /> */}
					<button onClick={changeMail}>update Email</button>
				</div>
			</div>
		</div>
	);
};

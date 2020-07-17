import React, { useState, useReducer, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeMail, changePassword, resetPassword, deleteAccount } from '../../../firebase/firebase.utils';

const Dashboard = ({ currentUser }) => {
	const [ newProfile, setNewProfile ] = useState(null);
	const [ , forceUpdateUI ] = useReducer(() => ({}));
	let history = useHistory();

	console.log('current user in dashboard component is', currentUser);

	const handleChange = (e) => {
		setNewProfile({ [e.target.name]: e.target.value });
		console.log(newProfile);
	};

	const handleSubmitProfile = (e) => {
		e.preventDefault();
		currentUser
			.updateProfile(newProfile)
			.then(() => {
				alert('Profile update successful');
				console.log(currentUser.displayName);
				forceUpdateUI();
			})
			.catch((error) => console.log(error));
	};

	const reauthenticate = () => {
		history.push('/reauthenticate');
	};

	return (
		<Fragment>
			{currentUser !== undefined && (
				<div className="h-full bg-orange-500">
					{console.log('hmm..', currentUser)}
					<div className="flex justify-around">
						<div className="w-32 h-32">
							<img alt="" src={currentUser.photoURL} />
						</div>
						<div>
							<p>{currentUser.uid}</p>
							<p>{currentUser.displayName}</p>
							<p>{currentUser.email}</p>
							<p>{currentUser.phoneNumber ? currentUser.phoneNumber : 'unknown'}</p>
							<p>{currentUser.emailVerified}</p>
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
						<div className="border flex flex-col">
							<button onClick={changeMail}>update Email</button>
							<button onClick={changePassword}>changePassword</button>
							<button onClick={() => deleteAccount(currentUser)}>DeleteAccount</button>
						</div>
						<button onClick={resetPassword}>reset Password</button>
						<button onClick={reauthenticate}>reauthenticate</button>
					</div>
				</div>
			)}
		</Fragment>
	);
};

// connect passes STATE argument to mapStateToProps which represents global store object which contains all the state of the application
// Now we are extracting the only state in which this Dashboard component needs.
// Hence this mapStateToProps function will contain all the states Dashboard component.
const mapStateToProps = (state) => {
	console.log('global state is', state);
	return {
		currentUser: state.user.currentUser
	};
};

export default connect(mapStateToProps)(Dashboard);

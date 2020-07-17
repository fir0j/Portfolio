import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../firebase/firebase.utils';

const LeftNavigation = ({ currentUser, setCurrentUser }) => {
	return (
		<div className="flex flex-col h-full justify-between justify-content">
			<Link to="/" className="h-full">
				<div className="border h-full w-full flex flex-col justify-center items-center cursor-pointer bg-orange-500">
					<div>{currentUser && <p>{currentUser.email ? currentUser.email : currentUser.phoneNumber}</p>}</div>
					<button className="border p-1 rounded-md" onClick={(e) => logout(e, setCurrentUser)}>
						Logout
					</button>
				</div>
			</Link>
			<Link to="/projects" className="h-full">
				<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-red-500">
					Projects
				</div>
			</Link>
			<Link to="/resume" className="h-full">
				<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-blue-500">
					Resume
				</div>
			</Link>
			<Link to="/technology" className="h-full">
				<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-green-500">
					Familiar Technology
				</div>
			</Link>

			<Link to="/blogs" className="h-full">
				<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-yellow-500">
					Blogs
				</div>
			</Link>

			<Link to="/tracker" className="h-full">
				<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-indigo-500">
					Progress Tracker
				</div>
			</Link>

			<Link to="/hireme" className="h-full">
				<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-pink-500">
					Hire Me
				</div>
			</Link>
		</div>
	);
};

export default LeftNavigation;

import React from 'react';

export const LeftNavigation = ({ setActivePage }) => {
	return (
		<div className="flex flex-col h-full justify-between justify-content">
			<div
				onClick={() => setActivePage('logo')}
				className="border h-full w-full flex justify-center items-center cursor-pointer bg-green-500"
			>
				Logo
			</div>
			<div
				onClick={() => setActivePage('dashboard')}
				className="border h-full w-full flex justify-center items-center cursor-pointer bg-orange-500"
			>
				Dashboard
			</div>
			<div
				onClick={() => setActivePage('resume')}
				className="border h-full w-full flex justify-center items-center cursor-pointer bg-blue-500"
			>
				Resume
			</div>
			<div
				onClick={() => setActivePage('projects')}
				className="border h-full w-full flex justify-center items-center cursor-pointer bg-red-500"
			>
				Projects
			</div>
			<div
				onClick={() => setActivePage('blogs')}
				className="border h-full w-full flex justify-center items-center cursor-pointer bg-yellow-500"
			>
				Blogs
			</div>
			<div
				onClick={() => setActivePage('tracker')}
				className="border h-full w-full flex justify-center items-center cursor-pointer bg-indigo-500"
			>
				Progress Tracker
			</div>
			<div
				onClick={() => setActivePage('hireme')}
				className="border h-full w-full flex justify-center items-center cursor-pointer bg-pink-500"
			>
				Hire Me
			</div>
		</div>
	);
};

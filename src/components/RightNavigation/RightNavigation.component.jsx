import React from 'react';

export const RightNavigation = () => {
	return (
		<div className="flex flex-col h-full justify-between justify-content">
			<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-green-500">
				Night Mode
			</div>
			<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-orange-500">
				Theme
			</div>
			<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-blue-500">
				Review
			</div>
			<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-red-500">Music</div>
			<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-yellow-500">
				Social Links
			</div>
		</div>
	);
};

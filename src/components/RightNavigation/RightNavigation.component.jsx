import React from 'react';

export const RightNavigation = () => {
	return (
		<div className="h-screen max-h-full flex flex-col justify-between">
			<div className="h-full relative border flex justify-center items-center cursor-pointer bg-green-800">
				Night Mode
				<div className="absolute left-0 -ml-40 w-40 border h-full flex justify-center items-center cursor-pointer bg-green-800">
					Night Mode tools
				</div>
			</div>

			<div className="h-full relative border flex justify-center items-center cursor-pointer bg-red-500">
				Theme
				<div className="absolute left-0 -ml-40 w-40 border h-full flex justify-center items-center cursor-pointer bg-red-500">
					Theme tools
				</div>
			</div>

			<div className="h-full relative border flex justify-center items-center cursor-pointer bg-orange-500">
				Music
				<div className="absolute left-0 -ml-40 w-40 border h-full flex justify-center items-center cursor-pointer bg-orange-500">
					music tools
				</div>
			</div>

			<div className="h-full relative border flex justify-center items-center cursor-pointer bg-indigo-500">
				Review
				<div className="absolute left-0 -ml-40 w-40 border h-full flex justify-center items-center cursor-pointer bg-indigo-500">
					Review tools
				</div>
			</div>

			<div className="h-full relative border flex justify-center items-center cursor-pointer bg-yellow-500">
				Social Links
				<div className="absolute left-0 -ml-40 w-40 border h-full flex justify-center items-center cursor-pointer bg-yellow-500">
					Social Links tools
				</div>
			</div>
		</div>
	);
};

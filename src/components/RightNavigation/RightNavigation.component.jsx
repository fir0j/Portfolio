import React, { useState } from 'react';
import { NightMode } from './pages/NightMode.page';
import { Theme } from './pages/Theme.page';
import { Music } from './pages/Music.page';
import { Review } from './pages/Review.page';
import { SocialLink } from './pages/SocialLink.page';

export const RightNavigation = () => {
	const [ activeTool, setActiveTool ] = useState('');
	const [ isActive, setIsActive ] = useState(false);

	const handleToolClick = (toolname) => {
		if (!isActive) {
			setIsActive(true);
			setActiveTool(toolname);
			return;
		}
		setActiveTool(toolname);
	};
	const handleOutsideClick = () => {
		setIsActive(false);
		setActiveTool('');
	};

	return (
		<div className="h-screen max-h-full flex flex-col justify-between">
			{isActive && <div onClick={handleOutsideClick} className="fixed inset-0" />}
			<div
				onClick={() => handleToolClick('nightmode')}
				className="h-full relative border flex justify-center items-center cursor-pointer bg-green-800"
			>
				Night Mode
				{activeTool === 'nightmode' ? displayTool(activeTool) : ''}
			</div>

			<div
				onClick={() => handleToolClick('theme')}
				className="h-full relative border flex justify-center items-center cursor-pointer bg-red-500"
			>
				Theme
				{activeTool === 'theme' ? displayTool(activeTool) : ''}
			</div>

			<div
				onClick={() => handleToolClick('music')}
				className="h-full relative border flex justify-center items-center cursor-pointer bg-orange-500"
			>
				Music
				{activeTool === 'music' ? displayTool(activeTool) : ''}
			</div>

			<div
				onClick={() => handleToolClick('review')}
				className="h-full relative border flex justify-center items-center cursor-pointer bg-indigo-500"
			>
				Review
				{activeTool === 'review' ? displayTool(activeTool) : ''}
			</div>

			<div
				onClick={() => handleToolClick('sociallink')}
				className="h-full relative border flex justify-center items-center cursor-pointer bg-yellow-500"
			>
				Social Links
				{activeTool === 'sociallink' ? displayTool(activeTool) : ''}
			</div>
		</div>
	);
};

const displayTool = (action) => {
	switch (action) {
		case 'nightmode':
			return <NightMode />;
		case 'theme':
			return <Theme />;
		case 'music':
			return <Music />;
		case 'review':
			return <Review />;
		case 'sociallink':
			return <SocialLink />;
		default:
			return '';
	}
};

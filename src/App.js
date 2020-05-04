import React, { Fragment, useState } from 'react';
import { LeftNavigation } from './components/LeftNavigation/LeftNavigation.component';
import { RightNavigation } from './components/RightNavigation/RightNavigation.component';
import { Logo } from './pages/Logo.page';
import { Dashboard } from './pages/Dashboard.page';
import { Resume } from './pages/Resume.page';
import { Projects } from './pages/Projects.page';
import { Blogs } from './pages/Blogs.page';
import { ProgressTracker } from './pages/ProgressTracker.page';
import { HireMe } from './pages/HireMe.page';

const App = () => {
	const [ activePage, setActivePage ] = useState('logo');

	return (
		<Fragment>
			<Homepage activePage={activePage} setActivePage={setActivePage} />
		</Fragment>
	);
};

export default App;

const Homepage = ({ activePage, setActivePage }) => {
	return (
		<div className="w-screen h-screen flex text-center border-2 border-green-500">
			<div className="w-3/12 max-w-xs border">
				<LeftNavigation setActivePage={setActivePage} />
			</div>
			<div className="w-full border">{activePage ? displayPage(activePage) : alert('No page to Display')}</div>
			<div className="w-1/12 border">
				<RightNavigation />
			</div>
		</div>
	);
};

const displayPage = (action) => {
	switch (action) {
		case 'logo':
			return <Logo />;
		case 'dashboard':
			return <Dashboard />;
		case 'resume':
			return <Resume />;
		case 'projects':
			return <Projects />;
		case 'blogs':
			return <Blogs />;
		case 'tracker':
			return <ProgressTracker />;
		case 'hireme':
			return <HireMe />;
		default:
			return '';
	}
};

import React, { Fragment, useState } from 'react';
import { LeftNavigation } from './components/LeftNavigation/LeftNavigation.component';
import { RightNavigation } from './components/RightNavigation/RightNavigation.component';
import { Logo } from './components/LeftNavigation/pages/Logo.page';
import { Dashboard } from './components/LeftNavigation/pages/Dashboard.page';
import { Resume } from './components/LeftNavigation/pages/Resume.page';
import { Projects } from './components/LeftNavigation/pages/Projects.page';
import { Blogs } from './components/LeftNavigation/pages/Blogs.page';
import { ProgressTracker } from './components/LeftNavigation/pages/ProgressTracker.page';
import { HireMe } from './components/LeftNavigation/pages/HireMe.page';

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
		<div className="relative flex h-screen text-center border-green-500">
			<div className="w-2/12 border">
				<LeftNavigation setActivePage={setActivePage} />
			</div>
			<div className="w-full border">{activePage ? displayPage(activePage) : alert('No page to Display')}</div>
			<div className="h-screen border">
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

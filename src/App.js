import React, { Fragment } from 'react';
import { RightNavigation } from './components/RightNavigation/RightNavigation.component';
import { Logo } from './components/LeftNavigation/pages/Logo.page';
import { Dashboard } from './components/LeftNavigation/pages/Dashboard.page';
import { Resume } from './components/LeftNavigation/pages/Resume.page';
import { Projects } from './components/LeftNavigation/pages/Projects.page';
import { Blogs } from './components/LeftNavigation/pages/Blogs.page';
import { ProgressTracker } from './components/LeftNavigation/pages/ProgressTracker.page';
import { HireMe } from './components/LeftNavigation/pages/HireMe.page';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<Fragment>
			<Homepage />
		</Fragment>
	);
};

export default App;

const Homepage = () => {
	const LeftNavigation = () => {
		return (
			<div className="flex flex-col h-full justify-between justify-content">
				<Link to="/" className="h-full">
					<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-green-500">
						Logo
					</div>
				</Link>

				<Link to="/dashboard" className="h-full">
					<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-orange-500">
						Dashboard
					</div>
				</Link>

				<Link to="/resume" className="h-full">
					<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-blue-500">
						Resume
					</div>
				</Link>

				<Link to="/projects" className="h-full">
					<div className="border h-full w-full flex justify-center items-center cursor-pointer bg-red-500">
						Projects
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

	return (
		<div className="relative flex h-screen text-center border-green-500">
			<Router>
				<div className="w-2/12 border">
					<LeftNavigation />
				</div>

				<div className="w-full border">
					<Switch>
						<Route exact path="/">
							<Logo />
						</Route>
						<Route exact path="/dashboard">
							<Dashboard />
						</Route>
						<Route exact path="/resume">
							<Resume />
						</Route>
						<Route exact path="/projects">
							<Projects />
						</Route>
						<Route exact path="/blogs">
							<Blogs />
						</Route>
						<Route exact path="/tracker">
							<ProgressTracker />
						</Route>
						<Route exact path="/hireme">
							<HireMe />
						</Route>
					</Switch>
				</div>
			</Router>

			<div className="h-screen border">
				<RightNavigation />
			</div>
		</div>
	);
};

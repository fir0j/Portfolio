import React, { useState, useEffect } from 'react';
import LeftNavigation from './components/LeftNavigation/LeftNavigation.component';
import { RightNavigation } from './components/RightNavigation/RightNavigation.component';
import { Technology } from './components/LeftNavigation/pages/Technology.page';
import Dashboard from './components/LeftNavigation/pages/Dashboard.page';
import { Resume } from './components/LeftNavigation/pages/Resume.page';
import { Projects } from './components/LeftNavigation/pages/Projects.page';
import { Blogs } from './components/LeftNavigation/pages/Blogs.page';
import { ProgressTracker } from './components/LeftNavigation/pages/ProgressTracker.page';
import { HireMe } from './components/LeftNavigation/pages/HireMe.page';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/userActions';
import {
	ui,
	uiConfig,
	verifyEmail,
	passwordlessLogin,
	confirmPasswordlessAuth,
	handleLogin,
	signInWithCustomToken
} from './firebase/firebase.utils';

// receiving these props from redux global store
const App = ({ currentUser, setCurrentUser }) => {
	const [ showPasswordlessAuthUI ] = useState(false);
	const [ isMailVerified, SetIsMailVerified ] = useState(null);

	// handling sign in
	useEffect(
		() => {
			const unSubscribeFromAuth = handleLogin(setCurrentUser);
			return () => {
				unSubscribeFromAuth();
			};
		},
		// eslint-disable-next-line
		[]
	);

	// Checking for the browser link to be signin link
	useEffect(
		() => {
			confirmPasswordlessAuth(SetIsMailVerified);
		},
		// eslint-disable-next-line
		[ isMailVerified ]
	);

	const Homepage = () => {
		const FirebaseLoginUI = () => {
			// let history = useHistory();
			// let { pathname } = history.location;
			// console.log(pathname);
			// running ui.start() asynchronously because i want the function to be ran after the below firebase dom has been rendered
			setTimeout(() => {
				ui.start('#firebaseui-auth-container', uiConfig);
			}, 0);

			return (
				<div>
					<div id="firebaseui-auth-container" />
					<div
						id="loader"
						style={{
							marginTop: '20%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<p>Loading...</p>
					</div>
					{showPasswordlessAuthUI && (
						<div>
							<div className="flex justify-center outline-none w-full">
								<button
									className="border rounded-md text-white h-12 p-2 bg-gray-500"
									onClick={passwordlessLogin}
								>
									Login Without Password
								</button>
							</div>
							<div className="flex justify-center outline-none w-full">
								<button
									className="border rounded-md text-white h-12 p-2 bg-gray-500"
									onClick={signInWithCustomToken}
								>
									SignIn using Custom Server
								</button>
							</div>
						</div>
					)}
				</div>
			);
		};

		const VerifyEmailNotification = () => {
			return (
				<div className="absolute top-0 p-1 m-1 flex justify-center ">
					{currentUser && !currentUser.emailVerified && !currentUser.phoneNumber ? (
						<div className="border rounded-sm my-1 p-1 text-center">
							Please
							<span
								className="border border-red-900 rounded-md ml-1 p-1 text-red-900 hover:bg-gray-900 hover:text-orange-100 cursor-pointer "
								onClick={verifyEmail}
							>
								verify
							</span>
							your email within 7 days
						</div>
					) : null}
				</div>
			);
		};

		return (
			<div className="relative flex h-screen text-center border-green-500">
				<Router>
					<div className="max-w-2/12">
						{currentUser ? (
							<LeftNavigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
						) : null}
					</div>
					<VerifyEmailNotification />
					<div className="w-full text-center">
						<Switch>
							<Route exact path="/signin">
								{currentUser ? <Redirect to="/" /> : <FirebaseLoginUI />}
							</Route>
							<Route exact path="/reauthenticate">
								<div>Reauthenticate page</div>
							</Route>
							<Route exact path="/">
								{currentUser ? <Dashboard /> : <Redirect to="/signin" />}
							</Route>
							<Route exact path="/technology">
								{currentUser ? <Technology /> : <Redirect to="/signin" />}
							</Route>
							<Route exact path="/resume">
								{currentUser ? <Resume /> : <Redirect to="/signin" />}
							</Route>
							<Route exact path="/projects">
								{currentUser ? <Projects /> : <Redirect to="/signin" />}
							</Route>
							<Route exact path="/blogs">
								{currentUser ? <Blogs /> : <Redirect to="/signin" />}
							</Route>
							<Route exact path="/tracker">
								{currentUser ? <ProgressTracker /> : <Redirect to="/signin" />}
							</Route>
							<Route exact path="/hireme">
								{currentUser ? <HireMe /> : <Redirect to="/signin" />}
							</Route>
						</Switch>
					</div>
				</Router>

				<div className="h-screen border">{currentUser ? <RightNavigation /> : null}</div>
			</div>
		);
	};

	return <Homepage />;
};

// suppossed to return object containing states only
const mapStateToProps = (store) => {
	return { currentUser: store.user.currentUser };
};

// Note: distpatch is just an argument(expected to be a function) name hence you can use any name instead of dispatch.
const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// syntax connect(mapStateToProps as first parameter, mapDispatchToProps as second parameter)
// if only one function is available, null can be used in the place of absent function like connect(null, mapDispatchToProps)
// if only one function is passed to the connect HOC, then that function is expected to be mapStateToProps by react-redux. like connnect(mapStateToProps)

// HOW TO USE THESE STATES AND FUNCTIONS STORED IN REDUX STERE IN OUR APPLICATION ?
// connect HOC always passes REDUX STORE as an argument to mapDispatchToProps.
// Similarly connect HOC passes dispatch() function which expects an ACTION OBJECT as it argument, to mapDispatchToprops().
// The object returned by the mapStateToProps() and mapDispatchToProps() is always passed as props to our current receiving Component.

import React, { Fragment, useState, useEffect } from 'react';
import { RightNavigation } from './components/RightNavigation/RightNavigation.component';
import { Technology } from './components/LeftNavigation/pages/Technology.page';
import { Dashboard } from './components/LeftNavigation/pages/Dashboard.page';
import { Resume } from './components/LeftNavigation/pages/Resume.page';
import { Projects } from './components/LeftNavigation/pages/Projects.page';
import { Blogs } from './components/LeftNavigation/pages/Blogs.page';
import { ProgressTracker } from './components/LeftNavigation/pages/ProgressTracker.page';
import { HireMe } from './components/LeftNavigation/pages/HireMe.page';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { auth, ui, uiConfig, verifyEmail, passwordlessLogin } from './firebase/AuthUI';

const App = () => {
	const [ user, setUser ] = useState(null);
	const [ showPasswordlessAuthUI, setShowPasswordlessAuthUI ] = useState(false);
	const [ isMailVerified, SetIsMailVerified ] = useState(null);

	useEffect((show) => {
		setShowPasswordlessAuthUI(false);
		const unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				console.log('LoggedIn userId is:', user.email, 'email Verified:', user.emailVerified);
			} else {
				// when not logged in
				setUser(null);
				ui.start('#firebaseui-auth-container', uiConfig);
				setShowPasswordlessAuthUI(true);
				console.log('Not logged in');
			}
		});

		return () => {
			unSubscribeFromAuth();
		};
		// eslint-disable-next-line
	}, []);

	// Checking for the browser link to be signin link
	useEffect(
		() => {
			const confirmPasswordlessAuth = () => {
				// var url = new URL(window.location.href);
				// var mode = url.searchParams.get('mode');
				// console.log('mode is:', mode);
				// Confirm the link is a sign-in with email link.
				if (auth.isSignInWithEmailLink(window.location.href)) {
					// Additional state parameters can also be passed via URL.
					// This can be used to continue the user's intended action before triggering
					// the sign-in operation.
					// Get the email if available. This should be available if the user completes
					// the flow on the same device where they started it.
					var email = window.localStorage.getItem('emailForSignIn');
					if (!email) {
						// User opened the link on a different device. To prevent session fixation
						// attacks, ask the user to provide the associated email again. For example:
						email = window.prompt('Please provide your email for confirmation');
					}
					// The client SDK will parse the code from the link for you.
					auth
						.signInWithEmailLink(email, window.location.href)
						.then(function(result) {
							// Clear email from storagsetUser(user);
							SetIsMailVerified(user.emailVerified);
							console.log('user clicked on the verify email link');
							console.log('LoggedIn userId is:', user.email, 'email Verified:', user.emailVerified);
							window.localStorage.removeItem('emailForSignIn');
							// You can access the new user via result.user
							// Additional user info profile not available via:
							// result.additionalUserInfo.profile == null
							// You can check if the user is new or existing:
							// result.additionalUserInfo.isNewUser
						})
						.catch(function(error) {
							console.log('error!signing in with email');
							// Some error occurred, you can inspect the code: error.code
							// Common errors could be invalid email and invalid or expired OTPs.
						});
				}
			};
			confirmPasswordlessAuth();
		},
		// eslint-disable-next-line
		[ isMailVerified ]
	);

	const logout = (e) => {
		e.preventDefault();
		auth.signOut().catch((error) => console.log('error logging out!'));
		setUser(null);
		console.log('logged out successfully');
	};

	// Signing in using Custom Auth System built using firebase
	const token =
		'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5Mjc1ODI4NSwiZXhwIjoxNTkyNzYxODg1LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay14eWFvdUBwb3J0Zm9saW8tYjU5YmIuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay14eWFvdUBwb3J0Zm9saW8tYjU5YmIuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiJzb21lVW5pcXVlVXNlcklEIiwiY2xhaW1zIjp7InByZW1pdW1BY2NvdW50Ijp0cnVlfX0.DYzvXAGrI0GXtQksHo2uIlbyGDx35VpS_ZXnKTY9oGpEOWAPr7NiQkcKNAGqY9bd0VJ_WpJO5yhjWi81FOaKeCdjkM34dzXrjOGfWkOiqG8tDeIaZUnM89MfQvGN42upv0kSKEiGnA-en64Ig0rOwJkhCiY-fa8FjQuXEbO46Z3Gf0XWzLB1oAdpWMW1qy9TU1aI6i7uf8xQdKGyYvRyHicndNkCLYSPiyXGUPrWl41A754d6nEsVYI6554HQ71h1vVCcxV_Va1d_OO3OHVnznFyEwlo_37-gg9dv1Tft2KJ_XQV0aSKNVDns4Y7-beYEcgaY0VeiaMS0T1q6fun_Q';
	const SignIn = () => {
		auth.signInWithCustomToken(token).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage, errorCode);
		});
	};

	const firebaseLoginUI = (
		<div>
			<h1 className="text-center">Welcome to the Firoj's Profolio</h1>
			<div id="firebaseui-auth-container" />
			<div
				id="loader"
				style={{ marginTop: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
						<button className="border rounded-md text-white h-12 p-2 bg-gray-500" onClick={SignIn}>
							SignIn using Custom Server
						</button>
					</div>
				</div>
			)}
		</div>
	);

	const Homepage = () => {
		const LeftNavigation = () => {
			return (
				<div className="flex flex-col h-full justify-between justify-content">
					<Link to="/" className="h-full">
						<div className="border h-full w-full flex flex-col justify-center items-center cursor-pointer bg-orange-500">
							<div>{user && <p>{user.email ? user.email : user.phoneNumber}</p>}</div>
							<button className="border p-1 rounded-md" onClick={(e) => logout(e)}>
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

		return (
			<div className="relative flex h-screen text-center border-green-500">
				<Router>
					<div className="w-2/12 border">
						<LeftNavigation />
					</div>

					<div className="w-full text-center">
						<div className="absolute top-0 p-1 m-1 flex justify-center ">
							{user && !auth.currentUser.emailVerified && !auth.currentUser.phoneNumber ? (
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
						<Switch>
							{/* <Route exact path="/signin">
								{firebaseLoginUI}
							</Route> */}
							<Route exact path="/">
								<Dashboard />
							</Route>
							<Route exact path="/technology">
								<Technology />
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

	return <Fragment>{user ? <Homepage /> : firebaseLoginUI}</Fragment>;
};

export default App;

import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
const firebaseConfig = {
	apiKey: 'AIzaSyDIwn8-FwfLw6COho9taVTigVZX7GnW5-c',
	authDomain: 'portfolio-b59bb.firebaseapp.com',
	databaseURL: 'https://portfolio-b59bb.firebaseio.com',
	projectId: 'portfolio-b59bb',
	storageBucket: 'portfolio-b59bb.appspot.com',
	messagingSenderId: '145139653263',
	appId: '1:145139653263:web:22bcec71eece0c93892efa',
	measurementId: 'G-NT1P872HVE'
};
firebase.initializeApp(firebaseConfig);

// done with adding FIREBASE to the project
//Now Adding the FIREBASE PRODUCTS(authentication, firestore) to this project
const auth = firebase.auth();
var ui = new firebaseui.auth.AuthUI(auth);
const verifyEmail = () => {
	const user = auth.currentUser;
	const email = auth.currentUser.email;

	console.log('sending verification to', email);
	user
		.sendEmailVerification()
		.then(function() {
			alert('email verification sent!');
		})
		.catch(function(error) {
			console.log('error! while sending verification link');
		});
};

var uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			// // return true;
			// if (newUser === null) {
			// 	newUser = authResult.additionalUserInfo.profile.id;
			// 	// setNewUser(authResult.additionalUserInfo.profile.id);
			// 	console.log('new user assigned', newUser);
			// } else if (newUser === authResult.additionalUserInfo.profile.id) {
			// 	// setIsReauthenticated(true);
			// 	isReauthenticated = true;
			// 	console.log('user', newUser, 'reauthenticated successfully');
			// } else if (newUser !== authResult.additionalUserInfo.profile.id) {
			// 	console.log('new user logged in');
			// 	newUser = authResult.additionalUserInfo.profile.id;
			// 	// setNewUser(authResult.additionalUserInfo.profile.id);
			// } else {
			// 	console.log('no condition matched with authResult');
			// }
		},
		uiShown: function() {
			// The widget is rendered.
			// Hide the loader.
			document.getElementById('loader').style.display = 'none';
		}
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: '<url-to-redirect-to-on-success>',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		{
			provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			scopes: [ 'public_profile', 'email', 'user_likes' ],
			customParameters: {
				// Forces password re-entry.
				auth_type: 'reauthenticate',
				// Forces account selection even when only one account is available.
				prompt: 'select_account'
			}
		},
		{
			provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			scopes: [ 'email' ],
			customParameters: {
				// Forces password re-entry.
				auth_type: 'reauthenticate',
				// Forces account selection even when only one account is available.
				prompt: 'select_account'
			}
		},
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '<your-tos-url>',
	// Privacy policy url.
	privacyPolicyUrl: '<your-privacy-policy-url>'
};

const handleLogin = (setCurrentUser) => {
	auth.onAuthStateChanged((user) => {
		if (user) {
			setCurrentUser(user);
			console.log('logged in');
		} else {
			setCurrentUser(null);
			console.log('Not logged in');
		}
	});
};

const signInWithCustomToken = (
	token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTU5Mjc1ODI4NSwiZXhwIjoxNTkyNzYxODg1LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay14eWFvdUBwb3J0Zm9saW8tYjU5YmIuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay14eWFvdUBwb3J0Zm9saW8tYjU5YmIuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiJzb21lVW5pcXVlVXNlcklEIiwiY2xhaW1zIjp7InByZW1pdW1BY2NvdW50Ijp0cnVlfX0.DYzvXAGrI0GXtQksHo2uIlbyGDx35VpS_ZXnKTY9oGpEOWAPr7NiQkcKNAGqY9bd0VJ_WpJO5yhjWi81FOaKeCdjkM34dzXrjOGfWkOiqG8tDeIaZUnM89MfQvGN42upv0kSKEiGnA-en64Ig0rOwJkhCiY-fa8FjQuXEbO46Z3Gf0XWzLB1oAdpWMW1qy9TU1aI6i7uf8xQdKGyYvRyHicndNkCLYSPiyXGUPrWl41A754d6nEsVYI6554HQ71h1vVCcxV_Va1d_OO3OHVnznFyEwlo_37-gg9dv1Tft2KJ_XQV0aSKNVDns4Y7-beYEcgaY0VeiaMS0T1q6fun_Q'
) => {
	auth.signInWithCustomToken(token).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorMessage, errorCode);
	});
};

const passwordlessLogin = () => {
	const email = prompt('Enter your Email.');
	var actionCodeSettings = {
		// URL you want to redirect back to. The domain (www.example.com) for this
		// URL must be whitelisted in the Firebase Console.
		url: 'https://firoj.netlify.app',
		// This must be true.
		handleCodeInApp: true
	};
	if (email) {
		auth
			.sendSignInLinkToEmail(email, actionCodeSettings)
			.then(function() {
				// The link was successfully sent. Inform the user.
				// Save the email locally so you don't need to ask the user for it again
				// if they open the link on the same device.
				window.localStorage.setItem('emailForSignIn', email);
				alert(`Click on the LINK IN YOUR MAIL (${email}) to login`);
			})
			.catch(function(error) {
				console.log('Error! while sending verification link', error);
			});
	}
};

const confirmPasswordlessAuth = (SetIsMailVerified) => {
	const currentUser = auth.currentUser;
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
				console.log('user clicked on the verify email link');
				SetIsMailVerified(currentUser.emailVerified);
				console.log('LoggedIn userId is:', currentUser.email, 'email Verified:', currentUser.emailVerified);
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

const changePassword = () => {
	const user = auth.currentUser;
	var password = prompt(`Enter password for ${user.email}`);
	const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
	// Prompt the user to re-provide their sign-in credentials
	user
		.reauthenticateWithCredential(credential)
		.then(function() {
			// User re-authenticated.
			console.log('reauthenticated!');
			var newPassword = prompt('Enter your new password');
			user
				.updatePassword(newPassword)
				.then(function() {
					console.log('new password updated');
					// Update successful.
				})
				.catch(function(error) {
					console.log('ERror!', error);
					// An error happened.
				});
		})
		.catch(function(error) {
			// An error happened.
			console.log('Sorry! error in reauthentication', error);
		});
};

const changeMail = () => {
	const user = auth.currentUser;
	var password = prompt(`Enter password for ${user.email}`);
	if (password) {
		const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
		// const credential = firebase.auth.GoogleAuthProvider.credential(user.email, password);
		// Prompt the user to re-provide their sign-in credentials
		user
			.reauthenticateWithCredential(credential)
			.then(function() {
				// User re-authenticated.
				console.log('reauthenticated!');
				var mail = prompt('Enter your new mail');
				console.log(mail);
				user
					.updateEmail(mail)
					.then(function() {
						console.log('mail updated');
						// Update successful.
					})
					.catch(function(error) {
						console.log('ERror!', error);
						// An error happened.
					});
			})
			.catch(function(error) {
				// An error happened.
				console.log('Sorry!error in reauthentication', error);
			});
	}
};

const deleteAccount = (user) => {
	let answer = window.confirm('Account will be deleted permanently. are you okay?');
	if (answer) {
		user
			.delete()
			.then(function() {
				auth.signOut();
				console.log('user deleted');
			})
			.catch(function(error) {
				console.log('Sorry! Error while deleting user', error);
			});
	}
};

const resetPassword = () => {
	const user = auth.currentUser;
	auth
		.sendPasswordResetEmail(user.email)
		.then(function() {
			alert(`Link Sent. Please check your email: ${user.email}`);
		})
		.catch(function(error) {
			// An error happened.
			console.log('Error! while sending password reset link');
		});
};

const logout = (e, setCurrentUser) => {
	e.preventDefault();
	auth.signOut().catch((error) => console.log('error logging out!'));
	setCurrentUser(null);
	console.log('logged out successfully');
};

export {
	auth,
	ui,
	uiConfig,
	firebase,
	handleLogin,
	signInWithCustomToken,
	changeMail,
	changePassword,
	resetPassword,
	verifyEmail,
	passwordlessLogin,
	deleteAccount,
	logout,
	confirmPasswordlessAuth
};

// let promptForAuth = false;
// const deleteAccount = () => {
// 	const user = auth.currentUser;
// 	let answer = window.confirm('Account will be deleted permanently. are you okay?');

// 	if (answer) {
// 		// prompt for re-authenticaion
// 		promptForAuth = true;

// 		// run an asynchronous function
// 		if (isReauthenticated) {
// 			isReauthenticated = false;
// 			user
// 				.delete()
// 				.then(function() {
// 					auth.signOut();
// 				})
// 				.catch(function(error) {
// 					console.log('Sorry! Error while deleting user', error);
// 				});
// 		}
// 	}
// 	// var password = prompt(`Enter password for ${user.email}`);

// 	// if (password && user.email !== null) {
// 	// const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
// 	// // Prompt the user to re-provide their sign-in credentials
// 	// user
// 	// 	.reauthenticateWithCredential(credential)
// 	// .then(function() {
// 	// 	// User re-authenticated.
// 	// 	console.log('reauthenticated!');
// 	// user
// 	// 	.delete()
// 	// 	.then(function() {
// 	// 		auth.signOut();
// 	// 	})
// 	// 	.catch(function(error) {
// 	// 		console.log('Sorry! Error while deleting user', error);
// 	// 	});
// 	// })
// 	// .catch(function(error) {
// 	// 	// An error happened.
// 	// console.log('Sorry!error in reauthentication', error);
// 	// });
// 	// } else {
// 	// 	console.log('either email or password is null');
// 	// }
// };

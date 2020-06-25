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
var uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.
			// Return type determines whether we continue the redirect automatically
			// or whether we leave that to developer to handle.
			// return true;
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

const deleteAccount = () => {
	const user = auth.currentUser;
	window.confirm('Account will be deleted permanently. are you okay?');
	var password = prompt(`Enter password for ${user.email}`);

	if (password && user.email !== null) {
		const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
		// Prompt the user to re-provide their sign-in credentials
		user
			.reauthenticateWithCredential(credential)
			.then(function() {
				// User re-authenticated.
				console.log('reauthenticated!');
				user
					.delete()
					.then(function() {
						auth.signOut();
					})
					.catch(function(error) {
						console.log('Sorry! Error while deleting user', error);
					});
			})
			.catch(function(error) {
				// An error happened.
				console.log('Sorry!error in reauthentication', error);
			});
	} else {
		console.log('either email or password is null');
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

export { auth, ui, uiConfig, changeMail, changePassword, resetPassword, verifyEmail, passwordlessLogin, deleteAccount };

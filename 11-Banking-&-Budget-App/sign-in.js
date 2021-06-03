/**
 * Constants
 */
const ADMIN = {
	USERNAME : 'admin',
	PASSWORD : 'admin'
};


/**
 * EventListener Functions
 */
/**
 * Loads the users from the local storage.
 */
function loadUsersEL() {
	loadUsers();
}

/**
 * Shows the create account button and clears the input fields.
 */
function showCreateAccountButtonEL() {
	document.querySelector('#create-account').style.visibility = 'visible';
	clearInputFields('#sign-in');
	document.querySelector('#identifier').innerText = 'Email Address';
}

/**
 * Hides the create account button and clears the input fields.
 */
function hideCreateAccountButtonEL() {
	document.querySelector('#create-account').style.visibility = 'hidden';
	clearInputFields('#sign-in');
	document.querySelector('#identifier').innerText = 'Username';
}

/**
 * Validates the input values. Redirects to either the user page or the admin page if they are valid.
 * @returns undefined if an input value is invalid.
 */
function signInEL() {
	let username = document.querySelector('#username');
	let password = document.querySelector('#password');
	
	// if a User
	if (document.querySelector('#user').checked) {
		// validate the username
		if (!username.value) {
			alert('Email Address cannot be empty.');
			password.value = '';

			return;
		}
		if (!userExists(username.value)) {
			alert('User does not exist.');
			username.value = '';
			password.value = '';

			return;
		}
		// validate the password
		if (!password.value) {
			alert('Password cannot be empty.');

			return;
		}
		if (password.value != userExists(username.value).password) {
			alert('Incorrect password.');
			password.value = '';

			return;
		}

		// save the signed-in User to the localStorage
		localStorage.setItem('signedInUser', JSON.stringify(userExists(username.value)));

		clearInputFields('#sign-in');
		// redirect to the user page
		window.location.href = 'user.html';
	}
	// if the ADMIN
	else {
		// validate the username
		if (!username.value) {
			alert('Username cannot be empty.');
			password.value = '';

			return;
		}
		if (username.value != ADMIN.USERNAME) {
			alert('Incorrect username.');
			username.value = '';
			password.value = '';

			return;
		}
		// validate the password
		if (!password.value) {
			alert('Password cannot be empty.');

			return;
		}
		if (password.value != ADMIN.PASSWORD) {
			alert('Incorrect password.');
			password.value = '';

			return;
		}

		clearInputFields('#sign-in');
		// redirect to the admin page
		window.location.href = 'admin.html';
	}
}

/**
 * Displays the sign up section and clears the input fields.
 */
function displaySignUpSectionEL() {
	document.querySelector('#sign-up').style.display = 'flex';
	clearInputFields('#sign-in');
}

/**
 * Closes the sign up section and clears the input fields.
 */
function closeSignUpSectionEL() {
	document.querySelector('#sign-up').style.display = 'none';
	clearInputFields('#sign-up');
}

/**
 * Validates the input values. Creates a user and saves it in the local storage if they are valid.
 */
function signUpEL() {
	let email = document.querySelector('#sign-up-email');
	let password = document.querySelector('#sign-up-password');
	let name = document.querySelector('#sign-up-name');
	const accountBalance = document.querySelector('#sign-up-account-balance');
	let errors = [];

	// validate the email
	if (!email.value) {
		errors.push('Email cannot be empty.');
	}
	if (email.value && !isEmailValid(email.value)) {
		errors.push('Invalid Email.');
		email.value = '';
	}
	if (userExists(email.value)) {
		errors.push('Email already taken.');
		email.value = '';
	}
	// validate the password
	if (!password.value) {
		errors.push('Password cannot be empty.');
	}
	if (password.value && !isPasswordValid(password.value)) {
		errors.push('Invalid Password.');
		password.value = '';
	}
	// validate the name
	if (!name.value) {
		errors.push('Name cannot be empty.');
	}
	if (name.value && !isNameValid(name.value)) {
		errors.push('Invalid Name.');
		name.value = '';
	}

	// show the errors
	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	// create a User and save it in the localStorage
	else {
		createUser(
			email.value,
			password.value,
			name.value.toUpperCase(),
			(accountBalance.value) ? parseFloat(accountBalance.value) : 0
		);
		localStorage.setItem(`signedUpUser-${users.length - 1}`, JSON.stringify(users[users.length - 1]));
		alert('Sign Up successful.');

		// close the sign-up section
		closeSignUpSectionEL();
	}
}
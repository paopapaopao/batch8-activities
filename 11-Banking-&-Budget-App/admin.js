/**
 * Utility Functions
 */
/**
 * Looks for the number of a User in the system.
 * @param {User} user A User whose number in the system is looked for.
 * @returns The number of user in the system.
 */
function userIndex(user) {
	for (let index = 0; index < users.length; index++) {
		if (user == users[index]) {
			return (index);
		}
	}
}


/**
 * EventListener Functions
 */
/**
 * Loads the users from the local storage and lists them in the table.
 */
function loadUsersEL() {
	loadUsers();
	listUsers();
}

/**
 * Validates the input values. Creates a user if they are valid.
 */
function createUserEL() {
	let email = document.querySelector('#create-user-email');
	let password = document.querySelector('#create-user-password');
	let name = document.querySelector('#create-user-name');
	let accountBalance = document.querySelector('#create-user-account-balance');
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
	// create a User
	else {
		createUser(
			email.value,
			password.value,
			name.value.toUpperCase(),
			(accountBalance.value) ? parseFloat(accountBalance.value) : 0
		);
		insertUser(users[users.length - 1], users.length);
		alert('Create User successful.');

		// clear the input fields
		clearInputFields('#create-user-section');
	}
}

/**
 * Validates the input values. Deposits if they are valid.
 */
function depositEL() {
	let email = document.querySelector('#deposit-to');
	let amount = document.querySelector('#deposit-amount');
	let user = userExists(email.value);
	let errors = [];

	if (!user) {
		errors.push('User does not exist.');
		email.value = '';
	}
	if (amount.value == '') {
		errors.push('Invalid amount.');
		amount.value = '';
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		deposit(user, parseFloat(amount.value));
		table.rows[userIndex(user) + 1].cells[4].innerText = formatMoney(user.accountBalance);
		alert('Deposit successful.');

		// clear the input fields
		clearInputFields('#deposit-section');
	}
}

/**
 * Validates the input values. Withdraws if they are valid.
 */
function withdrawEL() {
	let email = document.querySelector('#withdraw-from');
	let amount = document.querySelector('#withdraw-amount');
	let user = userExists(email.value);
	let errors = [];

	if (!user) {
		errors.push('User does not exist.');
		email.value = '';
	}
	if (amount.value == '') {
		errors.push('Invalid amount.');
		amount.value = '';
	}
	if (user && notEnoughMoney(user, parseFloat(amount.value))) {
		errors.push('Insufficient balance.');
		amount.value = '';
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		withdraw(user, parseFloat(amount.value));
		table.rows[userIndex(user) + 1].cells[4].innerText = formatMoney(user.accountBalance);
		alert('Withdraw successful.');

		// clear the input fields
		clearInputFields('#withdraw-section');
	}
}

/**
 * Validates the input values. Sends if they are valid.
 */
function sendEL() {
	let emailFrom = document.querySelector('#send-from');
	let emailTo = document.querySelector('#send-to');
	let amount = document.querySelector('#send-amount');
	let fromUser = userExists(emailFrom.value);
	let toUser = userExists(emailTo.value);
	let errors = [];

	if (!fromUser) {
		errors.push('Sender does not exist.');
		emailFrom.value = '';
	}
	if (!toUser) {
		errors.push('Recepient does not exist.');
		emailTo.value = '';
	}
	if (amount.value == '') {
		errors.push('Invalid amount.');
		amount.value = '';
	}
	if (fromUser && notEnoughMoney(fromUser, parseFloat(amount.value))) {
		errors.push('Insufficient balance.');
		amount.value = '';
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		send(fromUser, toUser, parseFloat(amount.value));
		table.rows[userIndex(fromUser) + 1].cells[4].innerText = formatMoney(fromUser.accountBalance);
		table.rows[userIndex(toUser) + 1].cells[4].innerText = formatMoney(toUser.accountBalance);
		alert('Send successful.');

		// clear the input fields
		clearInputFields('#send-section');
	}
}
 
/**
 * Displays the create user section and closes the others and clears their input fields.
 */
function displayCreateUserSectionEL() {
	document.querySelector('#create-user-section').style.display = 'block';
	document.querySelector('#deposit-section').style.display = 'none';
	document.querySelector('#withdraw-section').style.display = 'none';
	document.querySelector('#send-section').style.display = 'none';

	// clear the input fields
	clearInputFields('#deposit-section');
	clearInputFields('#withdraw-section');
	clearInputFields('#send-section');
}

/**
 * Displays the deposit section and closes the others and clears their input fields.
 */
function displayDepositSectionEL() {
	document.querySelector('#create-user-section').style.display = 'none';
	document.querySelector('#deposit-section').style.display = 'block';
	document.querySelector('#withdraw-section').style.display = 'none';
	document.querySelector('#send-section').style.display = 'none';

	// clear the input fields
	clearInputFields('#create-user-section');
	clearInputFields('#withdraw-section');
	clearInputFields('#send-section');
}

/**
 * Displays the withdraw section and closes the others and clears their input fields.
 */
function displayWithdrawSectionEL() {
	document.querySelector('#create-user-section').style.display = 'none';
	document.querySelector('#deposit-section').style.display = 'none';
	document.querySelector('#withdraw-section').style.display = 'block';
	document.querySelector('#send-section').style.display = 'none';

	// clear the input fields
	clearInputFields('#create-user-section');
	clearInputFields('#deposit-section');
	clearInputFields('#send-section');
}

/**
 * Displays the send section and closes the others and clears their input fields.
 */
function displaySendSectionEL() {
	document.querySelector('#create-user-section').style.display = 'none';
	document.querySelector('#deposit-section').style.display = 'none';
	document.querySelector('#withdraw-section').style.display = 'none';
	document.querySelector('#send-section').style.display = 'block';

	// clear the input fields
	clearInputFields('#create-user-section');
	clearInputFields('#deposit-section');
	clearInputFields('#withdraw-section');
}
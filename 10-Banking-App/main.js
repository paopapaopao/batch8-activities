/**
 * Class Definition
 */
class User {
	/**
	 * Constructs a User object.
	 * @param {string} email A string containing the email of the User object. It must be unique.
	 * @param {string} password A string containing the password of the User object.
	 * @param {string} name A string containing the name of the User object.
	 * @param {number} accountBalance A number containing the account balance of the User object.
	 * @returns The User object constructed.
	 */
	constructor(email, password, name, accountBalance) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.accountBalance = accountBalance;

		return (this);
	}
}

/**
 * Variables
 */
let users = [];

/**
 * DOM Elements
 */
let createUserSection = document.querySelector('#create-user-section');
let depositSection = document.querySelector('#deposit-section');
let withdrawSection = document.querySelector('#withdraw-section');
let sendSection = document.querySelector('#send-section');
let table = document.querySelector('#table');

/**
 * Utility Functions
 */
/**
 * Creates a new User and puts it in the system.
 * @param {string} email A string containing the email of the User.
 * @param {string} password A string containing the password of the User.
 * @param {string} name A string containing the name of the User.
 * @param {number} accountBalance A number containing the account balance of the User.
 */
function createUser(email, password, name, accountBalance) {
	users.push(new User(email, password, name, accountBalance));
}

/**
 * Increases the account balance of a User.
 * @param {User} user A User whose account balance is increased by amount.
 * @param {number} amount A number increased to the account balance of user.
 */
function deposit(user, amount) {
	user.accountBalance += amount;
}

/**
 * Decreases the account balance of a User.
 * @param {User} user A User whose account balance is decreased by amount.
 * @param {number} amount A number decreased from the account balance of user.
 */
function withdraw(user, amount) {
	user.accountBalance -= amount;
}

/**
 * Decreases the account balance of a User and increases the account balance of another User.
 * @param {User} fromUser A User whose account balance is decreased by amount.
 * @param {User} toUser A User whose account balance is increased by amount.
 * @param {number} amount A number decreased from the account balance of fromUser and increased to the account balance of toUser.
 */
function send(fromUser, toUser, amount) {
	withdraw(fromUser, amount);
	deposit(toUser, amount);
}

/**
 * Lists the Users in the system to a table.
 */
function listUsers() {
	users.forEach(function(user, index) {
		insertUser(user, index + 1);
	});
}

/**
 * Converts the account balance of a User to a formatted string (₱ xx,xxx.xx).
 * @param {User} user A User whose account balance is converted to a formatted string.
 * @returns The account balance of user as a formatted string.
 */
function getBalance(user) {
	let accountBalance = user.accountBalance.toFixed(2).split('');
	accountBalance.reverse();
	for (let index = 6; index < accountBalance.length; index += 4) {
		accountBalance.splice(index, 0, ',');
	}
	accountBalance.reverse();

	return (`₱ ${accountBalance.join('')}`);
}

/**
 * Checks if a User exists.
 * @param {string} email A string used to check the existence of a User.
 * @returns The User if it exists, undefined if it does not.
 */
function userExists(email) {
	for (let user of users) {
		if (email == user.email) {
			return (user);
		}
	}
	return (undefined);
}

/**
 * Checks if the account balance of a User is enough.
 * @param {User} user A User whose account balance is compared to amount.
 * @param {number} amount A number compared to the account balance of user.
 * @returns True if user does not have enough money, false if not.
 */
function notEnoughMoney(user, amount) {
	return (user.accountBalance < amount);
}

/**
 * Checks if an email is valid.
 * @param {string} email A string to be checked for email validity.
 * @returns The validity of email.
 */
function isEmailValid(email) {
	return (/^[a-z\d]+([_\.-][a-z\d]+)*@[a-z\d]+(-[a-z\d]+)*\.[a-z]{2,3}$/.test(email));
}

/**
 * Checks if a password is valid.
 * @param {string} password A string to be checked for password validity.
 * @returns The validity of password.
 */
function isPasswordValid(password) {
	return (/^[\s\S]{8,}$/.test(password));
}

/**
 * Checks if a name is valid.
 * @param {string} name A string to be checked for name validity.
 * @returns The validity of name.
 */
function isNameValid(name) {
	return (/^[a-zA-Z \.,-]+$/.test(name));
}

/**
 * Inserts a User in the table.
 * @param {User} user A User inserted in the table.
 * @param {number} row A number containing the row.
 */
function insertUser(user, row) {
	let tableRow = table.insertRow();

	let rowNumber = tableRow.insertCell();
	rowNumber.innerText = row;
	rowNumber.style.textAlign = 'right';

	tableRow.insertCell().innerText = user.email;
	tableRow.insertCell().innerText = user.password;
	tableRow.insertCell().innerText = user.name;

	let accountBalance = tableRow.insertCell();
	accountBalance.innerText = getBalance(user);
	accountBalance.style.textAlign = 'right';
}

/**
 * Looks for the number of a User in the system.
 * @param {User} user A User whose number in the system is looked for.
 * @returns The number of user in the system.
 */
function userRow(user) {
	for (let index = 0; index < users.length; index++) {
		if (user == users[index]) {
			return (index);
		}
	}
}

/**
 * Clears the input fields in a section.
 * @param {string} section A string containing the id of a section.
 */
function clearInputFields(section) {
	document.querySelectorAll(`${section} input`).forEach(function(input) {
		input.value = '';
	});
}

/**
 * EventListener Functions
 */
/**
 * Checks the input fields. Proceeds with the User creation if their values are valid.
 */
 function createUserButtonClickEL() {
	let email = document.querySelector('#create-user-email');
	let password = document.querySelector('#create-user-password');
	let confirmPassword = document.querySelector('#create-user-confirm-password');
	let name = document.querySelector('#create-user-name');
	let accountBalance = document.querySelector('#create-user-account-balance');
	let errors = [];

	if (userExists(email.value)) {
		errors.push('Email already taken.');
	}
	if (!isEmailValid(email.value)) {
		errors.push('Invalid Email.');
	}
	if (!isPasswordValid(password.value)) {
		errors.push('Invalid Password.');
	}
	if (isPasswordValid(password.value) && confirmPassword.value != password.value) {
		errors.push('Confirm Password must match Password.');
	}
	if (!isNameValid(name.value)) {
		errors.push('Invalid Name.');
	}
	if (accountBalance.value == '') {
		errors.push('Invalid Account Balance.');
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		createUser(email.value, password.value, name.value.toUpperCase(), parseFloat(accountBalance.value));
		insertUser(users[users.length - 1], users.length);
		alert('Create User successful.');

		// clear the input fields
		clearInputFields('#create-user-section');
	}
}

/**
 * Checks the input fields. Proceeds with the deposit if their values are valid.
 */
function depositButtonClickEL() {
	let email = document.querySelector('#deposit-to');
	let amount = document.querySelector('#deposit-amount');
	let user = userExists(email.value);
	let errors = [];

	if (!user) {
		email.value = '';
		errors.push('User does not exist.');
	}
	if (amount.value == '') {
		// clear the amount input field (if its value is '.')
		// * in number-typed input fields, '.' is considered as ''
		amount.value = '';
		errors.push('Invalid amount.');
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		deposit(user, parseFloat(amount.value));
		// update the table
		table.rows[userRow(user) + 1].cells[4].innerText = getBalance(user);
		alert('Deposit successful.');

		// clear the input fields
		clearInputFields('#deposit-section');
	}
}

/**
 * Checks the input fields. Proceeds with the withdraw if their values are valid.
 */
function withdrawButtonClickEL() {
	let email = document.querySelector('#withdraw-from');
	let amount = document.querySelector('#withdraw-amount');
	let user = userExists(email.value);
	let errors = [];

	if (!user) {
		email.value = '';
		errors.push('User does not exist.');
	}
	if (amount.value == '') {
		// clear the amount input field (if its value is '.')
		// * in number-typed input fields, '.' is considered as ''
		amount.value = '';
		errors.push('Invalid amount.');
	}
	if (user && notEnoughMoney(user, parseFloat(amount.value))) {
		amount.value = '';
		errors.push('Insufficient balance.');
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		withdraw(user, parseFloat(amount.value));
		// update the table
		table.rows[userRow(user) + 1].cells[4].innerText = getBalance(user);
		alert('Withdraw successful.');

		// clear the input fields
		clearInputFields('#withdraw-section');
	}

}

/**
 * Checks the input fields. Proceeds with the send if their values are valid.
 */
function sendButtonClickEL() {
	let emailFrom = document.querySelector('#send-from');
	let emailTo = document.querySelector('#send-to');
	let amount = document.querySelector('#send-amount');
	let fromUser = userExists(emailFrom.value);
	let toUser = userExists(emailTo.value);
	let errors = [];

	if (!fromUser) {
		emailFrom.value = '';
		errors.push('Sender does not exist.');
	}
	if (!toUser) {
		emailTo.value = '';
		errors.push('Recepient does not exist.');
	}
	if (amount.value == '') {
		// clear the amount input field (if its value is '.')
		// * in number-typed input fields, '.' is considered as ''
		amount.value = '';
		errors.push('Invalid amount.');
	}
	if (fromUser && notEnoughMoney(fromUser, parseFloat(amount.value))) {
		amount.value = '';
		errors.push('Insufficient balance.');
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		send(fromUser, toUser, parseFloat(amount.value));
		// update the table
		table.rows[userRow(fromUser) + 1].cells[4].innerText = getBalance(fromUser);
		table.rows[userRow(toUser) + 1].cells[4].innerText = getBalance(toUser);
		alert('Send successful.');

		// clear the input fields
		clearInputFields('#send-section');
	}
}

/**
 * Shows the create user section and hides the others and clears their input fields.
 */
function createUserAnchorClickEL() {
	createUserSection.style.display = 'block';
	depositSection.style.display = 'none';
	withdrawSection.style.display = 'none';
	sendSection.style.display = 'none';

	// clear the input fields
	clearInputFields('#deposit-section');
	clearInputFields('#withdraw-section');
	clearInputFields('#send-section');
}

/**
 * Shows the deposit section and hides the others and clears their input fields.
 */
function depositAnchorClickEL() {
	createUserSection.style.display = 'none';
	depositSection.style.display = 'block';
	withdrawSection.style.display = 'none';
	sendSection.style.display = 'none';

	// clear the input fields
	clearInputFields('#create-user-section');
	clearInputFields('#withdraw-section');
	clearInputFields('#send-section');
}

/**
 * Shows the withdraw section and hides the others and clears their input fields.
 */
function withdrawAnchorClickEL() {
	createUserSection.style.display = 'none';
	depositSection.style.display = 'none';
	withdrawSection.style.display = 'block';
	sendSection.style.display = 'none';

	// clear the input fields
	clearInputFields('#create-user-section');
	clearInputFields('#deposit-section');
	clearInputFields('#send-section');
}

/**
 * Shows the send section and hides the others and clears their input fields.
 */
function sendAnchorClickEL() {
	createUserSection.style.display = 'none';
	depositSection.style.display = 'none';
	withdrawSection.style.display = 'none';
	sendSection.style.display = 'block';

	// clear the input fields
	clearInputFields('#create-user-section');
	clearInputFields('#deposit-section');
	clearInputFields('#withdraw-section');
}

/**
 * Redirects to the login page.
 */
function logoutAnchorClickEL() {
	// logs out if any character is inputted
	if (prompt('Are you sure?')) {
		window.location.href = 'login.html';
	}
}

/**
 * Prevents entering of the '-' and '+' strings.
 * @param {Event} event An Event (Keypress) from the number-typed input fields.
 */
function numberInputKeypressEL(event) {
	if (event.key == '-' || event.key == '+') {
		event.preventDefault();
	}
}

/**
 * Puts some Users in the system and lists them to a table.
 */
function mainLoadEL() {
	createUser('juandlc@example.com', 'password', 'JUAN DELA CRUZ', 0.50);
	createUser('maria.makiling@example.com', 'password', 'MARIA MAKILING', 20000);
	createUser('mang_jose10@example.com', 'password', 'MANG JOSE', 987654321);

	listUsers();
}
/**
 * Class Definitions
 */
class User {
	/**
	 * Constructs this User.
	 * @param {string} email The email of this User. It must be unique.
	 * @param {string} password The password of this User.
	 * @param {string} name The name of this User.
	 * @param {number} accountBalance The account balance of this User.
	 * @returns This constructed User.
	 */
	constructor(email, password, name, accountBalance) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.accountBalance = accountBalance;
		this.expenseItems = [];

		return (this);
	}

	/**
	 * Adds an expense item to the expense items of this User.
	 * @param {ExpenseItem} expenseItem The ExpenseItem.
	 */
	add(expenseItem) {
		this.expenseItems.push(expenseItem);
	}

	/**
	 * Deletes an expense item from the expense items of this User.
	 * @param {ExpenseItem} expenseItem The ExpenseItem.
	 */
	delete(expenseItem) {
		this.expenseItems.splice(this.expenseItems.findIndex(item => 
			expenseItem.name == item.name
		), 1);
		this.accountBalance += expenseItem.cost;
	}

	/**
	 * todo
	 * Lists the expense items of this User.
	 * @returns 
	 */
	list() {
		return (this.expenseItems);
	}
}

class ExpenseItem {
	/**
	 * Constructs this ExpenseItem.
	 * @param {string} name The name of this ExpenseItem. It must be unique.
	 * @param {number} cost The cost of this ExpenseItem.
	 * @param {User} owner The owner of this ExpenseItem.
	 * @returns This constructed ExpenseItem.
	 */
	constructor(name, cost) {
		this.name = name;
		this.cost = cost;

		return (this);
	}

	/**
	 * Updates the name of this ExpenseItem.
	 * @param {string} name The new name of this ExpenseItem.
	 */
	updateName(name) {
		this.name = name;
	}

	/**
	 * Updates the cost of this ExpenseItem.
	 * @param {number} cost The new cost of this ExpenseItem.
	 */
	updateCost(cost) {
		this.cost = cost;
	}
}


/**
 * Variables
 */
let users = [];


/**
 * DOM Elements
 */
let table = document.querySelector('#table');


/**
 * Utility Functions
 */
/**
 * Creates a user and puts it in the system.
 * @param {string} email The email of the User.
 * @param {string} password The password of the User.
 * @param {string} name The name of the User.
 * @param {number} accountBalance The account balance of the User.
 * @returns The created User.
 */
function createUser(email, password, name, accountBalance) {
	users.push(new User(email, password, name, accountBalance));

	return (users[users.length - 1]);
}

/**
 * Increases the account balance of a user by an amount.
 * @param {User} user The user.
 * @param {number} amount The amount.
 */
function deposit(user, amount) {
	user.accountBalance += amount;
}

/**
 * Decreases the account balance of a user by an amount.
 * @param {User} user The user.
 * @param {number} amount The amount.
 */
function withdraw(user, amount) {
	user.accountBalance -= amount;
}

/**
 * Decreases the account balance of a user and increases the account balance of another user by an amount.
 * @param {User} fromUser The user whose account balance is decreased.
 * @param {User} toUser The user whose account balance is increased.
 * @param {number} amount The amount.
 */
function send(fromUser, toUser, amount) {
	fromUser.accountBalance -= amount;
	toUser.accountBalance += amount;
}

/**
 * Lists the users in the system to a table.
 */
function listUsers() {
	users.forEach(function(user, index) {
		insertUser(user, index + 1);
	});
}

/**
 * Converts the money to a formatted string (₱ xx,xxx.xx).
 * @returns The formatted string.
 */
function formatMoney(money) {
	let formattedMoney = money.toFixed(2).split('');
	formattedMoney.reverse();
	for (let index = 6; index < formattedMoney.length; index += 4) {
		if (formattedMoney[index] != '-') {
			formattedMoney.splice(index, 0, ',');
		}
	}
	formattedMoney.reverse();

	return (`₱ ${formattedMoney.join('')}`);
}

/**
 * Checks if a user exists using an email.
 * @param {string} email The email.
 * @returns The User if it exists, null if it does not.
 */
function userExists(email) {
	for (let user of users) {
		if (email == user.email) {
			return (user);
		}
	}
	return (null);
}

/**
 * Checks if the account balance of a user is enough.
 * @param {User} user The User.
 * @param {number} amount The amount.
 * @returns True if user does not have enough money, false if not.
 */
function notEnoughMoney(user, amount) {
	return (user.accountBalance < amount);
}

/**
 * Checks if an email is valid.
 * @param {string} email The email.
 * @returns true if the email is valid, false if it is not.
 */
function isEmailValid(email) {
	return (/^[a-z\d]+([_\.-][a-z\d]+)*@[a-z\d]+(-[a-z\d]+)*\.[a-z]{2,3}$/.test(email));
}

/**
 * Checks if a password is valid.
 * @param {string} password The password.
 * @returns true if the password is valid, false if it is not.
 */
function isPasswordValid(password) {
	return (/^[\s\S]{8,}$/.test(password));
}

/**
 * Checks if a name is valid.
 * @param {string} name The name.
 * @returns true if the name is valid, false if it is not.
 */
function isNameValid(name) {
	return (/^[a-zA-Z \.,-]+$/.test(name));
}

/**
 * Loads the users from the local storage.
 */
function loadUsers() {
	for (const key in localStorage) {
		if (/^signedUpUser-\d$/.test(key)) {
			const object = JSON.parse(localStorage.getItem(key));
			let user = createUser(
				object.email,
				object.password,
				object.name,
				object.accountBalance
			);
			object.expenseItems.forEach(function(expenseItem) {
				user.add(new ExpenseItem(expenseItem.name, expenseItem.cost));
			});
		}
	}
}

/**
 * Clears the input fields in a section.
 * @param {string} section The id of the section.
 */
function clearInputFields(section) {
	document.querySelectorAll(`${section} input`).forEach(function(input) {
		input.value = '';
	});
}

/**
 * Inserts a user in the table.
 * @param {User} user The User.
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
	accountBalance.innerText = formatMoney(user.accountBalance);
	accountBalance.style.textAlign = 'right';
}


/**
 * EventListener Functions
 */
/**
 * Prevents entering of the '-' and the '+' string.
 * @param {Event} event An Event (Keypress) from the number-typed input fields.
 */
function numberInputKeypressEL(event) {
	if (event.key == '-' || event.key == '+') {
		event.preventDefault();
	}
}

/**
 * Saves the users in the local storage and redirects to the sign-in page.
 */
function logOutEL() {
	if (prompt('Are you sure?')) {
		localStorage.clear();
		// save the users in the localStorage
		for (const index in users) {
			localStorage.setItem(`signedUpUser-${index}`, JSON.stringify(users[index]));
		}
		
		window.location.href = 'sign-in.html';
	}
}

/**
 * Displays the dropdown menu.
 */
function displayDropdown() {
	document.querySelector('#myDropdown').classList.toggle('show');
}

window.click = function(event) {
	if (!event.matches('.dropdown-btn')) {
		let myDropdown = document.querySelector('#myDropdown');
		if (myDropdown.classList.contains('show')) {
			myDropdown.classList.remove('show');
		}
	}
}

// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}*/
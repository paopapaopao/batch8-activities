/**
 * Variables
 */
let user;


/**
 * Utility Functions
 */
/**
 * Returns the index of an expense item using a name.
 * @param {string} name The name.
 * @returns The index.
 */
function expenseItemIndex(name) {
	for (const index in user.expenseItems) {
		if (name == user.expenseItems[index].name) {
			return (index);
		}
	}
}

/**
 * Creates a delete button linked to an expense item by name.
 * @param {string} name The name.
 * @returns The delete button.
 */
function deleteButton(name) {
	let button = document.createElement('button');
	button.innerText = 'Delete';
	button['name'] = name;
	button.addEventListener('click', function(event) {
		event.currentTarget.parentNode.parentNode.remove();
		user.delete(user.expenseItems[expenseItemIndex(this.name)]);
		document.querySelector('#account-balance').innerText = `Account Balance: ${formatMoney(user.accountBalance)}`;
		alert('Delete Expense Item successful.');
	});

	return (button);
}


/**
 * EventListener Functions
 */
/**
 * Loads the signed-up users and the signed-in user from the local storage.
 */
function loadUsersEL() {
	loadUsers();
	user = userExists(JSON.parse(localStorage.getItem('signedInUser')).email);

	// show the info of the signed-in User
	document.querySelector('#email-address').innerText += user.email;
	document.querySelector('#name').innerText += user.name;
	document.querySelector('#account-balance').innerText += formatMoney(user.accountBalance);

	user.expenseItems.forEach(function(expenseItem) {
		let row = document.querySelector('#table').insertRow();
		row.insertCell().innerText = expenseItem.name;
		row.insertCell().innerText = formatMoney(expenseItem.cost);
		row.insertCell().append(deleteButton(expenseItem.name));
	});
}

/**
 * Displays the deposit section.
 */
function displayDepositSectionEL() {
	document.querySelector('#deposit-section').style.display = 'flex';
}

/**
 * Closes the deposit section and clears the input fields.
 */
function closeDepositSectionEL() {
	document.querySelector('#deposit-section').style.display = 'none';
	clearInputFields('#deposit-section');
}

/**
 * Validates the input value. Deposits if it is valid.
 * @returns undefined if the input value is invalid.
 */
function depositEL() {
	let amount = document.querySelector('#deposit-amount');

	if (!amount.value) {
		alert('Amount cannot be empty.');
		amount.value = '';

		return;
	}

	deposit(user, parseFloat(amount.value));
	document.querySelector('#account-balance').innerText = `Account Balance: ${formatMoney(user.accountBalance)}`;
	alert('Deposit successful.');
	
	// close the deposit section
	closeDepositSectionEL();
}

/**
 * Displays the withdraw section.
 */
function displayWithdrawSectionEL() {
	document.querySelector('#withdraw-section').style.display = 'flex';
}

/**
 * Closes the withdraw section and clears the input fields.
 */
function closeWithdrawSectionEL() {
	document.querySelector('#withdraw-section').style.display = 'none';
	clearInputFields('#withdraw-section');
}

/**
 * Validates the input value. Withdraws if it is valid.
 * @returns undefined if the input value is invalid.
 */
function withdrawEL() {
	let amount = document.querySelector('#withdraw-amount');

	if (!amount.value) {
		alert('Amount cannot be empty.');
		amount.value = '';

		return;
	}
	if (notEnoughMoney(user, amount.value)) {
		alert('Insufficient balance.');
		amount.value = '';

		return;
	}
	
	withdraw(user, parseFloat(amount.value));
	document.querySelector('#account-balance').innerText = `Account Balance: ${formatMoney(user.accountBalance)}`;
	alert('Withdraw successful.');

	// close the withdraw section
	closeWithdrawSectionEL();
}

/**
 * Displays the send section.
 */
function displaySendSectionEL() {
	document.querySelector('#send-section').style.display = 'flex';
}

/**
 * Closes the send section and clears the input fields.
 */
function closeSendSectionEL() {
	document.querySelector('#send-section').style.display = 'none';
	clearInputFields('#send-section');
}

/**
 * Validates the input values. Sends if they are valid.
 * @returns undefined if an input value is invalid.
 */
function sendEL() {
	let recepient = document.querySelector('#send-to');
	let amount = document.querySelector('#send-amount');
	let errors = [];

	// validate the recepient
	if (!recepient.value) {
		errors.push('Recepient cannot be empty.');
	}
	if (recepient.value && !userExists(recepient.value)) {
		errors.push('User does not exist.');
		recepient.value = '';
	}
	// validate the amount
	if (!amount.value) {
		errors.push('Amount cannot be empty.');
		alert(errors.join('\n'));

		return;
	}
	if (notEnoughMoney(user, amount.value)) {
		errors.push('Insufficient balance.');
		alert(errors.join('\n'));
		amount.value = '';

		return;
	}

	send(user, userExists(recepient.value), parseFloat(amount.value));
	document.querySelector('#account-balance').innerText = `Account Balance: ${formatMoney(user.accountBalance)}`;
	alert('Send successful.');

	// close the send section
	closeSendSectionEL();
}

/**
 * Displays the add expense item section.
 */
function displayAddExpenseItemSection() {
	document.querySelector('#add-expense-item-section').style.display = 'flex';
}

/**
 * Closes the add expense item section and clears the input fields.
 */
function closeAddExpenseItemSectionEL() {
	document.querySelector('#add-expense-item-section').style.display = 'none';
	clearInputFields('#add-expense-item-section');
}

/**
 * Validates the input values. Adds an expense item if they are valid.
 */
function addEL() {
	let name = document.querySelector('#add-name');
	let cost = document.querySelector('#add-cost');
	let errors = [];

	// validate the name
	if (!name.value) {
		errors.push('Name cannot be empty.');
	}
	// validate the cost
	if (!cost.value) {
		errors.push('Cost cannot be empty.');
	}

	if (errors.length > 0) {
		alert(errors.join('\n'));
	}
	else {
		user.add(new ExpenseItem(name.value, parseFloat(cost.value)));
		user.accountBalance -= user.expenseItems[user.expenseItems.length - 1].cost;
		document.querySelector('#account-balance').innerText = `Account Balance: ${formatMoney(user.accountBalance)}`;

		let row = document.querySelector('#table').insertRow();
		row.insertCell().innerText = name.value;
		row.insertCell().innerText = formatMoney(parseFloat(cost.value));
		row.insertCell().append(deleteButton(name.value));
		alert('Add Expense Item successful.');

		// close the add expense item section
		closeAddExpenseItemSectionEL();
	}
}
/**
 * Constants
 */
const USERNAME = "username";
const PASSWORD = "password";

/**
 * DOM Elements
 */
let username = document.querySelector("#username");
let password = document.querySelector("#password");

/**
 * Redirects to the main page if the username and the password are valid.
 */
function loginButtonClickEL() {
	if (username.value == USERNAME && password.value == PASSWORD) {
		window.location.href = "main.html";
	}
}
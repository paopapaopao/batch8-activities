/**
 *	Global Variables
 */
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
let timeFormat = 24;
let dateTime;
let name = "";
let quotes = [
	"\"I'm not superstitious, but I am a little stitious.\"",
	"\"When I wrote this code, only God and I understood what it did. Now, only God knows.\"",
	"\"When you are dead, you do not know you are dead. It's only painful & difficult for others. The same applies when you are stupid.\""
];
let quotesFrom = [
	"— Michael Scott",
	"— Anonymous",
	"— Ricky Gervais"
];
let index = getRandomInt(quotes.length);
let todos = [];

/**
 *	DOM Objects
 */
let nameModal = document.querySelector("#nameModal");
let nameInput = document.querySelector("#nameInput");
let dateSection = document.querySelector("#dateSection");
let timeDiv = document.querySelector("#timeDiv");
let timeButton = document.querySelector("#timeButton");
let greetingSection = document.querySelector("#greetingSection");
let focusSection = document.querySelector("#focusSection");
let focusLabel = document.querySelector("#focusLabel");
let focusInput = document.querySelector("#focusInput");
let quoteDiv = document.querySelector("#quoteDiv");
let quoteAddButton = document.querySelector("#quoteAddButton");
let quoteRandomButton = document.querySelector("#quoteRandomButton");
let quoteModal = document.querySelector("#quoteModal");
let quoteInput = document.querySelector("#quoteInput");
let quoteFromInput = document.querySelector("#quoteFromInput");
let addButton = document.querySelector("#addButton");
let exitButton = document.querySelector("#exitButton");
let todoButton = document.querySelector("#todoButton");
let todoDiv = document.querySelector("#todoDiv");
let todoInput = document.querySelector("#todoInput");

/**
 *	Utility Functions
 */
function getAmOrPm(hours) {
	return ((timeFormat == 24) ? "" : ((hours < 12) ? "A.M." : "P.M."));
}

function getFormattedHour(hours) {
	return ((timeFormat == 24) ? hours : hours % 12 || 12);
}

function getFormattedTime(time) {
	return ((time < 10) ? `0${time}` : time.toString());
}

function getFormattedDateTime() {
	let dateTime = new Date();

	return ({
		year: dateTime.getFullYear().toString(),
		month: months[dateTime.getMonth()],
		date: dateTime.getDate().toString(),
		day: days[dateTime.getDay()],
		hours: getFormattedTime(getFormattedHour(dateTime.getHours())),
		minutes: getFormattedTime(dateTime.getMinutes()),
		seconds: getFormattedTime(dateTime.getSeconds()),
		ampm: getAmOrPm(dateTime.getHours())
	});
}

function displayDateTime() {
	dateTime = getFormattedDateTime();
	dateSection.textContent = `${dateTime.day}, ${dateTime.month} ${dateTime.date}, ${dateTime.year}`;
	timeDiv.textContent = `${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds} ${dateTime.ampm}`;
}

function getGreeting(hours, ampm) {
	if ((hours >= 6 && hours < 12) || (hours >= 6 && hours < 12 && ampm == "A.M.")) return ("Good morning, ");
	if ((hours >= 12 && hours < 18) || (hours >= 12 && hours < 6 && ampm == "P.M.")) return ("Good afternoon, ");
	if ((hours >= 18 && hours < 24) || (hours >= 6 && hours < 12 && ampm == "P.M.")) return ("Good evening, ");
	return ("It's time to take a break, ");
}

function createFocusOrTodo(focusOrTodo) {
	let label = document.createElement("label");
	label.textContent = focusOrTodo;

	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.addEventListener("change", function() {
		checkboxChangeEL(this, label);
	});

	let button = document.createElement("button");
	button.textContent = "Delete";

	let div = document.createElement("div");
	div.append(checkbox, label, button);

	return (div);
}

function getRandomInt(length) {
	return (Math.round(Math.random() * 10) % length);
}

function displayQuote(index) {
	let br = document.createElement("br");

	quoteDiv.append(quotes[index], br, quotesFrom[index]);
}

/**
 *	EventListener Functions
 */
function nameInputKeypressEL(element, event) {
	//Prevent typing space & enter as the 1st character into an empty input field
	if (element.value.length == 0 && (event.key == " " || event.key == "Enter")) {
		event.preventDefault();

		return;
	}
	if (element.value.length > 0 && event.key == "Enter") {
		nameModal.remove();

		let span = document.createElement("span");
		span.textContent = element.value;
		span.contentEditable = true;
		span.spellcheck = false;
		span.addEventListener("keypress", function(event) {
			nameSpanKeypressEL(this, event);
		});
		span.addEventListener("blur", function() {
			nameSpanBlurEL(this);
		});
		greetingSection.append(getGreeting(dateTime.hours, dateTime.ampm), span, "!");
	}
}

function timeButtonClickEL(element) {
	if (timeFormat == 24) {
		timeFormat = 12;
		element.textContent = "24-hr Clock";
	}
	else {
		timeFormat = 24;
		element.textContent = "12-hr Clock";
	}
}

function nameSpanKeypressEL(element, event) {
	//Prevent typing space & enter as the 1st character into an empty input field
	if (element.textContent.length == 0 && (event.key == " " || event.key == "Enter")) {
		event.preventDefault();

		return;
	}
	if (element.textContent.length > 0 && event.key == "Enter") {
		name = element.textContent;
		element.blur();
	}
}

function nameSpanBlurEL(element) {
	if (element.textContent == "") {
		//Use previous name if span is empty onblur
		element.textContent = name;
	}
	else {
		name = element.textContent;
	}
}

function focusInputKeypressEL(element, event) {
	//Prevent typing space & enter as the 1st character into an empty input field
	if (element.value.length == 0 && (event.key == " " || event.key == "Enter")) {
		event.preventDefault();

		return;
	}
	if (element.value.length > 0 && event.key == "Enter") {
		focusLabel.style.display = "none";
		element.style.display = "none";

		let div = createFocusOrTodo(element.value);
		div.style.display = "flex";
		div.style.justifyContent = "center";
		div.style.alignItems = "center";
		div.childNodes[0].addEventListener("change", function() {
			focusCheckboxChangeEL(div.childNodes[0], div.childNodes[2]);
		});
		div.childNodes[0].style.width = "32px";
		div.childNodes[0].style.height = "32px";
		div.childNodes[0].style.margin = "8px";
		div.childNodes[1].style.margin = "8px";
		div.childNodes[2].addEventListener("click", function(event) {
			focusDeleteClickEL(event);
		});
		div.childNodes[2].style.margin = "8px";
		focusSection.append(div);

		element.value = "";
	}
}

function focusCheckboxChangeEL(checkbox, button) {
	button.textContent = checkbox.checked ? "Add" : "Delete";
}

function checkboxChangeEL(element, label) {
	label.style.textDecoration = element.checked ? "line-through" : "none";
}

function focusDeleteClickEL(event) {
	event.currentTarget.parentNode.remove();
	//Can be block or inline
	focusLabel.style.display = "block";
	focusInput.style.display = "block";
}

function quoteAddButtonClickEL() {
	quoteModal.style.display = "block";
}

function addButtonClickEL(section, quote, from) {
	if (quote.value == "" || from.value == "") {
		alert("Complete both input fields.");
	}
	else {
		while (quoteDiv.firstChild) {
			quoteDiv.firstChild.remove();
		}

		quotes.push(`\"${quote.value}\"`);
		quotesFrom.push(`— ${from.value}`);
		index = quotes.length - 1;
		displayQuote(index);

		quote.value = "";
		from.value = "";
		section.style.display = "none";
	}
}

function exitButtonClickEL(section, quote, from) {
	quote.value = "";
	from.value = "";
	section.style.display = "none";
}

function quoteRandomButtonClickEL() {
	//Remove current quote
	while (quoteDiv.firstChild) {
		quoteDiv.firstChild.remove();
	}

	let random;
	//Randomize a number different from the last
	do {
		random = getRandomInt(quotes.length);
	}
	while (random == index);
	index = random;
	displayQuote(index);
}

function todoButtonClickEL() {
	todoDiv.style.display = (todoDiv.style.display == "none") ? "flex" : "none";
}

function todoInputKeypressEL(element, event) {
	//Prevent typing space & enter as the 1st character into an empty input field
	if (element.value.length == 0 && (event.key == " " || event.key == "Enter")) {
		event.preventDefault();

		return;
	}
	if (element.value.length > 0 && event.key == "Enter") {
		let div = createFocusOrTodo(element.value);
		div.childNodes[2].addEventListener("click", function(event) {
			todoDeleteClickEL(event);
		});
		todos.push(div);
		todoDiv.append(div);

		element.value = "";
	}
}

function todoDeleteClickEL(event) {
	for (let i = 0; i < todos.length; i++) {
		//Delete todo from the array
		if (event.currentTarget.parentNode.childNodes[1].textContent == todos[i].childNodes[1].textContent) {
			todos.splice(i, 1);
			event.currentTarget.parentNode.remove();

			break;
		}
	}
}

window.addEventListener("load", function() {
	//Add EventListeners
	nameInput.addEventListener("keypress", function(event) {
		nameInputKeypressEL(this, event);
	});
	timeButton.addEventListener("click", function() {
		timeButtonClickEL(this);
	});
	focusInput.addEventListener("keypress", function(event) {
		focusInputKeypressEL(this, event);
	});
	quoteAddButton.addEventListener("click", quoteAddButtonClickEL);
	quoteRandomButton.addEventListener("click", quoteRandomButtonClickEL);

	addButton.addEventListener("click", function() {
		addButtonClickEL(quoteModal, quoteInput, quoteFromInput);
	});
	exitButton.addEventListener("click", function() {
		exitButtonClickEL(quoteModal, quoteInput, quoteFromInput);
	});
	todoButton.addEventListener("click", todoButtonClickEL);
	todoInput.addEventListener("keypress", function(event) {
		todoInputKeypressEL(this, event);
	});

	todoDiv.style.display = "none";		//?!?!
	setInterval(displayDateTime, 1000);
	displayQuote(index);
});
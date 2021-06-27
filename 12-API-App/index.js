/**
 * CONSTANTS
 */
const API_KEY = 'cf28c86ecdeb4639ae03d3f9f257c955';
// const API_KEY = 'a5ba1c1e80984f1f8a77726a21805d14';


/**
 * UTILITY FUNCTIONS
 */
/**
 * Gets data requested from a URL.
 * @param {string} url The URL.
 * @returns The data.
 */
async function getData(url) {
	try {
		const response = await (fetch(url));
		const data = await (response.json());

		return (data);
	}
	catch (error) {
		console.error(error);
	}
}

/**
 * Creates and displays the DOM Elements for the recipes.
 * @param {object} recipes The recipes.
 */
function displayRecipes(recipes) {
	recipes.forEach(recipe => {
		// create the DOM elements for the used ingredients
		let usedIngredientsList = document.createElement('ol');
		recipe.usedIngredients.forEach(ingredient => usedIngredientsList.innerHTML += `<li>${ingredient.original}</li>`);

		// create the DOM elements for the missed ingredients
		let missedIngredientsList = document.createElement('ol');
		recipe.missedIngredients.forEach(ingredient => missedIngredientsList.innerHTML += `<li>${ingredient.original}</li>`);

		// get the nutrients of the recipe
		const nutrientsURL = `
			https://api.spoonacular.com/recipes/
			${recipe.id}/
			nutritionWidget.json?
			apiKey=${API_KEY}
		`;
		// create the DOM elements for the nutrients
		let goodNutrientsTable = document.createElement('table');
		goodNutrientsTable.innerHTML = `
			<tr>
				<th>Title</th>
				<th>Amount</th>
				<th>% of Daily Needs</th>
			</tr>
		`;
		let badNutrientsTable = document.createElement('table');
		badNutrientsTable.innerHTML = `
			<tr>
				<th>Title</th>
				<th>Amount</th>
				<th>% of Daily Needs</th>
			</tr>
		`;
		getData(nutrientsURL).then(nutrients => {
			nutrients.good.forEach(nutrient =>
				goodNutrientsTable.innerHTML += `
					<tr>
						<td>${nutrient.title}</td>
						<td>${nutrient.amount}</td>
						<td>${nutrient.percentOfDailyNeeds}</td>
					</tr>
				`
			);

			nutrients.bad.forEach(nutrient =>
				badNutrientsTable.innerHTML += `
					<tr>
						<td>${nutrient.title}</td>
						<td>${nutrient.amount}</td>
						<td>${nutrient.percentOfDailyNeeds}</td>
					</tr>
				`
			);
		});
		
		// get the instructions for the recipe
		let instructionsURL = `
			https://api.spoonacular.com/recipes/
			${recipe.id}/
			analyzedInstructions?
			apiKey=${API_KEY}
		`;
		// create the DOM elements for the instructions
		let instructionsList = document.createElement('ol');
		getData(instructionsURL).then(instructions =>
			instructions[0].steps.forEach(step => instructionsList.innerHTML += `<li>${step.step}</li>`)
		);

		// create the DOM elements for the recipe
		let recipeDiv = document.createElement('div');
		recipeDiv.classList.add('recipe');
		setTimeout(() => {
			recipeDiv.innerHTML = `
				<div class="image-ingredients">
					<img src="${recipe.image}">
					<label class="title">${recipe.title}</label>
					<label>Used Ingredient(s):</label>
					${usedIngredientsList.outerHTML}
					<label>Missed Ingredient(s):</label>
					${missedIngredientsList.outerHTML}
					<button onclick="moreInfoEL(event)">More Info -></button>
				</div>
				<div class="nutrients-instructions">
					<div class="nutrients">
						<label>Good Nutrient(s):</label>
						${goodNutrientsTable.outerHTML}
						<label>Bad Nutrient(s):</label>
						${badNutrientsTable.outerHTML}
					</div>
					<div class="instructions">
						<label>Instruction(s):</label>
						${instructionsList.outerHTML}
					</div>
					<button onclick="nutrientsEL(event)">Nutritional Contents</button>
					<button onclick="instructionsEL(event)">Instructions</button>
					<button onclick="backEL(event)">Back</button>
				</div>
			`;
		}, 1000);

		document.querySelector('#recipes').append(recipeDiv);
	});
}


/**
 * EVENTLISTENER FUNCTIONS
 */
/**
 * Sets an anchor to active.
 * @param {HTMLAnchorElement} anchor The anchor.
 */
function anchorEL(anchor) {
	document.querySelector('a.active').classList.remove('active');
	anchor.classList.add('active');
}

/**
 * Searches for the recipes requested.
 * @param {KeyboardEvent} event
 */
function searchKeypressEL(event) {
	if (event.key == 'Enter') {
		// clear the previous recipes showed
		document.querySelector('.recipes').innerHTML = '';

		// get and display the recipes
		let url = `
			https://api.spoonacular.com/recipes/
			findByIngredients?
			ingredients=${document.querySelector('#ingredients').value}&
			number=9&
			ranking=1&
			ignorePantry=false&
			apiKey=${API_KEY}
		`;
		getData(url).then(data => displayRecipes(data));
	}
}

/**
 * Searches for the recipes requested.
 */
function searchClickEL() {
	// clear the previous recipes showed
	document.querySelector('.recipes').innerHTML = '';

	// get and display the recipes
	let url = `
		https://api.spoonacular.com/recipes/
		findByIngredients?
		ingredients=${document.querySelector('#ingredients').value}&
		number=1&
		ranking=1&
		ignorePantry=false&
		apiKey=${API_KEY}
	`;
	getData(url).then(data => displayRecipes(data));
}

/**
 * Rotates the nutrients and instructions div to the front.
 * @param {MouseEvent} event
 */
function moreInfoEL(event) {
	event.currentTarget.parentNode.parentNode.style.transform = 'rotateY(180deg)';
}

/**
 * Displays the nutrients division.
 * @param {MouseEvent} event
 */
function nutrientsEL(event) {
	event.currentTarget.parentNode.children[0].style.display = 'flex';
	event.currentTarget.parentNode.children[1].style.display = 'none';
}

/**
 * Displays the instructions division.
 * @param {MouseEvent} event
 */
function instructionsEL(event) {
	event.currentTarget.parentNode.children[0].style.display = 'none';
	event.currentTarget.parentNode.children[1].style.display = 'flex';
}

/**
 * Rotates the image and ingredients div to the front.
 * @param {MouseEvent} event
 */
function backEL(event) {
	event.currentTarget.parentNode.parentNode.style.transform = 'rotateY(0deg)';
}
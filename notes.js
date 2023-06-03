const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	// .filter to create new array that meets certain condition
	results = fruit.filter(fruit => fruit.toLowerCase().includes(str.toLowerCase()));
	// callback function to make case-insensitive, if includes is true, str will be added by filter

	return results;
}

//returns search bar input matched to fruit
function searchHandler(e) {
	// keyup val into string
	const inputVal = e.target.value.toLowerCase();
	const results = search(inputVal);
	// console.log(results); gave results with each keyup
	showSuggestions(results, inputVal);

	if(!inputVal){
		suggestions.innerHTML = '';
	};
}


// show results in dropdown & bolded letters
function showSuggestions(results, inputVal) {
	if (inputVal === input.value) {
		// Clear suggestions
		suggestions.innerHTML = '';
		// Loop over each item in results, create new list item
		for (let i = 0; i < results.length; i++) {
			let newLi = document.createElement('li');
			let suggestionText = results[i];
			let boldedText = '';
			// check to see if inputVal appears in suggestion text, find input
			let startIndex = suggestionText.toLowerCase().indexOf(inputVal);

			// if matched, concatenate portions before and after matching text, match is bolded with '<strong>'
			if (startIndex !== -1) {
				let endIndex = startIndex + inputVal.length;
				boldedText =
					suggestionText.slice(0, startIndex) +
					'<strong>' +
					suggestionText.slice(startIndex, endIndex) +
					'</strong>' +
					suggestionText.slice(endIndex);
			} else {
				// if inputval doesn't match suggestions, set to original suggestions
				boldedText = suggestionText;
			}
				// assign boldedtext as html content of list item
			newLi.innerHTML = boldedText;
			suggestions.appendChild(newLi);


			// add event listener and function to highlight when moused over
			newLi.addEventListener('mouseover', function(){
			
				const allSug = suggestions.querySelectorAll('li');
				// remove highlights from other suggestions
				allSug.forEach(li => {
					li.classList.remove('highlight');
				});
				// add to current mouseover
				this.classList.add('highlight');
			} );
		}
	}
}



function useSuggestion(e) {
	if (e.target.tagName === "LI"){
		input.value = e.target.textContent;
		suggestions.style.display = 'none';
	}
}

// function clearSuggestions(){
// 	suggestions.innerHTML = '';
// }

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
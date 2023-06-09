const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	results = fruit.filter(fruit => fruit.toLowerCase().includes(str.toLowerCase()));

	return results;
}


function searchHandler(e) {
	const inputVal = e.target.value.toLowerCase();
	const results = search(inputVal);

	showSuggestions(results, inputVal);

	if(!inputVal){
		suggestions.innerHTML = '';
	};
}



function showSuggestions(results, inputVal) {
	if (inputVal === input.value) {
		
		suggestions.innerHTML = '';
		
		for (let i = 0; i < results.length; i++) {
			let newLi = document.createElement('li');
			let suggestionText = results[i];
			let boldedText = '';
			
			let startIndex = suggestionText.toLowerCase().indexOf(inputVal);

			
			if (startIndex !== -1) {
				let endIndex = startIndex + inputVal.length;
				boldedText =
					suggestionText.slice(0, startIndex) +
					'<strong>' +
					suggestionText.slice(startIndex, endIndex) +
					'</strong>' +
					suggestionText.slice(endIndex);
			} else {
				
				boldedText = suggestionText;
			}
			
			newLi.innerHTML = boldedText;
			suggestions.appendChild(newLi);


			newLi.addEventListener('mouseover', function(){
			
				const allSug = suggestions.querySelectorAll('li');
				
				allSug.forEach(li => {
					li.classList.remove('highlight');
				});
				
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



input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
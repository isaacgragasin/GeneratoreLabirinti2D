/**
 * Replaces a character at index in a string
 * 
 * @param str the string to be modified
 * @param index the index where to change character
 * @param replacement the replacing character
 */

function replaceAt(str, index, replacement) {
	if (index > str.length - 1) {
		return str;
	}
	return str.substr(0, index) + replacement + str.substr(index + 1);
}

/**
 * 	Gets the number value at a specific index in a string (0 or 1)
 * 
 * @param str the examined string
 * @param index the index of the character from which to get the number value
 */
function stringVal(str, index) {
	return parseInt(str.charAt(index), 10);
}

/**
 * 	Gets the int value of a javascript input.
 * 
 * @param id the id of the input
 * @param defaultValue the default value to be returned in case the previous one is invalid
 */
function getInputIntVal(id, defaultValue) {
	const el = document.getElementById(id);
	if (el) {
		let el_value = parseInt(el.value, 10);
		if(id == 'path'){
			el_value = (el_value > 0 && el_value < 6) ? el_value : defaultValue;
		}else{
			el_value = (el_value > 3 && el_value < 51) ? el_value : defaultValue;
		}
		el.value = el_value;
		return el_value;
	}

	el.value = defaultValue;
	return defaultValue;
}

/**
 * Randomize array element order in place.
 * Using Durstenfeld shuffle algorithm.
 * 
 * @param array the array to be shuffled
 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

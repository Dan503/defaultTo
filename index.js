
import clone from 'clone';

function isObj(obj){
	return typeof obj === 'object' && obj.constructor !== Array;
}

//- a function for easily applying default values, especially good for objects
export default function defaultTo(variable, defaultVal){

	//if it's an object, treat each setting in the object seperately
	if (isObj(defaultVal)){
		var finalParams = clone(defaultVal);

		// We iterate over each property of the paramObject
		for (var key in variable) {

			// If the current property wasn't inherited, proceed
			if (variable.hasOwnProperty(key)) {
				// If the current property is defined, add it to finalParams
				if (variable[key] !== 'undefined') {
					finalParams[key] = variable[key];
				}
			}

			//if the value is an object, run the defaultTo function on the object
			if (isObj(defaultVal[key])){
				for (var subKey in defaultVal[key]) {
					if (defaultVal[key].hasOwnProperty(subKey)) {
						finalParams[key][subKey] = defaultTo(variable[key][subKey], defaultVal[key][subKey]);
					}
				}
			}
		}

		return finalParams;

	} else {
		//in all other cases completely relace the default value of the variable if a value is given
		return typeof variable === 'undefined' ?  defaultVal : variable;
	}
}

//similar to defaultTo except it changes the properties directly
// eg:
// applyDefaults(obj, {property: 'value'});
// rather than:
// obj = defaultTo(obj, {property: 'value'});
//!!WARNING!! obj MUST be a defined object for the function to work
function applyDefaults (obj, defaults){
	if (typeof obj === 'undefined'){
		console.log('WARNING! an applyDefaults object is undefined, these defaults were not applied:\n', defaults);
		return false;
	}

	for (var property in defaults) {
		if (defaults.hasOwnProperty(property)) {
			obj[property] = defaultTo(obj[property], defaults[property])
		}
	}
}

//doesn't bother checking for defaults, just replaces values
//!!WARNING!! obj MUST be a defined object for the function to work
function replaceValues (obj, replacements){
	if (typeof obj === 'undefined'){
		console.log('WARNING! a replaceValues object is undefined, these replacements were not applied:\n', replacements);
		return false;
	}

	for (var property in replacements) {
		if (replacements.hasOwnProperty(property)) {
			if (isObj(replacements[property])){
				replaceValues(obj[property], replacements[property]);
			} else {
				obj[property] = replacements[property];
			}
		}
	}
}

export { defaultTo, applyDefaults, replaceValues }

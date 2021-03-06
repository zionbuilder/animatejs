/**
 * Observe
 * 
 * Will use intersection observer to observe a list of nodes
 * 
 * @param {*} elements 
 * @param {*} callback 
 * @param {*} options 
 */
const observe = function (elements, callback, options = {}) {
	const optionsWithDefaults = {
		threshold: 1.0,
		...options
	}

	let observer = new IntersectionObserver(callback, optionsWithDefaults)

	elements.forEach(element => {
		observer.observe(element);
	})

	return observer
}

export default observe

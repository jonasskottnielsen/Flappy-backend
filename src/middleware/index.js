
const Middleware = {
	
	/**
	 * Parse valid JSON strings from the body in multipart requests
	 * It will catch errors silently on purpose since not all values will be successfully parsed witch is the intention
	 * It will not block the request if some values failed to parse correctly
	 *
	 * @returns {object} - It will alsways continue the request with the next() argument
	 */
	async jsonMultipart (request, response, next) {
		
		// when uploading multiple files through dropzone, paramters might come in array instead of their original type.
		// The array will just consist of same value mutliple time (one for each file uploaded).
		// This just ensures to use the first item in the array so the following validation and following logic still works
		if (request.files) {
			for (let property in request.body) {
				let bodyProp = request.body[property];

				if (Array.isArray(bodyProp) && bodyProp[0] && Object.keys(request.files).length > 1) {
					request.body[property] = bodyProp[0];
				}
			}
		}

		for (let property in request.body) {
			try {
				const parsed = JSON.parse(request.body[property]);

				request.body[property] = JSON.parse(request.body[property]);
			} catch (error) {}
		}

		for (let property in request.query) {
			try {
				request.query[property] = JSON.parse(request.query[property]);
			} catch (error) {}
		}

		next();
	}

};

export default Middleware;

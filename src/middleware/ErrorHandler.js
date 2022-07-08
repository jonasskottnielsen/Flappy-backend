import { CustomError } from '../errors';

import { invalidRequestBody, somethingWrong } from '../constants';

import { Logger } from '../logger/Logger';

const errorHandler = (error, request, response, next) => {
    if (error instanceof SyntaxError && 'body' in error) {
        Logger.error(JSON.stringify(error));
        
        return response.status(400).send({ success: false, message: invalidRequestBody(request.originalUrl) });
    }

    if (error instanceof CustomError) {
        return response.status(error.statusCode).send({ success: false, message: error.description });
    }

    return response.status(500).send({ success: false, message: somethingWrong });
}

export default errorHandler;

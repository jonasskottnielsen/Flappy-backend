import '@babel/polyfill';

import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { PORT, SESSION_NAME, ROOT_PATH, SESSION_LIFETIME, SESSION_SECRET, DB_NAME, FILE_UPLOAD_LIMIT } from './config';
import Api from './api';
//import Database from './services/Database';

const app = express();

app.set('trust proxy', 1); // trust first proxy

app.use(Api);

const Flappy = {

	async init () {
		//await Database.connect();

		const port = PORT;

		app.listen(port, () => Logger.info(`The server is running on port ${port}!`));
	}

};

Flappy.init();

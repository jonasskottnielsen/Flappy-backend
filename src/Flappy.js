import '@babel/polyfill';

import express from 'express';
import cors from 'cors';
import Api from './api';
import Database from './services/Database';

const app = express();
app.use(cors({ credentials: true, origin: ['localhost', 'flappy.tokeroedplus.com'] }));

app.use(Api);

const Flappy = {

	async init() {
		await Database.init();
		app.listen(5000, () => console.log(`listening on port 5000`));
	}

};

Flappy.init();

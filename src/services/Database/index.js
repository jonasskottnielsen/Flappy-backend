import { MongoClient, ObjectId } from 'mongodb';

import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } from '../../config';
import Users from './Users';

const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/?authSource=admin&readPreference=primary&ssl=false&directConnection=true`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const Database = {
	
	/**
	 * Connect to the mongodb database
	 *
	 * @returns {object} - Mongodb client object 
	 */
	async connect () {
		try {
			await client.connect();

			Logger.info('The database is now connected');
		} catch (error) {
			Logger.error('Error connecting to the database: %o', error);
		}

		return client;
	},

	ObjectId,
	client,
	Users
};

export default Database;

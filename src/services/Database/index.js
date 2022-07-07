import mysql from 'mysql';
import util from 'util';

import { DB_HOST, DB_USERNAME, DB_NAME, DB_PASSWORD } from '../../Config/index.js';

const pool = mysql.createPool({
	connectionLimit: 10,
	host: DB_HOST,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_NAME
});

const runQuery = util.promisify(pool.query).bind(pool);

const Database = {
	async getHighscores() {
		let result = null;
		try {
			result = await runQuery(`SELECT * from highscores`);
			return result;
		} catch (error) {
			console.log(error);
		}
	},

	async insertHighscore(data) {
		let result = null;
		try {
			result = await runQuery(`INSERT INTO highscores(userId, name, score) VALUES(?,?,?) ON DUPLICATE KEY UPDATE score=VALUES(score)`, [data.userId, data.name, data.score]);
		} catch (error) {
			console.log(error);
		}
		return result;
	},

	async init() {
		await runQuery('drop table if exists highscores');
		await runQuery('create table if not exists highscores(userId VARCHAR(255) primary key, name VARCHAR(255), score int)');
	}
};

export default Database;

import mysql from 'mysql';
import util from 'util';

import { DB_HOST, DB_USERNAME, DB_NAME, DB_PASSWORD } from '../../config';

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

			/* if (result.length > 0){
				result.message = 'Scoreboard updated';
				result.success = true
			} else {
				result.message = 'Something went wrong';
				result.success = false
			} */
			return result;
		} catch (error) {
			console.log(error);
		}
	},

	async insertHighscore(data) {
		let returnMessage = {};
		let result = null;
		try {
			//result = await runQuery(`INSERT INTO highscores(userId, name, score) VALUES(?,?,?) ON DUPLICATE KEY UPDATE score=VALUES(score)`, [data.userId, data.name, data.score]);
			result = await runQuery(`INSERT INTO highscores(userId, name, score) VALUES (?,?,?) ON DUPLICATE KEY UPDATE score = GREATEST(score, VALUES(score)), name=VALUES(name)`, [data.userId, data.name, data.score])
		} catch (error) {
			console.log(error);
		}
		console.log(result);

		if (result != null && result.affectedRows > 0){
			returnMessage.message = 'Scoreboard updated';
			returnMessage.success = true
		} else {
			returnMessage.message = 'Something went wrong';
			returnMessage.success = false
		}
		return returnMessage;
	},

	async init() {
		await runQuery('drop table if exists highscores');
		await runQuery('create table if not exists highscores(userId VARCHAR(255) primary key, name VARCHAR(255), score int)');
	}
};

export default Database;

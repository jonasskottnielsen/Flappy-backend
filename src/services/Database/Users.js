import { DB_NAME } from '../../config';
import Database from '../Database';

const Users = {
	async getUser (params) {
		let result = {};
		const { key, value } = params;
		
		try {
			Logger.debug('Fetch a user from the database -> initiated');
			
			const user = await Database.client.db(DB_NAME).collection(collections.USERS).find(
				{ 
					[key]: value,
					isDeleted: false
				}, 
				{ 
					projection: { 
						_id: 0
					}
				}
			).toArray();

			Logger.debug('Fetch a user from the database -> successful');

			result.success = true;
			result.message = user.length === 1 ? 'fetchUserSuccess' : 'noUser';
			result.data = user.length === 1 ? user[0] : null;
		} catch (error) {
			Logger.debug('Fetch a user from the database -> failure');

			result.success = false;
			result.message = 'fetchUserFailure';
			result.data = null;

			Logger.error('Error at /services/Database/Users#getUser: %o', error);
		}

		return result;
	},

	async getUsers () {
		let result = {};
		
		try {
			Logger.debug('Fetch users from the database -> initiated');
			
			const users = await Database.client.db(DB_NAME).collection(collections.USERS).find(
				{
					isDeleted: false,
					role: {
						$ne: userRoles[0]
					}
				}, 
				{ 
					projection: { 
						_id: 0,
						isNew: 0,
						salt: 0,
						passwordHash: 0,
						lastLogin: 0,
						hasLoggedIn: 0,
						isDeleted: 0
					}
				}
			).toArray();

			Logger.debug('Fetch users from the database -> successful');

			result.success = true;
			result.message = users.length > 0 ? 'fetchUsersSuccess' : 'noUser';
			result.data = users;
		} catch (error) {
			Logger.debug('Fetch users from the database -> failure');

			result.success = false;
			result.message = 'fetchUsersFailure';
			result.data = null;

			Logger.error('Error at /services/Database/Users#getUsers: %o', error);
		}

		return result;
	},

	async getUnsubscribedUsers (params) {
		let result = {};
		const { query } = params;
		
		try {
			Logger.debug('Fetch unsubscribed users from the database -> initiated');
			
			const users = await Database.client.db(DB_NAME).collection(collections.USERS).find(
				{	
					...query,
					role: userRoles['2'],
					isDeleted: false
				}, 
				{ 
					projection: { 
						_id: 0,
						isNew: 0,
						salt: 0,
						passwordHash: 0,
						lastLogin: 0,
						hasLoggedIn: 0,
						isDeleted: 0
					}
				}
			).toArray();

			Logger.debug('Fetch unsubscribed users from the database -> successful');

			result.success = true;
			result.message = users.length > 0 ? 'fetchUsersSuccess' : 'noUser';
			result.data = users;
		} catch (error) {
			Logger.debug('Fetch unsubscribed users from the database -> failure');

			result.success = false;
			result.message = 'fetchUsersFailure';
			result.data = null;

			Logger.error('Error at /services/Database/Users#getUnsubscribedUsers: %o', error);
		}

		return result;
	},

	async addUser (params) {
		let result = {};
		const { newUser } = params;

		try {
            Logger.debug('Inserting new user into database -> initiated');

			await Database.client.db(DB_NAME).collection(collections.USERS).insertOne(newUser);

            Logger.debug('Inserting new user into database -> successful');

            result.success = true;
			result.message = 'addUserSuccess';

			const { _id, salt, passwordHash, hasLoggedIn, lastLogin, ...updatedNewUser } = newUser;

			result.data = updatedNewUser;
		} catch (error) {
			Logger.debug('Inserting new user into database -> failure');
			
            result.success = false;
			result.message = 'addUserFailure';
			result.data = newUser;

			Logger.error('Error at /services/Database/Users#addUser: %o', error);
		}

		return result;
	},

	async updateUser (params) {
		let result = {};
		const { key, value, fieldsToUpdate } = params;

		try {
            Logger.debug('Updating a user in the database -> initiated');

			const updatedUser = await Database.client.db(DB_NAME).collection(collections.USERS).updateOne(
				{ [key]: value },
				{ 
					$set: fieldsToUpdate
				}
			);

            Logger.debug('Updating a user in the database -> successful');

            result.success = true;
			result.message = updatedUser.modifiedCount > 0 ? 'updateUserSuccess' : 'nothingToUpdate';
			result.data = { [key]: value };

			return result;
		} catch (error) {
			Logger.debug('Updating a user in the database -> failure');
			
            result.success = false;
			result.message = 'updateUserFailure';
			result.data = { [key]: value };

			Logger.error('Error at /services/Database/Users#updateUser: %o', error);
		}

		return result;
	},

	async deleteUser (params) {
		let result = {};
		const { key, value } = params;

		try {
			Logger.debug('Mark an user as deleted in the database -> initiated');
			
			const user = await Database.client.db(DB_NAME).collection(collections.USERS).updateOne(
				{ [key]: value },
				{ 
					$set: {
						isDeleted: true
					}
				}
			);

			Logger.debug('Mark an user as deleted in the database -> successful');

			result.success = true;
			result.message = user.modifiedCount > 0 ? 'deleteUserSuccess' : 'noUser';
			result.data = { [key]: value };
		} catch (error) {
			Logger.debug('Mark an user as deleted in the database -> failure');

			result.success = false;
			result.message = 'deleteUserFailure';
			result.data = { [key]: value };
			
			Logger.error('Error at /services/Database/Users#deleteUser: %o', error);
		}

		return result;
	},

	async updateUsers(params) {
		let result = {};
		const { query } = params;

		try {
			Logger.debug('Updating users in the database -> initiated');

			const updatedUsers = await Database.client.db(DB_NAME).collection(collections.USERS).bulkWrite(query);

			if (updatedUsers.result.nModified === 0) {
				Logger.debug('There was nothing to update in the database!');
				
				result.success = true;
				result.message = 'nothingToUpdate';
			} else if (updatedUsers.result.nModified > 0) {
				Logger.debug('Updating users in the database -> successful');

				result.success = true;
				result.message = 'updateUsersSuccess';
			}
		} catch (error) {
			Logger.debug('Updating users in the database -> failure');

			result.success = false;
			
			Logger.error('Error at /services/Database/Users#updateUsers: %o', error);
		}

		return result;
	}
};

export default Users;
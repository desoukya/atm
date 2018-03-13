let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcryptjs');

let UserSchema = new Schema({
	_id: String,
	firstName: String,
	lastName: String,
	username: String,
	email: String,
	password: String
});

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if(err) reject(error);

			bcrypt.hash(newUser.password, salt, (error, hash) => {
				if(error) reject(error);
				
				newUser.password = hash;
				newUser.save((err, user) => {
					if(err) reject(err);

					resolve(user);
				});
			});
		});
	});
};

module.exports.checkIfAvailable = function(key, value) {
	return new Promise((resolve, reject) => {
		const query = {[key]: value};

		User.findOne(query, (error, result) => {
			if(error) {
				reject(error);
			}
			if(result) {
				reject(`Error: Duplicate ${key}`);
			}
			resolve(true);
		});
	});
}

module.exports.getUserByUsername = function(username, callBack) {
	let query = {username: username};
	User.findOne(query, callBack);
}

module.exports.getUserById = function(id, callBack) {
	User.findById(id, callBack);
}

module.exports.comparePassword = function(candidatePassword, hash, callBack) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callBack(null, isMatch);
	});
} 
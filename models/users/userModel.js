const Schema = require("mongoose").Schema;
const model = require("mongoose").model;
const sessionModel = require("./sessionModel");
const security = require("../../modules").security;

const schema = new Schema({
	email: String,
	pass: String,
	name: String,
	lastLogin: {
		type: Number,
		default: Date.now(),
	},
});

schema.statics.checkEmail = async function (email) {
	let user = await this.findOne({email: email});
	return user === null;
};

schema.methods.checkPassword = function (pass) {
	return this.pass === security.password.generatePassword(pass);
};

schema.statics.addUser = async function (email, name, pass) {
	let user = new this({
		email: email,
		name: name,
	});
	await user.setPassword(pass);
	await user.save();
	return user;
};

schema.methods.setPassword = function (pass) {
	this.pass = security.password.generatePassword(pass);
	return true;
};

schema.statics.loginUser = async function (email, pass) {
	let user = await this.findOne({email: email});
	if (user !== null) {
		if (user.pass === security.password.generatePassword(pass)) {
			return sessionModel.addToken({_id: user._id.toString()});
		} else {
			return false;
		}
	} else {
		return false;
	}
};

schema.methods.formatOpen = function () {
	return {
		email: this.email,
		name: this.name,
		lastLogin: this.lastLogin,
	}
}

schema.methods.formatPrivate = function () {
	return {
		email: this.email,
		name: this.name,
		lastLogin: this.lastLogin,
	}
}

module.exports = model("users", schema);
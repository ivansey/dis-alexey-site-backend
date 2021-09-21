const Schema = require("mongoose").Schema;
const model = require("mongoose").model;
const security = require("../../modules").security;

const schema = new Schema({
    idUser: String,
    token: String,
});

schema.statics.addToken = function (_id) {
    const session = new this({
        idUser: _id,
        token: security.token.generateSessionToken(),
    });
    session.save();
    return session.token;
};

schema.statics.checkToken = async function (token) {
    const tokenRes = await this.findOne({token: token});
    if (tokenRes !== null) {
        return tokenRes;
    } else {
        return null;
    }
};

schema.statics.getId = async function (token) {
    let tokenRes = await this.findOne({token: token});
    if (tokenRes !== null) {
        return tokenRes.idUser;
    } else {
        return null;
    }
};

module.exports = model("sessionsUsers", schema);
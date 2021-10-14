const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const schema = new Schema({
    idAdminTG: String,
});

module.exports = model("adminsTG", schema);
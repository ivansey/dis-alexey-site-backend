const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const schema = new Schema({
    time: String,
})

schema.statics.add = function (time) {
    const times = new this({time: time});
    times.save();
    return true;
}

module.exports = model("times", schema);
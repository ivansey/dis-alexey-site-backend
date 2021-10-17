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

schema.statics.checkOne = async function (time) {
    const times = await this.findOne({time: time});
    return times !== null;
}

module.exports = model("times", schema);
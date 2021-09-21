const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const schema = new Schema({
    name: String,
    desc: String,
    typeWork: String,
    typeContent: String,
    urlContent: Array,
    view: Boolean,
});

schema.statics.add = async function (name, desc, typeWork, typeContent, urlContent) {
    const data = new this ({
        name: name,
        desc: desc,
        typeWork: typeWork,
        typeContent: typeContent,
        urlContent: urlContent,
        view: true,
    });
    await data.save();
    return await data;
}

schema.statics.update = async function (_id, name, desc, typeWork, typeContent, urlContent, view) {
    await this.findOneAndUpdate({_id: _id}, {
        name: name,
        desc: desc,
        typeWork: typeWork,
        typeContent: typeContent,
        urlContent: urlContent,
        view: view,
    });
    return true;
}

schema.statics.delete = async function (_id) {
    await this.findOneAndDelete({_id: _id});
    return true;
}

schema.statics.getAll = async function () {
    return await this.find({});
}

schema.statics.getByType = async function (type = "home") {
    return await this.find({typeWork: type});
}

schema.statics.getAllView = async function () {
    return await this.find({view: true});
}

schema.statics.getById = async function (_id) {
    return await this.findById(_id);
}

module.exports = model("workComplite", schema);
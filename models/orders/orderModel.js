const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const schema = new Schema({
    typeObject: String,
    typeTreatment: String,
    typeTreatmentHomestead: String,
    city: String,

    countApartment: Number,
    countHomestead: Number,
    rooms: Array,
    square: Array,
    trees: Array,
    pests: String,

    cost: Number,

    name: String,
    phone: String,
    adress: String,
    isWhatsApp: Boolean,

    timeOrder: String,
    dateOrder: String,

    type: String,

    time: {
        type: Number,
        default: Date.now(),
    },
});

schema.statics.add = async function (body) {
    const data = new this({
        typeObject: body.typeObject,
        typeTreatment: body.typeTreatment,
        typeTreatmentHomestead: body.typeTreatmentHomestead,
        city: body.city,

        countApartment: body.countApartment,
        countHomestead: body.countHomestead,
        rooms: body.rooms,
        square: body.square,
        trees: body.trees,
        pests: body.pests,

        cost: body.cost,

        timeOrder: body.timeOrder,
        dateOrder: body.dateOrder,

        name: body.name,
        phone: body.phone,
        adress: body.adress,
        isWhatsApp: body.isWhatsApp,

        type: "new",
    });

    await data.save();
    return await data;
} 

schema.statics.updateType = async function (_id, type) {
    await this.findOneAndUpdate({_id: _id}, {type: type});
    return true;
}

schema.statics.delete = async function (_id) {
    await this.findOneAndDelete({_id: _id});
    return true;
}

schema.statics.getAll = async function () {
    return await this.find({});
}

schema.statics.getByType = async function (type = "new") {
    return await this.find({type: type});
}

schema.statics.getById = async function (_id) {
    return await this.findById(_id);
}

module.exports = model("orders", schema);
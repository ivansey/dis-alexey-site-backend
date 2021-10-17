const router = require("express").Router();
const moment = require("moment");

const models = require("../../models");
const orders = models.orders.orderModel;
const timesModel = models.orders.times;
const users = models.users.userModel;
const sessions = models.users.sessionModel;

const bot = require("../../modules/telegramBot");

router.post("/get", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);

    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    }
    ;

    return res.send({
        data: await orders.getAll(),
        response: "ok",
    });
});

router.post("/get/new", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);

    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    }
    ;

    return res.send({
        data: await orders.getByType("new"),
        response: "ok",
    });
});

router.post("/get/type", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);

    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    }
    ;

    return res.send({
        data: await orders.getByType(req.body.type),
        response: "ok",
    });
});

router.post("/get/id", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);

    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    }
    ;

    return res.send({
        data: await orders.getById(req.body._id),
        response: "ok",
    });
});

router.post("/add", async (req, res) => {
    const data = await orders.add(req.body.form);

    function getTitleTypeObject(type) {
        switch(type) {
            case "apartment":
                return "Квартира ";
            case "homestead":
                return "Участок ";
            case "corp":
                return "Корпоративный клиент ";
        }
    }

    function getTitleTypeTreatment(typeObject, typeTreatment, typeTreatmentHomestead) {
        switch(typeObject) {
            case "apartment":
                switch(typeTreatment) {
                    case "coldFog":
                        return "Холодный туман ";
                    case "hotFog":
                        return "Горячий туман ";
                    case "duoFog":
                        return "Комплексная обработка ";
                }
            case "homestead":
                switch(typeTreatmentHomestead) {
                    case "benz":
                        return "Бензиновый ";
                    case "electro":
                        return "Электрический ";
                }
            case "corp":
                return "";
        }
    }

    bot.send(`Новый заказ: \n 
${req.body.form.city} ${req.body.form.name} \n 
${req.body.form.adress}
${getTitleTypeObject(req.body.form.typeObject)} ${getTitleTypeTreatment(req.body.form.typeObject, req.body.form.typeTreatment, req.body.form.typeTreatmentHomestead)} \n
${req.body.form.phone} ${req.body.form.isWhatsApp ? "Есть в вацапе" : ""}`)
    return res.send({
        data: data,
        response: "ok",
    });
});

router.post("/editType", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);

    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    }
    ;

    await orders.updateType(req.body._id, req.body.type);
    return res.send({
        response: "ok",
    });
});

router.post("/delete", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);

    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    }
    ;

    await orders.delete(req.body._id);
    return res.send({
        response: "ok",
    });
});

router.post("/times/get", async (req, res) => {
    const {dateOrder} = req.body;

    console.log(dateOrder);

    let times = [];
    let timestamp, time, nightTime;

    for (let i = 0; i < 15; i++) {
        timestamp = moment(`${dateOrder} 10:00:00`, "DD/MM HH:mm:ss").add(i, "h").format("x");
        time = moment(`${dateOrder} 10:00:00`, "DD/MM HH:mm:ss").add(i, "h").format("HH:mm");
        nightTime = moment(`${dateOrder} 10:00:00`, "DD/MM HH:mm:ss").add(i, "h") >= moment(`${dateOrder} 17:00:00`, "DD/MM HH:mm:ss");
        times.push({
            timestamp: timestamp,
            time: time,
            nightTime: nightTime,
            disabled: await timesModel.checkOne(timestamp),
        })
    }
    
    return res.send({
        times: times,
    });
})

module.exports = router;
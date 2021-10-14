const router = require("express").Router();

const models = require("../../models");
const orders = models.orders.orderModel;
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
    };

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
    };

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
    };

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
    };

    return res.send({
        data: await orders.getById(req.body._id),
        response: "ok",
    });
});

router.post("/add", async (req, res) => {
    const data = await orders.add(req.body.form);
    bot.send(`Новый заказ: \n 
        ${req.body.form.city} ${req.body.form.name} \n 
        ${req.body.form.typeObject} ${req.body.form.typeObject === "home" ? req.body.form.typeTreatment : null} ${req.body.form.typeObject === "homestead" ? req.body.form.typeTreatmentHomestead : null} \n
        [${req.body.form.phone}](tel:${req.body.form.phone}) ${req.body.form.isWhatsApp ? "Есть в вацапе" : null} ${req.body.form.email}`)
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
    };

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
    };

    await orders.delete(req.body._id);
    return res.send({
        response: "ok",
    });
});

module.exports = router;
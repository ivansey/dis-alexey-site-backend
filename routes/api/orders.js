const router = require("express").Router();

const models = require("../../models");
const orders = models.orders.orderModel;
const users = models.users.userModel;
const sessions = models.users.sessionModel;

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
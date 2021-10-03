const router = require("express").Router();

const models = require("../../models");
const works = models.portfolio.workComplite;
const users = models.users.userModel;
const sessions = models.users.sessionModel;

router.post("/get", async (req, res) => {
    return res.send({
        data: await works.getAllView(),
        response: "ok",
    });
});

router.post("/get/all", async (req, res) => {
    return res.send({
        data: await works.getAll(),
        response: "ok",
    });
});

router.post("/get/id", async (req, res) => {
    return res.send({
        data: await works.getById(req.body._id),
        response: "ok",
    });
});

router.post("/get/all/type", async (req, res) => {
    return res.send({
        data: await works.getByType(req.body.type),
        response: "ok",
    });
});

router.post("/add", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);
    
    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    };

    console.log(req.body)
    const data = await works.add(req.body.name, req.body.desc, req.body.typeWork, req.body.typeContent, req.body.files, req.body.urlYouTubeVideo);
    return res.send({
        data: data,
        response: "ok",
    });
});

router.post("/edit", async (req, res) => {
    const session = await sessions.checkToken(req.body.token);
    
    if (session === null) {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        }).status(403);
    };

    await works.update(req.body._id, req.body.name, req.body.desc, req.body.typeWork, req.body.typeContent, req.body.urlContent);
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

    await works.delete(req.body._id);
    return res.send({
        response: "ok",
    });
});

module.exports = router;
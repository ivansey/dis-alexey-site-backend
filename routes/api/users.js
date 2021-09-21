const router = require("express").Router();

const models = require("../../models");

/*
    Get user information --- /api/users/get

    idUser = String
*/
router.post("/get", async (req, res) => {
    const data = await models.users.userModel.findById(req.body.idUser);
    if (data === null) {
        return res.send({
            data: {},
            response: "err",
            error: "notFoundUser",
        })
    } else {
        return res.send({
            data: data.formatOpen(),
            response: "ok",
        })
    }
});

/*
    Add new user --- /api/users/add

    email = String
    name = String
    pass = String
*/
router.post("/add", async (req, res) => {
    if (await models.users.userModel.checkEmail(req.body.email) === true) {
        const data = await models.users.userModel.addUser(req.body.email, req.body.name, req.body.pass);
        return res.send({
            data: data,
            response: "ok",
        });
    } else {
        return res.send({
            data: {},
            response: "err",
            error: "thisEmailNotFree",
        });
    }
});

module.exports = router;
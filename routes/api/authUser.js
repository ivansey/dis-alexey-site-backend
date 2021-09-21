const router = require("express").Router();

const models = require("../../models");

/*
    Get auth user information --- /api/users/auth/get

    token = String
*/
router.post("/get", async (req, res) => {
    const ret = await models.users.sessionModel.getId(req.body.token);
    const data = await models.users.userModel.findById(ret);
    if (ret !== null) {
        res.send({
            data: data.formatPrivate(),
            response: "ok",
        });
    } else {
        res.send({
            data: {},
            response: "err",
            error: "accessDenied",
        })
    }
});

/*
    Login user --- /api/users/auth/login

    email = String
    pass = String
*/
router.post("/login", async (req, res) => {
    const ret = await models.users.userModel.loginUser(req.body.email, req.body.pass);
    if (ret !== false) {
        res.send({
            data: {
                token: ret,
            },
            response: "ok",
        })
    } else {
        res.send({
            data: {},
            response: "err",
            error: "falseEmailPass",
        })
    }
});

/*
    Check user token --- /api/users/auth/checkToken

    token = String
*/
router.post("/checkToken", async (req, res) => {
    const ret = await models.users.sessionModel.checkToken(req.body.token);
    if (ret !== null) {
        return res.send({
            data: ret,
            response: "ok",
        });
    } else {
        return res.send({
            data: {},
            response: "err",
            error: "invalidToken",
        })
    }
});

module.exports = router;